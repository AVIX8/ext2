import {  TextDecoder } from 'text-decoding'
import C from './consts'

const enc = new TextDecoder('ascii')

class DirectoryEntry {
  constructor(volume, offset) {
    this.inode = volume.getData(offset + 0, 4)
    this.rec_len = volume.getData(offset + 4, 2)
    this.name_len = volume.getData(offset + 6, 1)
    this.file_type = volume.getData(offset + 7, 1)
    this.name = enc.decode(
      volume.arrayBuffer.slice(offset + 8, offset + 8 + this.name_len)
    )

    this.i_mode = volume.getInode(this.inode).i_mode
    this.isDir = this.i_mode >> 12 === C.EXT2_S_IFDIR >> 12
  }
}

export default DirectoryEntry
