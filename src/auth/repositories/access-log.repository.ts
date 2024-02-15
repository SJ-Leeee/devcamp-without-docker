import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { AccessLog } from '../entities';

@Injectable()
export class AccessLogRepository extends Repository<AccessLog> {
  constructor(
    @InjectRepository(AccessLog)
    private readonly repo: Repository<AccessLog>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }
}
