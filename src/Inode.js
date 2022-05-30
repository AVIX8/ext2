class Inode {
  constructor(volume, i) {
    this.volume = volume
    const blockGroupIndex = Math.floor(
      (i - 1) / volume.superblock.s_inodes_per_group
    )
    const blockIndex = volume.getBlockGroupDescriptor(blockGroupIndex).bg_inode_table

    const localInodeIndex = (i - 1) % volume.superblock.s_inodes_per_group
    const offset =
      blockIndex * volume.blockSize + localInodeIndex * volume.superblock.s_inode_size
    // console.log(
    //   blockIndex,
    //   volume.blockSize,
    //   localInodeIndex,
    //   volume.superblock.s_inode_size,
    //   offset
    // )

    this.i_mode = volume.getData(offset + 0, 2)
    this.i_uid = volume.getData(offset + 2, 2)
    this.i_size = volume.getData(offset + 4, 4)
    this.i_atime = volume.getData(offset + 8, 4)*1000
    this.i_ctime = volume.getData(offset + 12, 4)*1000
    this.i_mtime = volume.getData(offset + 16, 4)*1000
    this.i_dtime = volume.getData(offset + 20, 4)*1000
    this.i_gid = volume.getData(offset + 24, 2)
    this.i_links_count = volume.getData(offset + 26, 2)
    this.i_blocks = volume.getData(offset + 28, 4)
    this.i_flags = volume.getData(offset + 32, 4)
    this.i_osd1 = volume.getData(offset + 36, 4)
    this.i_block = []
    for (let i = 0; i < 15; i++) {
      this.i_block.push(volume.getData(offset + 40 + 4 * i, 4))
    }
    this.i_generation = volume.getData(offset + 100, 4)
    this.i_file_acl = volume.getData(offset + 104, 4)
    this.i_dir_acl = volume.getData(offset + 108, 4)
    this.i_faddr = volume.getData(offset + 112, 4)
    this.i_osd2 = volume.getData(offset + 116, 12)

    this.size = this.i_size | (this.i_dir_acl << 32)
  }
}

export default Inode
