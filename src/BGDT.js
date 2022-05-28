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

const offset = 2048;

const fields = [
  { name: 'bg_block_bitmap' , offset: 0 , size: 4 },
  { name: 'bg_inode_bitmap' , offset: 4 , size: 4 },
  { name: 'bg_inode_table' , offset: 8 , size: 4 },
  { name: 'bg_free_blocks_count' , offset: 12 , size: 2 },
  { name: 'bg_free_inodes_count' , offset: 14 , size: 2 },
  { name: 'bg_used_dirs_count' , offset: 16 , size: 2 },
  { name: 'bg_pad' , offset: 18 , size: 2 },
  { name: 'bg_reserved' , offset: 20 , size: 12 },
]

class BGDT {
  constructor(volume) {
    fields.forEach(field => {
      this[field.name] = volume.getData(offset+field.offset, field.size);
    })
  }
}

export default BGDT;
