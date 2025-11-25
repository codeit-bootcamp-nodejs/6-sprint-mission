export const USERS = [
  {
    id: 1,
    email: 'wakingSands@example.com',
    nickname: '민필리아',
    password: '1234',
    address: '서부 다날란, 저녁별 만, 모래의 집',
  },
  {
    id: 2,
    email: 'gunBreaker@example.com',
    nickname: '산크레드',
    password: '1234',
    address: '울다하 날 회랑, 모래늪 여관',
  },
  {
    id: 3,
    email: 'gillionaire@example.com',
    nickname: '타타루',
    password: '1234',
    address: '모르도나 망자의 종소리, 돌의 집',
  },
  {
    id: 4,
    email: 'matoyaMom@example.com',
    nickname: '야슈톨라',
    password: '1234',
    address: '저지 드라바니아, 마토야의 동굴',
  },
  {
    id: 5,
    email: 'finalHeaven@example.com',
    nickname: '이다',
    password: '1234',
    address: '기라바니아 변방지대, 랄거의 손길',
  },
  {
    id: 6,
    email: 'smartCaster@example.com',
    nickname: '파파리모',
    password: '1234',
    address: '검은장막 숲, 그리다니아 구시가지',
  },
  {
    id: 7,
    email: 'thouArt@example.com',
    nickname: '위리앙제',
    password: '1234',
    address: '일 메그, 몽환의 숲, 문지기의 서재',
  },
];

export const PRODUCTS = [
  {
    id: 1,
    name: '백금 만년필',
    description: '행정 업무에 최적화된 고급 만년필입니다. 부드러운 필기감을 자랑합니다.',
    tags: ['STATIONERY'],
    price: 2500,
    sellerId: 1, //민필리아
  },
  {
    id: 2,
    name: '다홍색 장미',
    description: '진하고 매혹적인 색을 띤 장미입니다. 선물용으로 적합합니다.',
    tags: ['FLOWER'],
    price: 500,
    sellerId: 2, //산크레드
  },
  {
    id: 3,
    name: '꼬마 친구 포실포실 털뭉치',
    description: '부드러운 털실로 짜인 귀여운 꼬마 친구입니다. 희귀한 확률로 발견됩니다.',
    tags: ['DOLL'],
    price: 15000000,
    sellerId: 3, //타타루
  },
  {
    id: 4,
    name: '마법의 빗자루',
    description: '마력을 주입하여 스스로 움직이는 빗자루입니다. 하우징 마당을 꾸미기에 좋습니다.',
    tags: ['FURNITURE'],
    price: 450000,
    sellerId: 4, //야슈톨라
  },
  {
    id: 5,
    name: '경화 가죽 격투무기',
    description: '튼튼한 가죽으로 감싼 격투가용 무기입니다. 내구성이 뛰어납니다.',
    tags: ['SPORTS'],
    price: 15000,
    sellerId: 5, //이다
  },
  {
    id: 6,
    name: '샬레이안 고글',
    description:
      '지식의 도시 샬레이안 양식으로 제작된 고글입니다. 에테르의 흐름을 관찰하기 좋습니다.',
    tags: ['FASHION'],
    price: 85000,
    sellerId: 6, //파파리모
  },
  {
    id: 7,
    name: '점성술사 카드 세트',
    description: '여섯 별의 운명을 점칠 수 있는 카드 세트입니다. 점성술 입문자에게 추천합니다.',
    tags: ['HOBBY'],
    price: 33000,
    sellerId: 7, //위리앙제
  },
  {
    id: 8,
    name: '미스릴 곡괭이',
    description: '미스릴 주괴로 날을 세운 곡괭이입니다. 광석 채집에 필수적인 도구입니다.',
    tags: ['TOOL'],
    price: 5000,
    sellerId: 1, //민필리아
  },
  {
    id: 9,
    name: '미스릴 반지',
    description: '세공된 미스릴로 만든 반지입니다. 깔끔한 디자인으로 인기가 많습니다.',
    tags: ['ACCESSORY'],
    price: 25000,
    sellerId: 2, //산크레드
  },
  {
    id: 10,
    name: '사베네어 뷔스티에',
    description: '사베네어 지방의 전통 의상입니다. 화려한 자수와 고급 원단으로 제작되었습니다.',
    tags: ['FASHION'],
    price: 5000000,
    sellerId: 3, //타타루
  },
  {
    id: 11,
    name: '고대 롱카의 비석',
    description: '롱카 문명이 새겨진 고대 비석입니다. 하우징 조경물로 사용할 수 있습니다.',
    tags: ['FURNITURE'],
    price: 200000,
    sellerId: 4, //야슈톨라
  },
  {
    id: 12,
    name: '동방의 목인',
    description: '동방 지역에서 수련용으로 사용하는 목인입니다. 튼튼한 나무로 만들어졌습니다.',
    tags: ['FURNITURE'],
    price: 10000,
    sellerId: 5, //이다
  },
  {
    id: 13,
    name: '묵직한 철제 화분',
    description: '어떤 식물이든 심을 수 있는 튼튼한 화분입니다. 실내 장식용으로 적합합니다.',
    tags: ['FURNITURE'],
    price: 5000,
    sellerId: 7, //위리앙제
  },
  {
    id: 14,
    name: '에테르학 개론',
    description: '에테르의 기본 원리와 응용법이 적힌 학술서입니다. 학자들에게 필독서로 꼽힙니다.',
    tags: ['BOOKS'],
    price: 12000,
    sellerId: 6, //파파리모
  },
  {
    id: 15,
    name: '프론티어 드레스',
    description: '고급 옷감을 사용하여 제작된 드레스입니다. 우아한 실루엣을 연출합니다.',
    tags: ['FASHION'],
    price: 8000000,
    sellerId: 3, //타타루
  },
];
