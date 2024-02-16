import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BusinessException, BusinessExceptionFilter } from './exception';
import { corsOption, getNestOptions } from './app.options';
import { ConfigService } from '@nestjs/config';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { setSwagger } from './app.swagger';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
declare const module: any;

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, getNestOptions());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const allConstraintserrors = errors.map((error) =>
          JSON.stringify(error.constraints),
        );
        throw new BusinessException(
          'auth',
          allConstraintserrors.join(', '),
          `validation false!!`,
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );
  // 데이터 형식 수정해야함 문제는 x
  app.useGlobalFilters(new BusinessExceptionFilter());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const env = configService.get<string>('ENV');
  const serviceName = configService.get<string>('SERVICE_NAME');
  console.log(`env: ${env}\tport: ${port}\tserviceName: ${serviceName}`);

  setSwagger(app);
  app.enableCors(corsOption(env));
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

void bootstrap();
