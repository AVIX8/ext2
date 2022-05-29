import Superblock from './Superblock'
import BlockGroupDescriptor from './BGD'
import Inode from './Inode'
import DirectoryEntry from './DirectoryEntry'
import C from './consts'

// function concatenateUint8Array(...arrays) {
//   let totalLength = 0
//   for (const arr of arrays) {
//     totalLength += arr.byteLength
//   }
//   const result = new Uint8Array(totalLength)
//   let offset = 0
//   for (const arr of arrays) {
//     result.set(arr, offset)
//     console.log(result);
//     offset += arr.byteLength
//   }
//   return result
// }

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
    return this.superblock
  }

  getData(offset, size, littleEndian = true) {
    if (size <= 4) {
      return this.dataView[`getUint${size << 3}`](offset, littleEndian)
    }
    const tmp = this.arrayBuffer.slice(offset, offset + size)
    return tmp
  }

  getBlockGroupDescriptor(index) {
    return new BlockGroupDescriptor(this, index)
  }

  getInode(index) {
    return new Inode(this, index)
  }

  getBlockIndex(inode, index) {
    if (index < 12) return inode.i_block[index]

    const indexesPerBlock = this.blockSize / 4
    const indexesPerBlock2 = indexesPerBlock * indexesPerBlock

    index -= 12
    if (index < indexesPerBlock) {
      const blockIndex1 = inode.i_block[12]
      const offset1 = blockIndex1 * this.blockSize
      return this.getData(offset1 + 4 * index, 4)
    }

    index -= indexesPerBlock
    if (index < indexesPerBlock2) {
      const blockIndex1 = inode.i_block[13]
      const offset1 = blockIndex1 * this.blockSize
      const blockIndex2 = this.getData(
        offset1 + 4 * Math.floor(index / indexesPerBlock),
        4
      )
      const offset2 = blockIndex2 * this.blockSize
      return this.getData(offset2 + 4 * (index % indexesPerBlock), 4)
    }

    index -= indexesPerBlock2
    const blockIndex1 = inode.i_block[14]
    const offset1 = blockIndex1 * this.blockSize
    const blockIndex2 = this.getData(
      offset1 + 4 * Math.floor(index / indexesPerBlock2),
      4
    )
    const offset2 = blockIndex2 * this.blockSize
    const blockIndex3 = this.getData(
      offset2 + 4 * Math.floor((index % indexesPerBlock2) / indexesPerBlock),
      4
    )
    const offset3 = blockIndex3 * this.blockSize
    return this.getData(
      offset3 + 4 * ((index % indexesPerBlock2) % indexesPerBlock),
      4
    )
  }

  getFileFromBlock(blockIndex, size) {
    size = Math.min(this.blockSize, size)
    return this.getData(blockIndex * this.blockSize, size)
  }

  getFullFile(inode) {
    const size = inode.size
    const file = new Uint8Array(size)

    let parsedBlocks = 0
    let curSize = 0
    while (curSize < size) {
      // console.log(curSize, size)
      const blockIndex = this.getBlockIndex(inode, parsedBlocks)
      const offset = blockIndex * this.blockSize
      // console.log(offset, offset + Math.min(this.blockSize, size - curSize));
      const tmp = this.arrayBuffer.slice(
        offset,
        offset + Math.min(this.blockSize, size - curSize)
      )
      // console.log(tmp)
      file.set(new Uint8Array(tmp), curSize)
      // console.log(file);
      if (tmp.byteLength === 0) break
      curSize += tmp.byteLength
      parsedBlocks++
      // console.log(parsedBlocks, curSize, size)
    }

    return file
  }

  readDirectory(inodeIndex) {
    const inode = this.getInode(inodeIndex)
    console.log(inode)
    console.log(inode.i_mode, C.EXT2_S_IFDIR)
    if (inode.i_mode >> 12 !== C.EXT2_S_IFDIR >> 12) return null

    const inodeSize = inode.size
    console.log('inodeSize', inodeSize)

    const entries = []
    let offset = 0
    do {
      const dirEntry = new DirectoryEntry(
        this,
        inode.i_block[0] * this.blockSize + offset
      )
      entries.push(dirEntry)
      offset += dirEntry.rec_len
    } while (offset < this.blockSize)

    // console.log(entries);
    return entries
  }

  // async exortFile() {}
}

const volume = new Volume()
export default volume
