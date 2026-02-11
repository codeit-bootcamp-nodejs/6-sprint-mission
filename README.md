# 미션 목표

- GitHub Actions로 테스트, 배포 자동화
- Docker 이미지 만들기

## 요구사항

### GitHub Actions 활용

- [x] 브랜치에 pull request가 발생하면 테스트를 실행하는 액션 구현
- [x] main 브랜치에 push가 발생하면 AWS 배포를 진행하는 액션 구현
- [x] 개인 Github 리포지터리에서 Actions 동작 확인

#### Docker 이미지 만들기: 다음을 만족하는 Dockerfile과 docker-compose.yaml 작성

- [x] Express 서버를 실행하는 Dockerfile 작성
- [x] Express 서버가 파일 업로드를 처리하는 폴더는 Docker의 Volume을 활용하도록 구현
- [x] 데이터베이스는 Postgres 이미지를 사용해 연결하도록 구현
- [x] 실행된 Express 서버 컨테이너는 호스트 머신에서 3000번 포트로 접근 가능하도록 구현

## 제출

- Github actions는 .github/workflows/ 폴더에 저장해서 제출
- Docker 관련 파일들은 프로젝트 폴더 최상위에 저장

## 멘토에게

- 이번 commit에 된 일
  - test.yml 작성 (docker 사용 이전임)
  - GitHub PAT에 workflow 권한 줌 (강의 중에 이미 함)
  - 코드 준비: package.json, jest.config.js 등
  - 리포지토리 브랜치 규칙 설정 (test 패스해야 merge하도록 main 브랜치 보호)
