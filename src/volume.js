

class Volume {
  constructor() {
    this.arrayBuffer = undefined;
    this.dataView = undefined;
  }

  async importFile(file) {
    this.arrayBuffer = await file.arrayBuffer();
    this.dataView = new DataView(this.arrayBuffer);

  }

  getData(offset, size) {
    if (size <= 4) {
      return this.dataView[`getUint${size<<3}`](offset, true)
    }
    const tmp = this.arrayBuffer.slice(offset, offset + size);
    return tmp
  }

  async exortFile() {}
}

export default Volume;
