// USERS: 7명
export const USERS = [
  {
    id: 1,
    email: 'user1@example.com',
    nickname: 'user1',
    password: '$2b$10$JuwBWUmrbOYgAoPEpK1.I.9bJv6EzeOSXaweEc9iqE1qxINYLAoO.',
    likedProducts: [2, 9, 17, 21, 24],
    likedArticles: [1, 7, 17],
    createdAt: '2023-01-12T08:00:00Z',
    updatedAt: '2023-12-11T09:00:00Z'
  },
  {
    id: 2,
    email: 'user2@example.com',
    nickname: 'user2',
    password: '$2b$10$qfuiphAeAtxLshes0UcsHuHMrY2/BHQ85yIOoU5rktqONxydYzSx6',
    likedProducts: [6, 11, 18, 21, 26],
    likedArticles: [2, 7, 13],
    createdAt: '2023-01-15T08:00:00Z',
    updatedAt: '2023-10-04T09:00:00Z'
  },
  {
    id: 3,
    email: 'user3@example.com',
    nickname: 'user3',
    password: '$2b$10$9zEwHM9PxTe3bnOQpn2YVuKTBwkB4jsqIR4Rqm7PEYLSPjsU7kGxG',
    likedProducts: [1, 9, 10],
    likedArticles: [9, 10, 14],
    createdAt: '2023-01-15T16:23:00Z',
    updatedAt: '2023-11-04T23:11:00Z'
  },
  {
    id: 4,
    email: 'user4@example.com',
    nickname: 'user4',
    password: '$2b$10$Yu/koDe0ZGCGyuGQalGqZu/33JHwu/lxFidZJtvfH3h6474xkpLeW',
    likedProducts: [2, 3, 4, 13, 14, 15],
    likedArticles: [1, 3, 4, 5, 6, 7, 11, 15, 17],
    createdAt: '2023-01-17T22:23:00Z',
    updatedAt: '2023-12-05T23:56:00Z'
  },
  {
    id: 5,
    email: 'user5@example.com',
    nickname: 'user5',
    password: '$2b$10$vJv2K3EjDj8ErqfvsagTvuIrIxdwGL2WX85YkjbjeZvNbfWqRKAg6',
    likedProducts: [1, 9, 5, 6, 11, 18, 19, 25],
    likedArticles: [3, 9, 11, 13, 16, 21, 22],
    createdAt: '2023-01-19T11:50:00Z',
    updatedAt: '2023-11-25T21:01:00Z'
  },
  {
    id: 6,
    email: 'user6@example.com',
    nickname: 'user6',
    password: '$2b$10$Zo7zTh.1Ea9gm4o02M1z7Oi78Y.JXQM9SN.gOGd1wnEyVdom1cO6q',
    likedProducts: [1, 2, 6, 8, 10, 11, 12, 16, 21, 23, 26, 27],
    likedArticles: [2, 6, 8, 12, 15, 16, 17, 18],
    createdAt: '2023-01-22T10:52:00Z',
    updatedAt: '2023-12-25T22:37:00Z'
  },
  {
    id: 7,
    email: 'user7@example.com',
    nickname: 'user7',
    password: '$2b$10$TXot6tJChRXPO04HH7lqN.pbRXrX.ikj.9X4lD0AEWYSv0QC3edua',
    likedProducts: [2, 11, 21, 23, 27],
    likedArticles: [1, 4, 12, 19, 20, 21, 22],
    createdAt: '2023-01-25T13:52:00Z',
    updatedAt: '2023-11-30T19:20:00Z'
  }
];

