# Sprint Mission 12

## 미션 목표

자바스크립트로 정렬 알고리즘 구현하기

## 요구사항

다음 정렬 알고리즘을 각각 JavaScript 함수로 구현해 주세요.

- 선택 정렬 (Selection sort)
  - 숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현합니다.
- 삽입 정렬 (Insertion sort)
  - 숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현합니다.
- 병합 정렬 (Merge sort)
  - 숫자형 배열을 파라미터로 받고, 정렬된 새로운 배열을 리턴하도록 구현합니다.
- 퀵 정렬 (Quick sort)
  - 숫자형 배열을 파라미터로 받고, 해당 배열을 수정하도록 구현합니다.

- 함수 예시:
  - 해당 배열을 직접 수정하는 예시

    ```javascript
    const nums = [3, 1, 2];
    console.log(nums); // [3, 1, 2];
    selectionSort(nums);
    console.log(nums); // [1, 2, 3]
    ```

## 제출 안내

- algorithm 폴더를 만들고 sorts.js 파일에 구현한 함수들을 작성해 주세요.
- 이번 스프린트 미션은 N-Sprint-Mission 레포지토리(2기면 2-Sprint-Mission)의 브랜치 중에서 algorithm-홍길동 브랜치에서 진행합니다.
- GitHub에 PR(Pull Request)을 생성해 upstream의 본인 브랜치(algorithm-홍길동)에 미션을 제출할 건데요, 이번 미션에서 작성한 파일을 추가한 커밋을 PR로 만들어 주세요.
