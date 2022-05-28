// Block Group Descriptor Table https://www.nongnu.org/ext2-doc/ext2.html#block-group-descriptor-table

// The block group descriptor table is an array of block group descriptor,
// used to define parameters of all the block groups.
// It provides the location of the inode bitmap and inode table,
// block bitmap, number of free blocks and inodes, and some other useful information.

// The block group descriptor table starts on the first block following the superblock.
// This would be the third block on a 1KiB block file system, or the second block for 2KiB and larger block file systems.
// Shadow copies of the block group descriptor table are also stored with every copy of the superblock.

// Depending on how many block groups are defined,
// this table can require multiple blocks of storage.
// Always refer to the superblock in case of doubt.

const size = 32

class BlockGroupDescriptor {
  constructor(v, i) {
    const offset = (1 + (v.blockSize === 1024))*v.blockSize + size * i
    console.log('BlockGroupDescriptor i, offset:', i, offset);
    this.bg_block_bitmap = v.getData(offset + 0, 4)
    this.bg_inode_bitmap = v.getData(offset + 4, 4)
    this.bg_inode_table = v.getData(offset + 8, 4)
    this.bg_free_blocks_count = v.getData(offset + 12, 2)
    this.bg_free_inodes_count = v.getData(offset + 14, 2)
    this.bg_used_dirs_count = v.getData(offset + 16, 2)
    this.bg_pad = v.getData(offset + 18, 2)
    this.bg_reserved = v.getData(offset + 20, 12)
  }
}

export default BlockGroupDescriptor