// PRODUCTS: 27개
export const PRODUCTS = [
  {
    id: 1,
    name: 'Instant Pot Duo 7-in-1',
    description: '압력밥솥, 슬로우 쿠커, 찜기 등 7가지 기능을 하나로 합친 멀티쿠커입니다.',
    price: 159000,
    tags: ['주방가전', '요리'],
    imageUrls: [
      'https://images.unsplash.com/photo-1601043015720-9d99f7a9e225',
      'https://images.unsplash.com/photo-1615486364504-0b889cd6df60'
    ],
    userId: 5,
    createdAt: '2023-05-09T11:30:00Z',
    updatedAt: '2023-05-09T12:45:00Z'
  },
  {
    id: 2,
    name: 'Apple HomePod mini',
    description: '시리 음성 명령과 스마트홈 제어 기능이 탑재된 컴팩트 스마트 스피커입니다.',
    price: 149000,
    tags: ['스피커', 'Apple', 'IoT'],
    imageUrls: ['https://images.unsplash.com/photo-1593642634367-d91a135587b5'],
    userId: 1,
    createdAt: '2023-05-13T08:00:00Z',
    updatedAt: '2023-05-14T09:00:00Z'
  },
  {
    id: 3,
    name: 'Nintendo Switch OLED',
    description: '밝고 선명한 OLED 디스플레이를 탑재한 휴대용 콘솔 게임기입니다.',
    price: 459000,
    tags: ['게임'],
    imageUrls: ['https://images.unsplash.com/photo-1611605698335-0e9af6b7b1a4'],
    userId: 4,
    createdAt: '2023-05-22T09:30:00Z',
    updatedAt: '2023-05-23T09:31:00Z'
  },
  {
    id: 4,
    name: 'Sony PlayStation 5',
    description: '최신 그래픽 성능과 빠른 SSD 로딩 속도를 갖춘 차세대 콘솔 게임기입니다.',
    price: 759000,
    tags: ['게임기', 'Sony'],
    imageUrls: [
      'https://images.unsplash.com/photo-1606813909365-59459a4577d8',
      'https://images.unsplash.com/photo-1606813909355-c6e5e3e3a7c4'
    ],
    userId: 4,
    createdAt: '2023-05-23T09:31:00Z',
    updatedAt: '2023-05-23T09:31:00Z'
  },
  {
    id: 5,
    name: 'JBL Flip 6',
    description: '컴팩트한 사이즈와 강력한 사운드를 자랑하는 방수 블루투스 스피커입니다.',
    price: 149000,
    tags: ['스피커', '휴대용'],
    imageUrls: ['https://images.unsplash.com/photo-1620694561115-efc1a57b0a76'],
    userId: 1,
    createdAt: '2023-05-24T09:31:00Z',
    updatedAt: '2023-05-25T12:31:00Z'
  },
  {
    id: 6,
    name: 'Apple MacBook Air M2',
    description: '초경량 노트북으로, M2 칩을 탑재하여 빠른 속도와 긴 배터리 수명을 자랑합니다.',
    price: 1690000,
    tags: ['노트북', 'Apple'],
    imageUrls: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8'
    ],
    userId: 3,
    createdAt: '2023-06-04T10:00:00Z',
    updatedAt: '2023-06-05T10:00:00Z'
  },
  {
    id: 7,
    name: 'Anker PowerCore III 10000',
    description: '고속 충전을 지원하는 휴대용 보조 배터리입니다.',
    price: 59000,
    tags: ['모바일', '충전기'],
    imageUrls: ['https://images.unsplash.com/photo-1583224314275-8e61b4ad9bd1'],
    userId: 3,
    createdAt: '2023-06-06T09:30:00Z',
    updatedAt: '2023-06-06T09:54:00Z'
  },
  {
    id: 8,
    name: 'Apple Magic Keyboard',
    description: 'Apple 기기와 완벽하게 호환되는 블루투스 무선 키보드입니다.',
    price: 149000,
    tags: ['키보드', 'Apple'],
    imageUrls: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
      'https://images.unsplash.com/photo-1519241047957-be31d7379a5d'
    ],
    userId: 1,
    createdAt: '2023-06-13T08:00:00Z',
    updatedAt: '2023-06-13T08:30:00Z'
  },
  {
    id: 9,
    name: 'Dyson V15 Detect 무선청소기',
    description: '강력한 흡입력과 레이저 먼지 감지 기능으로 완벽한 청소를 가능하게 합니다.',
    price: 1190000,
    tags: ['청소기'],
    imageUrls: ['https://images.unsplash.com/photo-1616628188577-bddf8d32f9b4'],
    userId: 5,
    createdAt: '2023-06-13T10:00:00Z',
    updatedAt: '2023-06-13T10:00:00Z'
  },
  {
    id: 10,
    name: 'LG OLED evo TV 65인치',
    description:
      '최신 OLED evo 패널을 사용한 4K HDR 스마트 TV로, 생생한 색감과 얇은 디자인이 특징입니다.',
    price: 2890000,
    tags: ['TV', 'OLED', '가전'],
    imageUrls: [
      'https://images.unsplash.com/photo-1584905077971-4453f3d78f4c',
      'https://images.unsplash.com/photo-1586902193272-1c3d8f1d5ff2'
    ],
    userId: 3,
    createdAt: '2023-06-13T14:22:00Z',
    updatedAt: '2023-06-14T10:14:00Z'
  },
  {
    id: 11,
    name: 'Apple AirPods 프로',
    description:
      'Apple의 AirPods 프로는 탁월한 사운드 품질과 노이즈 캔슬링 기능을 갖춘 무선 이어폰입니다.',
    price: 320000,
    tags: ['소음제거', '스마트기기'],
    imageUrls: [
      'https://images.unsplash.com/photo-1585386959984-a415522316d1',
      'https://images.unsplash.com/photo-1611078489935-0e5dbd8d4c4b'
    ],
    userId: 5,
    createdAt: '2023-06-17T11:00:00Z',
    updatedAt: '2023-06-17T11:00:00Z'
  },
  {
    id: 12,
    name: 'Kindle Paperwhite 11세대',
    description: '전자잉크 디스플레이로 눈의 피로 없이 독서를 즐길 수 있는 전자책 리더기입니다.',
    price: 189000,
    tags: ['전자책', '리더기', '여행'],
    imageUrls: [
      'https://images.unsplash.com/photo-1611078489935-0e5dbd8d4c4b',
      'https://images.unsplash.com/photo-1601933470928-c4e633963f58'
    ],
    userId: 2,
    createdAt: '2023-07-15T10:00:00Z',
    updatedAt: '2023-07-16T09:00:00Z'
  },
  {
    id: 13,
    name: 'Logitech MX Master 3S',
    description: '인체공학적 디자인과 초정밀 스크롤 기능을 갖춘 무선 마우스입니다.',
    price: 139000,
    tags: ['마우스', '사무용'],
    imageUrls: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3'],
    userId: 1,
    createdAt: '2023-07-20T08:00:00Z',
    updatedAt: '2023-07-20T12:00:00Z'
  },
  {
    id: 14,
    name: 'ASUS ROG Zephyrus G14',
    description: 'AMD Ryzen 9 프로세서와 RTX 그래픽을 탑재한 고성능 게이밍 노트북입니다.',
    price: 2290000,
    tags: ['노트북', '게이밍'],
    imageUrls: [
      'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5',
      'https://images.unsplash.com/photo-1593642532973-d31b6557fa68'
    ],
    userId: 2,
    createdAt: '2023-07-21T11:20:00Z',
    updatedAt: '2023-07-22T09:00:00Z'
  },
  {
    id: 15,
    name: 'Razer DeathAdder V3',
    description: 'e스포츠 게이머들이 선호하는 초경량 유선 게이밍 마우스입니다.',
    price: 129000,
    tags: ['마우스', '게이밍'],
    imageUrls: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3'],
    userId: 3,
    createdAt: '2023-07-21T14:00:00Z',
    updatedAt: '2023-07-21T14:00:00Z'
  },
  {
    id: 16,
    name: 'Canon EOS R8',
    description: '풀프레임 미러리스 카메라로, 전문가와 취미사진가 모두에게 적합합니다.',
    price: 1890000,
    tags: ['카메라', '미러리스'],
    imageUrls: [
      'https://images.unsplash.com/photo-1519183071298-a2962be90b8e',
      'https://images.unsplash.com/photo-1555617981-2f7b0e70f55a'
    ],
    userId: 4,
    createdAt: '2023-07-21T23:26:00Z',
    updatedAt: '2023-07-22T09:00:00Z'
  },
  {
    id: 17,
    name: 'Samsung Galaxy S23 Ultra',
    description:
      '최신 Snapdragon 프로세서와 강력한 카메라 성능을 갖춘 삼성의 프리미엄 스마트폰입니다.',
    price: 1450000,
    tags: ['스마트폰'],
    imageUrls: [
      'https://images.unsplash.com/photo-1675863770059-4e5f77e48a3a',
      'https://images.unsplash.com/photo-1679678694768-95d3ad0dc1ab'
    ],
    userId: 4,
    createdAt: '2023-07-22T10:32:00Z',
    updatedAt: '2023-07-22T10:11:00Z'
  },
  {
    id: 18,
    name: 'Microsoft Surface Pro 9',
    description:
      '노트북과 태블릿의 장점을 결합한 2-in-1 디바이스로, 생산성과 휴대성을 모두 제공합니다.',
    price: 1890000,
    tags: ['노트북', '태블릿'],
    imageUrls: [
      'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc',
      'https://images.unsplash.com/photo-1601933470928-c4e633963f58'
    ],
    userId: 5,
    createdAt: '2023-08-03T09:00:00Z',
    updatedAt: '2023-08-03T10:30:00Z'
  },
  {
    id: 19,
    name: 'Bose SoundLink Revolve+ II',
    description: '360도 전방향 사운드와 깊은 베이스를 제공하는 프리미엄 블루투스 스피커입니다.',
    price: 389000,
    tags: ['스피커'],
    imageUrls: ['https://images.unsplash.com/photo-1585386959984-a415522316d1'],
    userId: 5,
    createdAt: '2023-08-09T10:15:00Z',
    updatedAt: '2023-08-10T11:00:00Z'
  },
  {
    id: 20,
    name: 'Sony WH-1000XM5',
    description:
      '소니의 대표적인 무선 노이즈 캔슬링 헤드폰으로, 탁월한 음질과 편안한 착용감을 제공합니다.',
    price: 420000,
    tags: ['헤드폰', '소음제거'],
    imageUrls: [
      'https://images.unsplash.com/photo-1606813909365-59459a4577d8',
      'https://images.unsplash.com/photo-1583224314275-8e61b4ad9bd1'
    ],
    userId: 3,
    createdAt: '2023-08-15T09:30:00Z',
    updatedAt: '2023-08-15T09:30:00Z'
  },
  {
    id: 21,
    name: 'Apple Watch Series 9',
    description: '심박수, 산소포화도, 수면 추적 등 다양한 헬스 기능이 탑재된 스마트워치입니다.',
    price: 599000,
    tags: ['스마트워치', 'Apple', '피트니스'],
    imageUrls: [
      'https://images.unsplash.com/photo-1526401485004-2aa7c1b96d83',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b22'
    ],
    userId: 3,
    createdAt: '2023-08-16T14:15:00Z',
    updatedAt: '2023-08-16T10:05:00Z'
  },
  {
    id: 22,
    name: 'Beats Studio Pro',
    description: '프리미엄 무선 헤드폰으로 깊은 베이스와 노이즈 캔슬링 기능을 제공합니다.',
    price: 479000,
    tags: ['헤드폰'],
    imageUrls: ['https://images.unsplash.com/photo-1606813909365-59459a4577d8'],
    userId: 1,
    createdAt: '2023-09-09T09:30:00Z',
    updatedAt: '2023-09-10T09:00:00Z'
  },
  {
    id: 23,
    name: 'GoPro HERO 12 Black',
    description: '최신 액션 카메라로, 5.3K 영상 촬영과 안정적인 손떨림 보정 기능을 제공합니다.',
    price: 699000,
    tags: ['카메라', '스포츠'],
    imageUrls: [
      'https://images.unsplash.com/photo-1598188306155-25b4c2b32f83',
      'https://images.unsplash.com/photo-1586380978397-5fcb56c1f4c7'
    ],
    userId: 3,
    createdAt: '2023-09-11T09:15:00Z',
    updatedAt: '2023-09-12T09:45:00Z'
  },
  {
    id: 24,
    name: 'Fitbit Charge 6',
    description: '심박수, 수면, 운동량을 정밀하게 측정해주는 스마트 밴드입니다.',
    price: 249000,
    tags: ['피트니스', '스마트워치'],
    imageUrls: [
      'https://images.unsplash.com/photo-1551817958-20204d6ab184',
      'https://images.unsplash.com/photo-1598970434795-0c54fe7c0641'
    ],
    userId: 1,
    createdAt: '2023-09-15T14:00:00Z',
    updatedAt: '2023-09-16T09:00:00Z'
  },
  {
    id: 25,
    name: 'Xiaomi Mi Band 8',
    description: '저렴한 가격에 피트니스 기능을 갖춘 스마트 밴드입니다.',
    price: 69000,
    tags: ['피트니스', '웨어러블'],
    imageUrls: ['https://images.unsplash.com/photo-1606813909365-59459a4577d8'],
    userId: 5,
    createdAt: '2023-09-19T09:15:00Z',
    updatedAt: '2023-09-21T08:50:00Z'
  },
  {
    id: 26,
    name: 'iPad Pro 12.9 M2',
    description: '강력한 M2 칩을 탑재한 태블릿으로, 전문가용 그래픽 작업에 최적화되어 있습니다.',
    price: 1590000,
    tags: ['태블릿', 'Apple'],
    imageUrls: [
      'https://images.unsplash.com/photo-1606744824163-985d376605aa',
      'https://images.unsplash.com/photo-1611078489935-0e5dbd8d4c4b'
    ],
    userId: 4,
    createdAt: '2023-10-01T08:00:00Z',
    updatedAt: '2023-10-01T09:00:00Z'
  },
  {
    id: 27,
    name: 'DJI Mini 4 Pro',
    description: '컴팩트한 디자인에 4K 카메라를 탑재한 휴대용 드론입니다.',
    price: 1340000,
    tags: ['드론', '카메라'],
    imageUrls: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794',
      'https://images.unsplash.com/photo-1598188306155-25b4c2b32f83'
    ],
    userId: 1,
    createdAt: '2023-10-03T08:00:00Z',
    updatedAt: '2023-10-04T09:00:00Z'
  }
];

