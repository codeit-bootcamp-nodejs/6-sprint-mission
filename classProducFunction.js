// 휴대폰 룰렛 당첨 코드
class Product {
  constructor(name, description, price, manufacturer) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.manufacturer = manufacturer;
  }

  showInfo() {
    console.log(`제품명: ${this.name}`);
    console.log(`상세정보: ${this.description}`);
    console.log(`가격: ${this.price.toLocaleString()}원`);
    console.log(`제조사: ${this.manufacturer}`);
  }
}

class Product_Phone extends Product {
  result() {
    console.log(`${this.name}가 당첨되었습니다. 바로 예약을 도와드릴까요?`);
  }
}

// 예시 데이터 10개
const phones = [
  new Product_Phone(
    'iPhone 16 Pro',
    '2024 / 256GB / 블루 티타늄',
    1890000,
    'Apple'
  ),
  new Product_Phone(
    'Galaxy S24 Ultra',
    '2024 / 512GB / 그라파이트',
    1740000,
    'Samsung'
  ),
  new Product_Phone('iPhone 15', '2023 / 128GB / 핑크', 1190000, 'Apple'),
  new Product_Phone(
    'Galaxy Z Flip6',
    '2024 / 256GB / 민트',
    1390000,
    'Samsung'
  ),
  new Product_Phone('iPhone SE 3', '2022 / 64GB / 레드', 590000, 'Apple'),
];

// 랜덤 섞기
const randomBox = phones.sort(() => Math.random() - 0.5);

// 목록 출력
console.log('--- 휴대폰 목록 ---');
randomBox.forEach((p, i) => {
  console.log(`${i + 1}. ${p.name} (${p.manufacturer})`);
});

// 결과
const randomPick = randomBox[Math.floor(Math.random() * randomBox.length)];
console.log('--- 상세 정보 ---');
randomPick.showInfo();
console.log('--- 당첨 결과 ---');
randomPick.result();
console.log('');
console.log('< Y / N >');
