import {  TextDecoder } from 'text-decoding'
import C from './consts'
import Inode from './Inode'

const enc = new TextDecoder('ascii')

class DirectoryEntry extends Inode {
  constructor(volume, offset) {
    super(volume, volume.getData(offset + 0, 4))
    this.inode = volume.getData(offset + 0, 4)
    this.rec_len = volume.getData(offset + 4, 2)
    this.name_len = volume.getData(offset + 6, 1)
    this.file_type = volume.getData(offset + 7, 1)
    this.name = enc.decode(
      volume.arrayBuffer.slice(offset + 8, offset + 8 + this.name_len)
    )

    this.isDir = this.i_mode >> 12 === C.EXT2_S_IFDIR >> 12
  }
}

export default DirectoryEntry
