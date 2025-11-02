// // 더미 데이터

// // Article 더미 데이터
const articleContent = {
  title: '오늘 날짜 추가_도시와 그 불확실한 벽_생성해서 넣어요!',
  content: '오늘 날짜 추가_무라카미 하루키 장편소설이네요._생성해서 넣어요!',
  image:
    'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788954699075.jpg',
  // writer: '무라카미 하루키',
};

// // Article 수정 더미 데이터
const articleContentPatch = {
  title: '도시와 그 불확실한 벽_수정해서 넣어요!_3',
  content: '무라카미 하루키 장편소설이네요._수정해서 넣어요333!',
  image:
    'https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788954699075.jpg',
  //writer = '무라카미 하루키',
};

// // Product 더미 데이터
const eProduct = {
  name: '지식전자 냉장고',
  description: '냉장고가 1000원, 거져다 거져!',
  price: 1000,
  tags: ['전자제품'],
  images: [
    'https://www.lge.co.kr/kr/images/air-conditioners/md10124829/gallery/large-interior01.jpg',
  ],
  favoriteCount: 0,
  manufacturer: '지식전자',
};
const cProduct = {
  name: '스탠리 텀블러',
  description: '텀블러는 턴블러!? ',
  price: 100,
  tags: ['생활용품', '주방용품', '텀블러'],
  images: [
    'https://www.lge.co.kr/kr/images/air-conditioners/md10124829/gallery/large-interior01.jpg',
  ],
};

// // Product 수정 더미 데이터
const eProductPatch = {
  name: '지식전자 냉장고_수정수정',
  description: '냉장고가 1000원, 거져다 거져!, 이건 수정한거예요!',
  price: 1000,
  tags: ['전자제품'],
  images: [
    'https://www.lge.co.kr/kr/images/air-conditioners/md10124829/gallery/large-interior01.jpg',
  ],
  manufacturer: '지식전자',
};
const cProductPatch = {
  name: '스탠리 텀블러_수정수정',
  description: '텀블러는 텀블러!?수정해서 20000원!!!!',
  price: 20000,
  tags: ['생활용품', '주방용품', '텀블러', '빨대증정'],
  images: [
    'https://www.lge.co.kr/kr/images/air-conditioners/md10124829/gallery/large-interior01.jpg',
  ],
};

const Dummy = {
  articleContent,
  articleContentPatch,
  eProduct,
  cProduct,
  eProductPatch,
  cProductPatch,
};
export default Dummy;
