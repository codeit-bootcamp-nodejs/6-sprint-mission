## 미션 목표

- 타입스크립트 마이그레이션하기
- 타입스크립트 개발 환경 세팅하기
- (심화) Layered Architecture 적용하기

## 기본 요구 사항

- 스프린트 미션 4의 구현이 완료된 상태에서 진행을 권장합니다.
- 타입스크립트 마이그레이션을 먼저 진행해 보고, 이전 미션에서 구현하지 못한 부분이 있다면 추가로 구현해 보세요.

### 프로젝트 세팅

- tsconfig.json 파일을 생성하고, 필요한 옵션을 설정해 주세요. (예: outDir).
- 필요한 npm script를 설정해 주세요. (예: 빌드 및 개발 서버 실행 명령어)

### 타입스크립트 마이그레이션

- 기존 Express.js 프로젝트를 타입스크립트 프로젝트로 마이그레이션 해주세요.
- 필요한 타입 패키지를 설치해 주세요.
- any 타입의 사용은 최소화해주세요.
- 복잡한 객체 구조나 배열 구조를 가진 변수에 인터페이스 또는 타입 별칭을 사용하세요.
- 필요한 경우, 타입 별칭 또는 유틸리티 타입을 사용해 타입 복잡성을 줄여주세요.
- 필요한 경우, declare를 사용하여 타입을 오버라이드하거나 확장합니다. (예: req.user)

### 개발 환경 설정

- ts-node 를 사용해 .ts 코드를 바로 실행할 수 있는 npm script를 만들어 주세요. (예: npm run dev)
- nodemon을 사용해 .ts 코드가 변경될 때마다 서버가 다시 실행되는 npm script를 만들어 주세요. (예: npm run dev)

## 심화 요구 사항

### Layered Architecture 적용하기

- Controller, Service, Repository로 나누어 코드를 리팩토링해 주세요.
- 필요하다면, 계층 사이에서 데이터를 주고 받을 때 DTO를 활용해 주세요.

## 멘토님 리뷰 반영

src/middleware/auth.js

```ts
  const [type, token] = auth.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({

```

이 파일에서 처리하는 예외처리도 에러핸들러를 적용하면 좋을 것 같습니다 :)

```ts
if (type !== 'Bearer' || !token) {
  return next(
    new UnauthorizedError(
      'authorization',
      '승인 헤더가 없거나 형식이 잘못되었습니다'
    )
  );
}
```

---

src/controllers/user-controller.js

```ts
    const tokens = await authService.generateTokens(user);

    if (tokens.refreshToken) {
```

access token 세팅도 같이 부탁드립니다 :)

```ts
if (tokens.accessToken) {
  res.cookie('accessToken', tokens.accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}
```

---

src/controllers/user-controller.js

```ts
  nickname: user.nickname,
          image: user.image,
        },
        ...tokens,
```

토큰은 쿠키에만 세팅하고, 따로 응답값에 추가하지 않아도 됩니다~!

```ts
  nickname: user.nickname,
          image: user.image,
        },
```

---

src/controllers/upload-controller.js

```ts
  // ?) 이미지 업로드 응답
  image(req, res) {
    if (!req.file) {
      return res.status(400).json({
```

이부분도 만드신 에러핸들러 사용해주세요 :)

```ts
if (!req.file) {
  return next(new ValidationError('file', '업로드된 파일이 없습니다'));
}
```
