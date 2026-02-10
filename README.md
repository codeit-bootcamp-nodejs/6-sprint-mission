# 미션 목표

- 판다마켓 서비스를 AWS로 배포하기
- AWS S3 적용
- AWS RDS 적용
- AWS EC2에 Express 서버 배포하기
- (심화) 프로세스 매니저 적용
- (심화) 리버스 프록시 적용

## 요구사항

### 기본 요구사항

- [x] 프로젝트에 프로덕션 배포를 위한 환경 변수 설정

#### AWS S3 적용

- [x] AWS S3 버킷을 생성하고, 퍼블릭 액세스를 허용
- [x] 일반 사용자가 S3 업로드된 파일에 접근할 수 있도록 S3 버킷 정책을 설정
- [x] AWS EC2에서 AWS S3를 사용하기 위한 액세스 키를 AWS IAM에서 발급
- [x] 프로덕션 환경에서는 파일 업로드에 AWS S3를 사용하도록 구현을 수정

#### AWS RDS 적용

- [x] AWS RDS 프리티어에 해당하는 인스턴스를 생성
- [x] RDS 인스턴스에 대한 보안 그룹을 설정
- [x] 프로덕션 환경에서는 Prisma에 프로젝트 데이터베이스와 연결

#### AWS EC2에 Express 서버 배포하기

- [x] AWS EC2 프리티어에 해당하는 인스턴스를 생성
- [x] SSH를 사용해 EC2 인스턴스에 접속해 Express 서버를 배포

### 심화 요구사항: /test/productService_likeToggle.test.ts (spy 사용)

- [x] EC2 인스턴스에서 pm2 프로세스 매니저를 사용하여 애플리케이션을 실행
- [x] EC2 인스턴스에서 nginx 리버스 프록시를 설정해 서버를 80번 포트로 서비스

## 제출

- AWS S3 버킷 정책 설정: /infra/s3/policy.png

- AWS RDS 인스턴스 정책 설정
  - /infra/rds/secure-group-inbound.png
  - /infra/rds/secure-group-inbound.png

- AWS EC2 인스턴스 보안 그룹 설정
  - /infra/ec2/secure-group-inbound.png
  - /infra/ec2/secure-group-outbound.png

- (심화) pm2 실행에 사용되었던 명령어: /infra/ec2/start.sh

- (심화) pm2 실행에 사용헀던 설정 파일: /infra/ec2/ecosystem.config.js

- (심화) nginx 실행에 사용했던 설정 파일: /infra/ec2/nginx.conf

## 멘토에게

- image API에서 AWS S3를 사용하도록 수정하였고, 테스트 완료하였습니다.
- image API를 User, Product, Article이 공유하고 있습니다. req.originalUrl에서 users, products, 또는 articles를 포함하는지 if문을 사용하여 각각의 service와 repo 함수를 부르고 있는지라 중복이 많습니다. 그래서 수정하였습니다.
