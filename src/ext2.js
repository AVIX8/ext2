import BGDT from "./BGDT";
import Superblock from "./superblock";
import Volume from "./volume";

class ext2 {
  constructor() {
    this.volume = new Volume();
    this.superblock = null;
    this.bgdt = null;
    this.inodes = []
  }

  async createFile() {

  }

  async importFile(file) {
    await this.volume.importFile(file)
    // const buffer = await file.arrayBuffer()
    // this.volume = new DataView(buffer)
    this.superblock = new Superblock(this.volume);
    this.bgdt = new BGDT(this.volume);
    console.log(this.superblock);
    console.log(this.bgdt);
  }

  createDirectory() {}
  removeDirectory() {}

  readFile(directory, filename) {}
  writeFile(directory, data) {}
  removeFile(filename) {}
}


const ext2_ = new ext2()
export default ext2_;
