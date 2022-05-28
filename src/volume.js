import Superblock from './Superblock'
import BlockGroupDescriptor from './BGD'
import Inode from './Inode'
import DirectoryEntry from './DirectoryEntry'
import C from './consts'

class Volume {
  constructor() {
    this.arrayBuffer = undefined
    this.dataView = undefined
    this.superblock = null
    this.groups = null
    this.inodes = null
    this.blockSize = undefined
    this.volumeSize = undefined
    // this.
  }

  async importFile(file) {
    this.arrayBuffer = await file.arrayBuffer()
    this.dataView = new DataView(this.arrayBuffer)
    this.superblock = new Superblock(this)
    this.blockSize = (1 << 10) << this.superblock.s_log_block_size
    this.volumeSize = this.superblock.s_blocks_count * this.blockSize
    this.groupsNumber = Math.floor(
      (this.superblock.s_blocks_count +
        this.superblock.s_blocks_per_group -
        1) /
        this.superblock.s_blocks_per_group
    )
    console.log('blockSize:', this.blockSize)
    console.log('volumeSize:', this.volumeSize)
    console.log('groupsNumber:', this.groupsNumber)

    console.log(this.superblock)
    // this.readDirectory(C.EXT2_ROOT_INO, 'hz')
    // this.readDirectory(81, 'hz')
    // console.log(this.getInode(2));
  }

  getData(offset, size) {
    if (size <= 4) {
      return this.dataView[`getUint${size << 3}`](offset, true)
    }
    const tmp = this.arrayBuffer.slice(offset, offset + size)
    return tmp
  }

  getBlockGroupDescriptor(index) {
    return new BlockGroupDescriptor(this, index);
  }

  getInode(index) {
    return new Inode(this, index);
  }



  getFileFromBlock(inode, offset, size) {

  }

  // getFullFile(inode, offset, maxSize) {
  //   let read = 0;
  //   const size = Math.min(maxSize, inode.getSize())
  //   const file = new ArrayBuffer(size);
  //   while (read < size) {
  //     let tmp = this.getFileFromBlock(file, inode, offset + read, size - read);
  //     // if ()
  //     // read += ;
  //   }

  //   return file;
  // }

  readDirectory(inodeIndex) {
    const inode = this.getInode(inodeIndex);
    console.log(inode);
    console.log(inode.i_mode, C.EXT2_S_IFDIR);
    if (inode.i_mode >> 12 !== C.EXT2_S_IFDIR >> 12)
      return null;

    const inodeSize = inode.getSize();
    console.log('inodeSize', inodeSize);

    const entries = [];
    let offset = 0;
    do {
      const dirEntry = new DirectoryEntry(this, inode.i_block[0]*this.blockSize + offset);
      entries.push(dirEntry);
      offset += dirEntry.rec_len;
    } while (offset < this.blockSize);

    // console.log(entries);
    return entries;
  }

  // async exortFile() {}
}

export default Volume
