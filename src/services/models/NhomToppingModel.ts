export default class NhomTopping {
  _id: string;
  tenNhomTopping: string;

  constructor(tenNhomTopping: string, _id: string) {
    this.tenNhomTopping = tenNhomTopping;
    this._id = _id;
  }
}