// ARTICLES: 22개
export const ARTICLES = [
  {
    id: 1,
    title: '어벤져스: 엔드게임',
    content: '모든 히어로가 집결해 우주적 위협에 맞서는 마블 시네마틱 유니버스의 대서사시.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg'],
    userId: 2,
    createdAt: '2025-10-25T11:13:55.693Z',
    updatedAt: '2025-10-31T15:00:40.281Z'
  },
  {
    id: 2,
    title: '그랜드 부다페스트 호텔',
    content: '유럽의 한 호텔에서 벌어지는 유쾌한 미스터리와 환상적인 비주얼로 가득한 코미디.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/nX5XotM9yprCKarRH4fzOq1VM1J.jpg'],
    userId: 4,
    createdAt: '2025-10-25T12:44:55.904Z',
    updatedAt: '2025-10-31T08:55:41.902Z'
  },
  {
    id: 3,
    title: '스파이더맨: 노 웨이 홈',
    content: '멀티버스의 균열로 인해 다른 세계의 빌런들과 맞서는 청춘 히어로의 성장담.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'],
    userId: 4,
    createdAt: '2025-10-26T09:08:45.104Z',
    updatedAt: '2025-11-03T21:32:50.502Z'
  },
  {
    id: 4,
    title: '반지의 제왕',
    content: '한 반지에 얽힌 인간, 요정, 난쟁이, 오크의 장대한 전쟁과 우정의 서사시.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg'],
    userId: 2,
    createdAt: '2025-10-27T19:14:52.215Z',
    updatedAt: '2025-11-02T08:32:20.904Z'
  },
  {
    id: 5,
    title: '인터스텔라',
    content:
      '인류의 생존을 위해 우주로 떠난 탐사대의 여정을 통해 시간과 사랑의 본질을 탐구하는 SF 명작.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'],
    userId: 3,
    createdAt: '2025-10-27T21:03:14.002Z',
    updatedAt: '2025-11-01T02:43:55.991Z'
  },
  {
    id: 6,
    title: '하울의 움직이는 성',
    content: '저주로 노인이 된 소녀가 마법사 하울과 함께 여행하며 자신을 찾아가는 이야기.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/TfKoEboe0QWqV1dpY0e0sJzDhc.jpg'],
    userId: 2,
    createdAt: '2025-10-28T07:18:22.554Z',
    updatedAt: '2025-11-04T05:00:10.289Z'
  },
  {
    id: 7,
    title: '인셉션',
    content:
      '꿈속에서 또 다른 꿈을 꾸는 다층 구조의 스릴러. 인간의 무의식과 현실의 경계를 탐험하는 놀란 감독의 대표작.',
    imageUrls: [
      'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
      'https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg'
    ],
    userId: 4,
    createdAt: '2025-10-28T09:12:33.542Z',
    updatedAt: '2025-10-29T10:17:45.201Z'
  },
  {
    id: 8,
    title: '포레스트 검프',
    content:
      '지적 장애를 가진 한 남자의 순수한 시선으로 본 미국 현대사의 여정. 감동적인 인생 드라마.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg'],
    userId: 3,
    createdAt: '2025-10-29T05:21:37.004Z',
    updatedAt: '2025-11-02T16:15:10.882Z'
  },
  {
    id: 9,
    title: '기생충',
    content:
      '부잣집과 가난한 집 두 가족의 교묘한 공생 관계가 결국 파국으로 치닫는 블랙코미디. 사회 계급의 벽을 날카롭게 풍자한다.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg'],
    userId: 2,
    createdAt: '2025-10-31T09:55:22.109Z',
    updatedAt: '2025-11-01T18:21:34.624Z'
  },
  {
    id: 10,
    title: '올드보이',
    content: '15년간 감금된 남자가 풀려난 뒤 복수를 향한 진실을 추적하는 충격적인 스릴러.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/pWDtjs568ZfOTMbURQBYuT4Qxka.jpg'],
    userId: 1,
    createdAt: '2025-10-31T10:42:14.509Z',
    updatedAt: '2025-11-03T12:51:27.231Z'
  },
  {
    id: 11,
    title: '타이타닉',
    content: '비극적인 운명의 배 안에서 피어난 사랑. 시대를 초월한 감정선을 그린 클래식 로맨스.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg'],
    userId: 5,
    createdAt: '2025-10-31T15:09:28.203Z',
    updatedAt: '2025-11-02T20:32:10.874Z'
  },
  {
    id: 12,
    title: '쇼생크 탈출',
    content: '억울하게 수감된 남자가 절망 속에서도 희망을 잃지 않고 탈출을 꿈꾸는 감동의 드라마.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg'],
    userId: 4,
    createdAt: '2025-10-30T15:14:56.732Z',
    updatedAt: '2025-11-02T08:23:17.341Z'
  },
  {
    id: 13,
    title: '언터처블: 1%의 우정',
    content: '상류층 장애인과 하층민 돌보미의 우정과 삶의 유머를 담은 프랑스 히트작.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/wrgpC7dBzVhX6e1mZk1K0s8AjtK.jpg'],
    userId: 5,
    createdAt: '2025-10-30T20:12:22.214Z',
    updatedAt: '2025-11-03T03:41:57.419Z'
  },
  {
    id: 14,
    title: '서울의 봄',
    content: '1980년 5월, 혼란의 시대 속에서 군과 시민의 갈등을 그린 실화 기반의 정치 스릴러.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/8pURyujpWHzazb6MZy4Pu4R8eLk.jpg'],
    userId: 1,
    createdAt: '2025-10-31T13:24:40.704Z',
    updatedAt: '2025-11-04T18:44:33.201Z'
  },
  {
    id: 15,
    title: '센과 치히로의 행방불명',
    content: '신비한 세계에 갇힌 소녀가 성장하며 부모를 구하는 여정. 스튜디오 지브리의 대표 걸작.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/oRvMaJOmapypFUcQqpgHMZA6qL9.jpg'],
    userId: 1,
    createdAt: '2025-10-31T16:23:14.002Z',
    updatedAt: '2025-11-03T11:55:32.605Z'
  },
  {
    id: 16,
    title: '라라랜드',
    content:
      '꿈을 좇는 두 예술가의 사랑과 현실 사이의 아픔을 그린 뮤지컬 영화. 화려한 색감과 재즈 선율이 매력적이다.',
    imageUrls: [
      'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
      'https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png'
    ],
    userId: 5,
    createdAt: '2025-11-01T03:11:25.109Z',
    updatedAt: '2025-11-03T14:55:09.204Z'
  },
  {
    id: 17,
    title: '조커',
    content: '사회에 외면당한 남자가 광대로 각성하며 폭력과 혼돈의 상징이 되어가는 심리극.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg'],
    userId: 1,
    createdAt: '2025-11-01T14:09:12.422Z',
    updatedAt: '2025-11-05T11:55:49.502Z'
  },
  {
    id: 18,
    title: '헤어질 결심',
    content:
      '의문의 죽음을 조사하던 형사가 피의자 여인에게 빠져드는 미스터리 멜로. 박찬욱 감독의 섬세한 심리극.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/bawtLQb1o3Y1VxgJBTtY3M3KclU.jpg'],
    userId: 1,
    createdAt: '2025-11-01T17:41:18.804Z',
    updatedAt: '2025-11-04T23:17:03.411Z'
  },
  {
    id: 19,
    title: '라이프 오브 파이',
    content: '난파선에서 벵골호랑이와 함께 생존을 이어가는 한 소년의 초현실적 모험.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/8xPPeCkrrfGWWU9BXnuzxZzXwJ6.jpg'],
    userId: 4,
    createdAt: '2025-11-02T00:52:10.001Z',
    updatedAt: '2025-11-06T07:10:59.384Z'
  },
  {
    id: 20,
    title: '이터널 선샤인',
    content:
      '잊고 싶은 기억을 지워주는 기술을 소재로, 사랑과 기억의 의미를 되묻는 로맨틱 SF 드라마.',
    imageUrls: ['https://image.tmdb.org/t/p/w500/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg'],
    userId: 3,
    createdAt: '2025-11-02T09:31:42.908Z',
    updatedAt: '2025-11-04T07:12:19.100Z'
  },
  {
    id: 21,
    title: '전망좋은 방',
    content:
      '20세기 초중반 조신한 영국 처녀가 격정이 넘치는 이태리를 여행하며 성에 눈뜨는 과정을 코믹하게 묘사한 작품',
    imageUrls: ['https://upload.wikimedia.org/wikipedia/en/d/d1/A_Room_with_a_View_poster.jpg'],
    userId: 1,
    createdAt: '2025-11-05T02:29:11.806Z',
    updatedAt: '2025-11-06T09:11:49.407Z'
  },
  {
    id: 22,
    title: '사촌 비니',
    content:
      '뉴욕 브루클린 출신의 7전8기 변호사 비니의 좌충우돌 첫 케이스! 비니는 사촌 빈센트의 살인누명을 벗겨줄 수 있을 것인가? 남주 조펫지 여주 마리사 토메이가 환상적인 연기의 궁합을 보이다!',
    imageUrls: [
      'https://image.tmdb.org/t/p/w500/4o4M4Fx2G5qBP1dVYQ2PzHYkzDf.jpg',
      'https://upload.wikimedia.org/wikipedia/en/3/3b/My_Cousin_Vinny_poster.jpg'
    ],
    userId: 4,
    createdAt: '2025-11-06T22:45:28.232Z',
    updatedAt: '2025-11-15T14:12:01.232Z'
  }
];

