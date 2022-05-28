
import Volume from "./Volume";

class ext2 {
  constructor() {
    this.volume = new Volume();

    // this.inodes = []
  }

  // async createFile() {}

  async importFile(file) {
    await this.volume.importFile(file)
  }


  readDirectory(inodeIndex) {
    return this.volume.readDirectory(inodeIndex)
  }

  createDirectory() {}
  removeDirectory() {}

  readFile(directory, filename) {}
  writeFile(directory, data) {}
  removeFile(filename) {}
}


const ext2_ = new ext2()
export default ext2_;
