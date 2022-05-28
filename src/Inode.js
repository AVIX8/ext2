class Inode {
  constructor(v, i) {
    this.v = v
    const blockGroupIndex = Math.floor(
      (i - 1) / v.superblock.s_inodes_per_group
    )
    const blockIndex = v.getBlockGroupDescriptor(blockGroupIndex).bg_inode_table

    const localInodeIndex = (i - 1) % v.superblock.s_inodes_per_group
    const offset =
      blockIndex * v.blockSize + localInodeIndex * v.superblock.s_inode_size
    console.log(
      blockIndex,
      v.blockSize,
      localInodeIndex,
      v.superblock.s_inode_size,
      offset
    )

    this.i_mode = v.getData(offset + 0, 2)
    this.i_uid = v.getData(offset + 2, 2)
    this.i_size = v.getData(offset + 4, 4)
    this.i_atime = v.getData(offset + 8, 4)
    this.i_ctime = v.getData(offset + 12, 4)
    this.i_mtime = v.getData(offset + 16, 4)
    this.i_dtime = v.getData(offset + 20, 4)
    this.i_gid = v.getData(offset + 24, 2)
    this.i_links_count = v.getData(offset + 26, 2)
    this.i_blocks = v.getData(offset + 28, 4)
    this.i_flags = v.getData(offset + 32, 4)
    this.i_osd1 = v.getData(offset + 36, 4)
    this.i_block = []
    for (let i = 0; i < 15; i++) {
      this.i_block.push(v.getData(offset + 40 + 4 * i, 4))
    }
    this.i_generation = v.getData(offset + 100, 4)
    this.i_file_acl = v.getData(offset + 104, 4)
    this.i_dir_acl = v.getData(offset + 108, 4)
    this.i_faddr = v.getData(offset + 112, 4)
    this.i_osd2 = v.getData(offset + 116, 12)
  }

  getSize() {
    return this.i_size | (this.i_dir_acl << 32)
  }
}

export default Inode