// ARTICLE COMMENTS: 43개
export const ARTICLECOMMENTS = [
  {
    id: 1,
    content: '색감이 예술이에요.',
    articleId: 1,
    userId: 5,
    createdAt: '2025-10-26T15:00:00Z',
    updatedAt: '2025-10-26T15:30:00Z'
  },
  {
    id: 2,
    content: '디테일이 환상적이에요.',
    articleId: 2,
    userId: 3,
    createdAt: '2025-10-26T15:00:00Z',
    updatedAt: '2025-10-26T15:30:00Z'
  },
  {
    id: 3,
    content: '스파이더맨의 새로운 해석이 좋았어요!',
    articleId: 3,
    userId: 5,
    createdAt: '2025-10-27T10:00:00Z',
    updatedAt: '2025-10-27T11:00:00Z'
  },
  {
    id: 4,
    content: '쿠키영상까지 완벽했습니다.',
    articleId: 4,
    userId: 1,
    createdAt: '2025-10-27T10:00:00Z',
    updatedAt: '2025-10-27T11:00:00Z'
  },
  {
    id: 5,
    content: '하울의 성 디자인이 너무 예뻐요.',
    articleId: 6,
    userId: 4,
    createdAt: '2025-10-29T09:15:00Z',
    updatedAt: '2025-10-29T09:30:00Z'
  },
  {
    id: 6,
    content: 'OST 들을 때마다 눈물이 납니다.',
    articleId: 8,
    userId: 5,
    createdAt: '2025-10-29T09:15:00Z',
    updatedAt: '2025-10-29T09:30:00Z'
  },
  {
    id: 7,
    content: '인생 영화입니다.',
    articleId: 8,
    userId: 3,
    createdAt: '2025-10-30T10:20:00Z',
    updatedAt: '2025-10-30T11:10:00Z'
  },
  {
    id: 8,
    content: '포레스트 검프의 순수함이 감동적이에요.',
    articleId: 8,
    userId: 1,
    createdAt: '2025-10-30T10:20:00Z',
    updatedAt: '2025-10-30T11:10:00Z'
  },
  {
    id: 9,
    content: '인간미를 찾을 수 없는 각박한 이야기네요.',
    articleId: 9,
    userId: 2,
    createdAt: '2025-10-31T12:00:00Z',
    updatedAt: '2025-10-31T13:00:00Z'
  },
  {
    id: 10,
    content: '두 주인공의 케미가 끔직하게 좋아요.',
    articleId: 10,
    userId: 5,
    createdAt: '2025-10-31T12:20:00Z',
    updatedAt: '2025-10-31T13:00:00Z'
  },
  {
    id: 11,
    content: '실화라 더 충격적이었어요.',
    articleId: 11,
    userId: 3,
    createdAt: '2025-11-01T08:00:00Z',
    updatedAt: '2025-11-01T09:00:00Z'
  },
  {
    id: 12,
    content: '배우 연기력이 모두 대단했습니다.',
    articleId: 9,
    userId: 1,
    createdAt: '2025-11-01T08:00:00Z',
    updatedAt: '2025-11-01T09:00:00Z'
  },
  {
    id: 13,
    content: '엔드게임은 진정한 대서사시!',
    articleId: 1,
    userId: 5,
    createdAt: '2025-11-01T13:00:00Z',
    updatedAt: '2025-11-01T13:30:00Z'
  },
  {
    id: 14,
    content: '사회경제적 지위, 인종 따위를 넘어서는 인간미의 승리',
    articleId: 13,
    userId: 5,
    createdAt: '2025-11-01T13:00:00Z',
    updatedAt: '2025-11-01T13:30:00Z'
  },
  {
    id: 15,
    content: '민주화를 꿈꾸는 시민군의 열망이 느껴져요',
    articleId: 14,
    userId: 3,
    createdAt: '2025-11-02T08:00:00Z',
    updatedAt: '2025-11-02T09:00:00Z'
  },
  {
    id: 16,
    content: '진짜 판타지의 정석',
    articleId: 4,
    userId: 3,
    createdAt: '2025-11-02T08:00:00Z',
    updatedAt: '2025-11-02T09:00:00Z'
  },
  {
    id: 17,
    content: '조커 연기가 미쳤어요.',
    articleId: 17,
    userId: 3,
    createdAt: '2025-11-02T10:00:00Z',
    updatedAt: '2025-11-02T11:00:00Z'
  },
  {
    id: 18,
    content: '엔딩에서 소름 돋았습니다.',
    articleId: 17,
    userId: 1,
    createdAt: '2025-11-02T10:00:00Z',
    updatedAt: '2025-11-02T11:00:00Z'
  },
  {
    id: 19,
    content: '눈물이 멈추지 않았어요',
    articleId: 18,
    userId: 4,
    createdAt: '2025-11-02T21:00:00Z',
    updatedAt: '2025-11-02T21:40:00Z'
  },
  {
    id: 20,
    content: '레오나르도 연기가 압권입니다',
    articleId: 11,
    userId: 1,
    createdAt: '2025-11-02T21:00:00Z',
    updatedAt: '2025-11-02T21:40:00Z'
  },
  {
    id: 21,
    content: '시간의 개념을 이렇게 표현하다니 대단해요',
    articleId: 5,
    userId: 5,
    createdAt: '2025-11-02T22:00:00Z',
    updatedAt: '2025-11-02T23:00:00Z'
  },
  {
    id: 22,
    content: 'OST도 정말 좋았어요',
    articleId: 16,
    userId: 3,
    createdAt: '2025-11-02T22:00:00Z',
    updatedAt: '2025-11-02T23:00:00Z'
  },
  {
    id: 23,
    content: '호랑이랑의 관계가 인상 깊었어요.',
    articleId: 19,
    userId: 1,
    createdAt: '2025-11-03T09:00:00Z',
    updatedAt: '2025-11-03T10:00:00Z'
  },
  {
    id: 24,
    content: '생명에 대한 메시지가 강렬했어요.',
    articleId: 19,
    userId: 5,
    createdAt: '2025-11-03T09:00:00Z',
    updatedAt: '2025-11-03T10:00:00Z'
  },
  {
    id: 25,
    content: '환상적인 세계관!',
    articleId: 19,
    userId: 5,
    createdAt: '2025-11-03T10:00:00Z',
    updatedAt: '2025-11-03T10:30:00Z'
  },
  {
    id: 26,
    content: '치히로의 성장 서사가 인상적이에요',
    articleId: 15,
    userId: 3,
    createdAt: '2025-11-03T10:00:00Z',
    updatedAt: '2025-11-03T10:30:00Z'
  },
  {
    id: 27,
    content: '결말의 반전이 충격적이었어요',
    articleId: 10,
    userId: 5,
    createdAt: '2025-11-03T12:00:00Z',
    updatedAt: '2025-11-03T12:40:00Z'
  },
  {
    id: 28,
    content: '박찬욱 감독다운 긴장감',
    articleId: 18,
    userId: 2,
    createdAt: '2025-11-03T12:00:00Z',
    updatedAt: '2025-11-03T12:40:00Z'
  },
  {
    id: 29,
    content: '음악과 색감이 너무 아름다워요',
    articleId: 16,
    userId: 5,
    createdAt: '2025-11-03T12:10:00Z',
    updatedAt: '2025-11-03T13:20:00Z'
  },
  {
    id: 30,
    content: '엔딩이 마음 아파요',
    articleId: 18,
    userId: 2,
    createdAt: '2025-11-03T12:10:00Z',
    updatedAt: '2025-11-03T13:20:00Z'
  },
  {
    id: 31,
    content: '꿈과 현실의 경계가 흥미로워요',
    articleId: 7,
    userId: 4,
    createdAt: '2025-11-03T14:30:00Z',
    updatedAt: '2025-11-03T15:00:00Z'
  },
  {
    id: 32,
    content: '음악도 완벽했어요',
    articleId: 16,
    userId: 4,
    createdAt: '2025-11-03T14:30:00Z',
    updatedAt: '2025-11-03T15:00:00Z'
  },
  {
    id: 33,
    content: '사랑과 기억에 대한 철학적인 영화예요',
    articleId: 20,
    userId: 5,
    createdAt: '2025-11-04T07:45:00Z',
    updatedAt: '2025-11-04T08:05:00Z'
  },
  {
    id: 34,
    content: '희망을 잃지 않는 주인공의 모습이 감동적이에요',
    articleId: 12,
    userId: 4,
    createdAt: '2025-11-04T08:00:00Z',
    updatedAt: '2025-11-04T08:45:00Z'
  },
  {
    id: 35,
    content: '서스펜스가 대단해요',
    articleId: 10,
    userId: 2,
    createdAt: '2025-11-04T21:00:00Z',
    updatedAt: '2025-11-04T21:30:00Z'
  },
  {
    id: 36,
    content: '음악이 분위기를 살려줘요',
    articleId: 4,
    userId: 3,
    createdAt: '2025-11-04T21:00:00Z',
    updatedAt: '2025-11-04T21:30:00Z'
  },
  {
    id: 37,
    content: '봉준호 감독의 연출력 최고',
    articleId: 9,
    userId: 4,
    createdAt: '2025-11-05T18:15:00Z',
    updatedAt: '2025-11-05T18:40:00Z'
  },
  {
    id: 38,
    content: '마지막 장면이 소름 돋았어요',
    articleId: 17,
    userId: 3,
    createdAt: '2025-11-05T19:15:00Z',
    updatedAt: '2025-11-07T21:25:00Z'
  },
  {
    id: 39,
    content: '영국식 감성이 너무 좋아요',
    articleId: 21,
    userId: 4,
    createdAt: '2025-11-06T09:15:00Z',
    updatedAt: '2025-11-06T10:20:00Z'
  },
  {
    id: 40,
    content: '잔잔하지만 감정이 깊어요',
    articleId: 21,
    userId: 4,
    createdAt: '2025-11-06T10:11:00Z',
    updatedAt: '2025-11-06T10:20:00Z'
  },
  {
    id: 41,
    content: '조 페시의 연기 정말 웃겼어요!',
    articleId: 22,
    userId: 2,
    createdAt: '2025-11-07T10:00:00Z',
    updatedAt: '2025-11-07T11:00:00Z'
  },
  {
    id: 42,
    content: '대사 하나하나에 박장대소. 특히 초반의 감옥씬',
    articleId: 22,
    userId: 1,
    createdAt: '2025-11-07T10:30:00Z',
    updatedAt: '2025-11-07T11:00:00Z'
  },
  {
    id: 43,
    content: '조 페시와 마리사 토메이, 환상의 연기 궁합',
    articleId: 22,
    userId: 1,
    createdAt: '2025-11-07T11:00:00Z',
    updatedAt: '2025-11-07T11:00:00Z'
  }
];

