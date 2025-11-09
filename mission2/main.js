import { getProductList } from './service/ProductService.js';
import Product from './class/ProductClass.js';
import ElectronicProduct from './class/ElectronicProductClass.js';
import { StrFuns, print } from './lib/myFuns.js'; // my own functions

// query parameters: only 4 allowed
const params = {
  page: 1,
  pageSize: 10,
  orderBy: 'recent',
  //keyword: '스웨터',
};

// retrieving product data from API server
const products = await getProductList(params);

// print(products);
// print('-----------------------------------');

let eProductInstance = []; // an array for ElectronicProduct Instances
let productInstance = []; // an array for Product Instances
let tagStr = ''; // a string for tags

let nEP = 0; // a counter for ElectronicProduct Instancess
let nP = 0; // a counter for Product Instances

print('Sorting...');
print('-----------------------------------');

for (let i = 0; i < products.length; i++) {
  // 테그가 양식없이 마구 들어가 있어서, 테그를 공백없는 한개의 스트링으로 전환
  // 이 부분은 태그의 양식이 확정되면 없애도 될 듯
  tagStr = StrFuns.trimAll([...products[i].tags].join(''));

  // sort by the tag: '전자제품'
  if (tagStr.includes('전자제품')) {
    eProductInstance.push(new ElectronicProduct(products[i]));
    print(`${products[i].id}: 전자제품 <- ${products[i].tags}`);
    ++nEP;
  } else {
    productInstance.push(new Product(products[i]));
    print(`${products[i].id}: 비전자제품 <- ${products[i].tags}`);
    ++nP;
  }
}

//print result
print(productInstance); // view the array for Product Instances
print(eProductInstance); // view the array for Electronic Product Instances
print_summary(nP, nEP);

// print(eProductInstance[0].viewAll()); // view all properties including private

// test #favoriteCount works as intended
// print(eProductInstance[0].favoriteCount)
// eProductInstance[0].favoriteCount = 100;

// print(eProductInstance[0].favoriteCount);  // test favorite() method
// eProductInstance[0].favorite()
// eProductInstance[0].favorite()
// eProductInstance[0].favorite()
// print(eProductInstance[0].favoriteCount);

function print_summary(n1, n2) {
  print('-----------------------------------'); // view the summary
  print(`products, retrieved:        ${n1 + n2}`); // total products from the servier
  print(`products, electronic:       ${n2}`); // number of Electronic Product Instances
  print(`products, non-electronic:   ${n1}`); // number of non-Electronic Product Instances
  print('');
}
