import axios from 'axios';
//악시오스를 쓸 것이기 때문에 불러온다. 설치법은 npm install axios

// https://panda-market-api-crud.vercel.app/docs <<판다 마켓 주소

const BASE_URL = `https://panda-market-api-crud.vercel.app`;
//매번 이걸 쳐주기 귀찮으니, 베이스로 사용할 URL 선언.

//-------------getArticleList(1,1,'')------------------------
function getArticleList(page, pageSize, keyword) {
  const q = `?page=${page}&pageSize=${pageSize}&keyword=${keyword}`;
  const finURL = `${BASE_URL}/articles/${q}`;
  //쿼리 파라미터? 형식으로 하라고 미션에 적혀있어서 이렇게 q 를 선언 후,
  //위에서 만들었던 BASE_URL과 /article/ 방금만든 q 를 합쳐 full 주소(finURL)를 완성시킨다.

  return axios
    .get(finURL) //완성된 주소에서 GET 해오기
    .then((response) => {
      console.log(`성공!: `, response.data); //답이 왔을 때, 성공!과 response.data를 출력하도록
    })
    .catch((error) => {
      console.error('실패!!! :', error.message); //근데 만약 에러가 잡히면? 실패!, 에러 메시지 출력
      if (error.response) {
        console.log('에러 코드: ', error.response.status); //미션에서, 2xx(성공코드)가 아니라면, 에러 코드를 출력 해달라 함.
        console.log('에러 내용: ', error.response.data); //에러 내용을 출력 해달라 함.
      }
    })
    .finally(() => {
      console.log('=====[gerArticleList] 리스트 불러오기 끝===='); //전 제가 보기 편하라고 넣었습니다.
    });
}

//------------getArticle(id)--------------------------------------

function getArticle(id) {
  //함수 호출때 getArticle(‘여기’) 적은 아이디가, 여기로 들어갈 예정
  return (
    axios
      .get(`${BASE_URL}/articles/${id}`)
      //여긴 쿼리 부분에 특정 게시물이 올라온 주소의 아이디를 바로 넣을 것이기 때문에
      //finURL말고 이렇게 사용.(맞는지는 잘 모르나 일단 잘 동작했습니다.)
      .then((response) => {
        console.log('성공!: ', response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('실패!!!: ', error.message);
        if (error.response) {
          console.log('에러 코드: ', error.response.status);
          console.log('에러 내용: ', error.response.data);
        }
      })
      .finally(() => {
        console.log('=====[gerArticle] 게시글 불러오기 끝=====');
      })
  );
}

//------------createArticle--------------------------------------

function createArticle(articleData) {
  return axios
    .post(BASE_URL + '/articles', articleData)
    .then((response) => {
      return console.log(`성공!: `, response.data);
    })
    .catch((error) => {
      console.error('실패!!!: ', error.message);
      if (error.response) {
        console.log('에러 코드: ', error.response.status);
        console.log('에러 내용: ', error.response.data);
      }
    })
    .finally(() => {
      console.log(`===생성 실험 끝===`);
    });
}

//--------------------patchArticle------------------
function patchArticle(id, articleData) {
  return axios
    .patch(`${BASE_URL}/articles/${id}`, articleData)
    .then((response) => {
      return console.log(`성공!: `, response.data);
    })
    .catch((error) => {
      console.error(`실패!!!: `, error.message);
      if (error.response) {
        console.log('에러 코드: ', error.response.status);
        console.log('에러 내용: ', error.response.data);
      }
    })
    .finally(() => {
      console.log(`===패치 실험 끝===`);
    });
}

//-----------------deleteArticle----------------------
function deleteArticle(id) {
  return axios
    .delete(`${BASE_URL}/articles/${id}`)
    .then((response) => {
      return console.log(`성공!: `, response.data);
    })
    .catch((error) => {
      console.error(`실패!!!: `, error.message);
      if (error.response) {
        console.log('에러 코드: ', error.response.status);
        console.log('에러 내용: ', error.response.data);
      }
    })
    .finally(() => {
      console.log(`=== 게시물 삭제 실험 끝===`);
    });
}

//한번에 내보내기 (보기 쉽게)
export {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};