// PRODUCT COMMENTS: 49개
export const PRODUCTCOMMENTS = [
  {
    id: 1,
    content: '압력 기능이 강력해요!',
    productId: 1,
    userId: 5,
    createdAt: '2023-05-10T11:00:00Z',
    updatedAt: '2023-05-10T11:45:00Z'
  },
  {
    id: 2,
    content: '요리 초보도 쉽게 써요.',
    productId: 1,
    userId: 2,
    createdAt: '2023-05-10T11:00:00Z',
    updatedAt: '2023-05-10T11:45:00Z'
  },
  {
    id: 3,
    content: '디자인이 예쁘고 음질도 좋아요',
    productId: 2,
    userId: 3,
    createdAt: '2023-05-15T08:20:00Z',
    updatedAt: '2023-05-15T09:00:00Z'
  },
  {
    id: 4,
    content: 'OLED 화면이 정말 선명하고 색감이 풍부합니다',
    productId: 3,
    userId: 4,
    createdAt: '2023-05-24T08:30:00Z',
    updatedAt: '2023-05-24T09:00:00Z'
  },
  {
    id: 5,
    content: '게임 로딩 속도가 빨라서 쾌적합니다',
    productId: 4,
    userId: 1,
    createdAt: '2023-05-25T13:45:00Z',
    updatedAt: '2023-05-26T07:00:00Z'
  },
  {
    id: 6,
    content: '휴대용으로 너무 좋아요',
    productId: 5,
    userId: 4,
    createdAt: '2023-05-25T13:45:00Z',
    updatedAt: '2023-05-26T07:00:00Z'
  },
  {
    id: 7,
    content: '그래픽이 훌륭해요',
    productId: 6,
    userId: 3,
    createdAt: '2023-06-06T10:00:00Z',
    updatedAt: '2023-06-06T10:30:00Z'
  },
  {
    id: 8,
    content: 'SSD 덕분에 로딩이 정말 빨라요',
    productId: 7,
    userId: 3,
    createdAt: '2023-06-06T10:00:00Z',
    updatedAt: '2023-06-06T10:30:00Z'
  },
  {
    id: 9,
    content: '작고 예뻐요.',
    productId: 8,
    userId: 3,
    createdAt: '2023-06-13T09:00:00Z',
    updatedAt: '2023-06-13T09:00:00Z'
  },
  {
    id: 10,
    content: '야외에서도 소리가 좋아요.',
    productId: 5,
    userId: 4,
    createdAt: '2023-06-13T08:00:00Z',
    updatedAt: '2023-06-13T08:30:00Z'
  },
  {
    id: 11,
    content: '휴대성이 좋아서 출퇴근길에 딱이에요',
    productId: 11,
    userId: 4,
    createdAt: '2023-06-26T10:00:00Z',
    updatedAt: '2023-06-26T10:40:00Z'
  },
  {
    id: 12,
    content: '고속 충전 정말 잘 됩니다',
    productId: 7,
    userId: 5,
    createdAt: '2023-06-26T10:00:00Z',
    updatedAt: '2023-06-26T10:40:00Z'
  },
  {
    id: 13,
    content: '키감이 정말 좋아요.',
    productId: 8,
    userId: 2,
    createdAt: '2023-07-02T09:30:00Z',
    updatedAt: '2023-07-02T10:00:00Z'
  },
  {
    id: 14,
    content: '화면 색감이 끝내줍니다',
    productId: 10,
    userId: 1,
    createdAt: '2023-07-12T18:30:00Z',
    updatedAt: '2023-07-13T07:10:00Z'
  },
  {
    id: 15,
    content: '영화 볼 때 몰입감 최고',
    productId: 10,
    userId: 5,
    createdAt: '2023-07-12T18:30:00Z',
    updatedAt: '2023-07-13T07:10:00Z'
  },
  {
    id: 16,
    content: '음질이 정말 좋아요',
    productId: 11,
    userId: 2,
    createdAt: '2023-07-15T09:12:00Z',
    updatedAt: '2023-07-15T09:45:00Z'
  },
  {
    id: 17,
    content: '노이즈 캔슬링이 기대 이상입니다',
    productId: 11,
    userId: 4,
    createdAt: '2023-07-15T09:15:00Z',
    updatedAt: '2023-07-15T09:45:00Z'
  },
  {
    id: 18,
    content: '책 읽을 맛 나네요.',
    productId: 12,
    userId: 5,
    createdAt: '2023-07-17T09:00:00Z',
    updatedAt: '2023-07-17T10:30:00Z'
  },
  {
    id: 19,
    content: '조명 반사도 적어서 좋아요.',
    productId: 12,
    userId: 2,
    createdAt: '2023-07-17T10:00:00Z',
    updatedAt: '2023-07-17T10:30:00Z'
  },
  {
    id: 20,
    content: '먼지 하나 없이 완벽해요!',
    productId: 9,
    userId: 4,
    createdAt: '2023-07-20T14:05:00Z',
    updatedAt: '2023-07-21T08:22:00Z'
  },
  {
    id: 21,
    content: '착용감이 편안합니다',
    productId: 13,
    userId: 1,
    createdAt: '2023-07-20T14:05:00Z',
    updatedAt: '2023-07-21T08:22:00Z'
  },
  {
    id: 22,
    content: '손목에 딱 맞고 조작감이 부드러워요',
    productId: 15,
    userId: 4,
    createdAt: '2023-07-21T15:00:00Z',
    updatedAt: '2023-07-21T15:00:00Z'
  },
  {
    id: 23,
    content: '클릭 소리가 조용해서 사무실에서도 좋아요',
    productId: 13,
    userId: 3,
    createdAt: '2023-07-22T11:30:00Z',
    updatedAt: '2023-07-22T12:00:00Z'
  },
  {
    id: 24,
    content: '성능 대비 가격 굿',
    productId: 16,
    userId: 4,
    createdAt: '2023-07-23T09:30:00Z',
    updatedAt: '2023-07-23T10:30:00Z'
  },
  {
    id: 25,
    content: '디자인도 예뻐요.',
    productId: 17,
    userId: 4,
    createdAt: '2023-07-23T09:33:00Z',
    updatedAt: '2023-07-23T10:30:00Z'
  },
  {
    id: 26,
    content: '크기가 커서 거실에 딱이네요',
    productId: 10,
    userId: 2,
    createdAt: '2023-07-25T11:00:00Z',
    updatedAt: '2023-07-25T11:05:00Z'
  },
  {
    id: 27,
    content: '클릭감이 좋아요',
    productId: 13,
    userId: 3,
    createdAt: '2023-08-01T09:00:00Z',
    updatedAt: '2023-08-01T10:00:00Z'
  },
  {
    id: 28,
    content: '가벼워서 손목이 덜 아파요',
    productId: 15,
    userId: 5,
    createdAt: '2023-08-01T09:00:00Z',
    updatedAt: '2023-08-01T10:00:00Z'
  },
  {
    id: 29,
    content: '카메라 성능이 정말 뛰어나요',
    productId: 17,
    userId: 4,
    createdAt: '2023-08-03T09:20:00Z',
    updatedAt: '2023-08-03T09:50:00Z'
  },
  {
    id: 30,
    content: '야간 촬영 품질이 훌륭합니다',
    productId: 16,
    userId: 3,
    createdAt: '2023-08-03T09:20:00Z',
    updatedAt: '2023-08-03T09:50:00Z'
  },
  {
    id: 31,
    content: '사진 색감이 자연스럽고 초점이 빠릅니다',
    productId: 17,
    userId: 4,
    createdAt: '2023-08-03T11:00:00Z',
    updatedAt: '2023-08-03T11:30:00Z'
  },
  {
    id: 32,
    content: '서피스 너무 유용해요.',
    productId: 18,
    userId: 2,
    createdAt: '2023-08-04T08:30:00Z',
    updatedAt: '2023-08-04T09:00:00Z'
  },
  {
    id: 33,
    content: '윈도우 터치감 좋아요.',
    productId: 18,
    userId: 1,
    createdAt: '2023-08-04T09:25:00Z',
    updatedAt: '2023-08-04T09:40:00Z'
  },
  {
    id: 34,
    content: '야간 촬영도 만족스러워요',
    productId: 16,
    userId: 5,
    createdAt: '2023-08-04T10:45:00Z',
    updatedAt: '2023-08-04T11:15:00Z'
  },
  {
    id: 35,
    content: '가격 대비 성능이 뛰어납니다',
    productId: 18,
    userId: 2,
    createdAt: '2023-08-04T10:45:00Z',
    updatedAt: '2023-08-04T11:15:00Z'
  },
  {
    id: 36,
    content: '무거운 편이지만 성능이 압도적입니다',
    productId: 19,
    userId: 1,
    createdAt: '2023-08-10T12:00:00Z',
    updatedAt: '2023-08-10T12:05:00Z'
  },
  {
    id: 37,
    content: '소리 정말 좋아요!',
    productId: 20,
    userId: 4,
    createdAt: '2023-08-17T12:30:00Z',
    updatedAt: '2023-08-17T13:00:00Z'
  },
  {
    id: 38,
    content: '배터리도 오래가네요.',
    productId: 21,
    userId: 1,
    createdAt: '2023-08-17T12:30:00Z',
    updatedAt: '2023-08-17T13:00:00Z'
  },
  {
    id: 39,
    content: '저음이 강력해서 좋습니다',
    productId: 22,
    userId: 4,
    createdAt: '2023-09-11T08:45:00Z',
    updatedAt: '2023-09-11T09:10:00Z'
  },
  {
    id: 40,
    content: '영상 퀄리티 미쳤어요!',
    productId: 23,
    userId: 4,
    createdAt: '2023-09-12T09:00:00Z',
    updatedAt: '2023-09-12T09:30:00Z'
  },
  {
    id: 41,
    content: '액션캠 중 최고네요.',
    productId: 23,
    userId: 1,
    createdAt: '2023-09-12T09:00:00Z',
    updatedAt: '2023-09-12T09:30:00Z'
  },
  {
    id: 42,
    content: '운동 기록 정확해요.',
    productId: 24,
    userId: 1,
    createdAt: '2023-09-16T10:00:00Z',
    updatedAt: '2023-09-16T10:45:00Z'
  },
  {
    id: 43,
    content: '배터리 오래가네요.',
    productId: 24,
    userId: 2,
    createdAt: '2023-09-16T10:00:00Z',
    updatedAt: '2023-09-16T10:45:00Z'
  },
  {
    id: 44,
    content: '이 가격대에서는 최고입니다',
    productId: 25,
    userId: 1,
    createdAt: '2023-09-22T10:15:00Z',
    updatedAt: '2023-09-22T10:30:00Z'
  },
  {
    id: 45,
    content: '어디에서든 게임 가능!',
    productId: 14,
    userId: 1,
    createdAt: '2023-09-22T10:15:00Z',
    updatedAt: '2023-09-22T10:30:00Z'
  },
  {
    id: 46,
    content: '아이패드 M2 진짜 빠르네요.',
    productId: 26,
    userId: 3,
    createdAt: '2023-10-02T09:00:00Z',
    updatedAt: '2023-10-02T09:30:00Z'
  },
  {
    id: 47,
    content: '영상 퀄리티가 아주 뛰어나요',
    productId: 27,
    userId: 4,
    createdAt: '2023-10-05T08:00:00Z',
    updatedAt: '2023-10-05T09:00:00Z'
  },
  {
    id: 48,
    content: '휴대성이 좋아요',
    productId: 26,
    userId: 4,
    createdAt: '2023-10-05T08:00:00Z',
    updatedAt: '2023-10-05T09:00:00Z'
  },
  {
    id: 49,
    content: '조작이 간단해요',
    productId: 25,
    userId: 5,
    createdAt: '2023-10-05T08:00:00Z',
    updatedAt: '2023-10-05T09:00:00Z'
  }
];
