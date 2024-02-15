# Backend-Basecode 프로젝트 🏗️

`backend-basecode`는 예비 개발자들이 기본적인 백엔드 기능들을 빠르고 효과적으로 구축할 수 있도록 도와주는 프로젝트입니다. 회원가입, 로그인, 인증, 결제 등의 기본적인 기능을 바닥부터 구현하는 데 드는 시간과 노력을 줄이고, 실력 향상에 집중할 수 있도록 하기 위해 만들어졌습니다.

## 시작하기 🏁

1. 이 프로젝트를 템플릿 삼아 새로운 리포지토리를 생성해주세요.
![새로운 리포지토리 생성하는 방법](https://github.com/DevCamp-TeamSparta/backend-basecode/assets/64241858/0f5b9271-4863-48eb-b55a-eb4a2f14a847)

3. 클론을 받은 뒤 아래 명령을 실행해주세요.
```bash
# 패키지 설치
yarn install

# pre-commit hook 설치 (꼭 설치해주세요!)
brew install pre-commit
pre-commit install -t commit-msg

# 구동
cd docker
sh create-network.sh
make build env=local
make run env=local
```

## 목적 🎯

- **시행착오 줄이기:** 기본적인 기능의 구현에서 발생할 수 있는 불필요한 시행착오를 줄입니다.
- **실력 향상 촉진:** 주요 기능들을 빠르게 구현하고 이해함으로써, 실력 향상에 집중할 수 있게 합니다.

## 구현범위 🚀

- **payment(ing):** 주문 및 결제 처리를 담당하는 모듈입니다. 장바구니, 배송, 포인트/쿠폰 시스템을 담고 있습니다.
- **auth(to-do):** 회원가입/로그인 및 JWT 인증을 담당하는 모듈입니다. 이메일 및 소셜로그인(구글, 애플, 네이버, 카카오)을 지원합니다.
- **contents(to-do):** 강의, 영상, 강의자료 등 컨텐츠 관리를 담당하는 모듈입니다.
- **enrolleds(to-do):** 수강생 관리를 담당하는 모듈입니다. 수강생의 수강 상태, 수강료, 수강 기간 등을 관리합니다.
- **community(to-do):** 게시판, 댓글, 좋아요, 사진, 공유 등 커뮤니티 관리를 담당하는 모듈입니다.
- **notifications(to-do):** 알림 관리를 담당하는 모듈입니다. 이메일, 푸시, SMS 등 다양한 알림 수단을 지원합니다.

## 주요특징 🔋

- **GPT 코드리뷰**: pull request 생성 시 자동으로 코드리뷰를 생성합니다. 적극 참고해보세요!
- **(예정) 커밋 메시지 강제**: 커밋 메시지 형식을 강제합니다. 커밋 메시지를 작성할 때는 [Conventional Commit Message](https://www.conventionalcommits.org/ko/v1.0.0/)를 참고해주세요.
- **(예정) 코드 정적분석**: SonarQube를 통해 코드 정적분석을 진행합니다. 코드 품질을 높이고 컨벤션을 유지하는데 도움이 됩니다.

## 기술스택 🛠️

- TypeScript + NestJS + SWC
- Yarn berry + Plug'n'Play + Zero-Install
- TypeORM + PostgreSQL
- Joi
- Jest

---

## Payment 서비스 🛒

Payment 서비스는 `backend-basecode`의 첫 모듈로, 주문 및 결제 처리를 담당합니다. 이 모듈은 TypeScript, Joi, ConfigModule, TypeORM, typeorm-transactional 등의 기술 스택을 활용하고 있으며, 아래와 같은 구조로 구성되어 있습니다.

### 디렉토리 구조 📂

```plaintext
src/payment
├── dto
│   └── create-order.dto.ts
├── entities
│   ├── coupon.entity.ts
│   ├── issued-coupon.entity.ts
│   ├── order-item.entity.ts
│   ├── order.entity.ts
│   ├── point-log.entity.ts
│   ├── point.entity.ts
│   ├── product.entity.ts
│   └── shipping-info.entity.ts
├── payment.module.ts
├── repositories
│   ├── coupon.repository.ts
│   ├── issued-coupon.repository.ts
│   ├── order-item.repository.ts
│   ├── order.repository.ts
│   ├── point-log.repository.ts
│   ├── point.repository.ts
│   ├── product.repository.ts
│   └── shipping-info.repository.ts
└── services
    ├── payment.service.ts
    └── product.service.ts
```

### 주요 기능 🚀

1. 주문 시작 (initOrder)
   - 주문 금액 계산: 주문 상품의 총 금액을 계산합니다.
   - 할인 적용: 사용자가 선택한 쿠폰 및 포인트를 적용하여 최종 금액을 계산합니다.
   - 주문 생성: 주문을 데이터베이스에 저장하고 관련 배송 정보를 생성합니다.
2. 주문 완료 (completeOrder)
   - 주문 상태 업데이트: 주문 상태를 'paid'로 변경하여 주문을 완료합니다.

### 예외 처리 🚧

- 상품 미존재: 주문한 상품이 존재하지 않는 경우 예외를 발생시킵니다.
- 유효하지 않은 쿠폰: 쿠폰의 유효기간이 지났거나 존재하지 않는 쿠폰을 사용한 경우 예외를 발생시킵니다.
- 유효하지 않은 포인트: 사용 가능한 포인트보다 많은 포인트를 사용하려고 한 경우 예외를 발생시킵니다.

---

## Auth 서비스 🔐

Auth 서비스는 사용자의 인증과 권한 관리를 담당하는 중요한 모듈입니다. 이 모듈은 JWT를 활용한 인증, 액세스 및 리프레시 토큰 관리, 토큰 블랙리스트 처리, 접속 로그 기록 등의 기능을 제공합니다.

### 디렉토리 구조 📂

```plaintext
src/auth
├── auth.module.ts
├── controllers
│   ├── auth.controller.ts
│   └── index.ts
├── dto
│   ├── index.ts
│   └── login-res.dto.ts
├── entities
│   ├── access-log.entity.ts
│   ├── access-token.entity.ts
│   ├── index.ts
│   ├── refresh-token.entity.ts
│   ├── token-blacklist.entity.ts
│   └── user.entity.ts
├── repositories
│   ├── access-log.repository.ts
│   ├── access-token.repository.ts
│   ├── index.ts
│   ├── refresh-token.repository.ts
│   ├── token-blacklist.repository.ts
│   └── user.repository.ts
└── services
    ├── auth.service.ts
    ├── index.ts
    ├── token-blacklist.service.ts
    └── user.service.ts
```

### 주요 기능 🚀
1. **로그인 (login)**
   - 사용자 검증: 이메일과 비밀번호를 통해 사용자를 검증합니다. 
   - 토큰 생성: 검증된 사용자에 대해 액세스 및 리프레시 토큰을 생성합니다. 
   - 접속 로그 저장: 사용자의 접속 정보를 로그로 저장합니다.
2. **토큰 갱신 (refreshAccessToken)**
   - 리프레시 토큰 검증: 제공된 리프레시 토큰을 검증하고 유효한 경우 새로운 액세스 토큰을 발급합니다.
3. **로그아웃 (logout)**
   - 토큰 블랙리스트: 로그아웃 시 사용자의 현재 토큰을 블랙리스트에 추가하여 더 이상 사용할 수 없게 합니다. 
4. **토큰 블랙리스트 관리**
   - 토큰 블랙리스트에 추가 및 조회: 특정 토큰을 블랙리스트에 추가하거나 조회하는 기능을 제공합니다.

### 보안 및 최적화 🛡️
- **argon2**: 비밀번호 해싱에 argon2 알고리즘을 사용하여 보안을 강화합니다.
- **JWT 블랙리스트**: 로그아웃 또는 다른 이유로 무효화된 토큰을 관리하여 보안을 더욱 강화합니다.
- **접속 로그**: 사용자의 모든 접속 정보를 로그로 기록하여 추후 분석 및 모니터링에 활용합니다.

### 예외 처리 🚧

Auth 서비스는 다음과 같은 예외 처리를 수행합니다.

1. **인증 실패 (Invalid Credentials)**
   - 제공된 이메일과 비밀번호가 일치하지 않는 경우, `invalid-credentials` 오류를 반환합니다.

2. **사용자 찾을 수 없음 (User Not Found)**
   - 토큰에 포함된 사용자 ID가 데이터베이스에 없는 경우, `user-not-found` 오류를 반환합니다.

3. **유효하지 않은 리프레시 토큰 (Invalid Refresh Token)**
   - 제공된 리프레시 토큰이 유효하지 않은 경우, `invalid-refresh-token` 오류를 반환합니다.

4. **유효하지 않은 만료 시간 (Invalid Expiry Time)**
   - 토큰의 만료 시간이 유효하지 않은 형식인 경우, `invalid-expiry` 오류를 반환합니다.

이러한 예외 처리는 사용자와 시스템 간의 상호 작용을 안전하게 하고, 예상치 못한 오류로부터 시스템을 보호하는 역할을 합니다.

---

## 문의 🎉

- 조헌일(hi.cho@teamsparta.co)
- 남병관(bk.nam@teamsparta.co)