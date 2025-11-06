import { Product } from './product.js';

export class ElectronicProduct extends Product {
  constructor(name, decription, prcie, tags, images, manufacturerr) {
    super(name, decription, prcie, tags, images);
    this._manufacturerr = manufacturerr;
  }
  GetManufacturerr() {
    return this._manufacturerr;
  }
  SetManufacturerr(manufacturerr) {
    this._manufacturerr = manufacturerr;
  }
}
