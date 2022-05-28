// Superblock https://www.nongnu.org/ext2-doc/ext2.html#superblock
// The superblock is always located at byte offset 1024 from the beginning of the file,
// block device or partition formatted with Ext2 and later variants (Ext3, Ext4).
// Its structure is mostly constant from Ext2 to Ext3 and Ext4 with only some minor changes.

const offset = 1024;

const fields = [
  { name: 's_inodes_count' , offset: 0 , size: 4 },
  { name: 's_blocks_count' , offset: 4 , size: 4 },
  { name: 's_r_blocks_count' , offset: 8 , size: 4 },
  { name: 's_free_blocks_count' , offset: 12 , size: 4 },
  { name: 's_free_inodes_count' , offset: 16 , size: 4 },
  { name: 's_first_data_block' , offset: 20 , size: 4 },
  { name: 's_log_block_size' , offset: 24 , size: 4 },
  { name: 's_log_frag_size' , offset: 28 , size: 4 },
  { name: 's_blocks_per_group' , offset: 32 , size: 4 },
  { name: 's_frags_per_group' , offset: 36 , size: 4 },
  { name: 's_inodes_per_group' , offset: 40 , size: 4 },
  { name: 's_mtime' , offset: 44 , size: 4 },
  { name: 's_wtime' , offset: 48 , size: 4 },
  { name: 's_mnt_count' , offset: 52 , size: 2 },
  { name: 's_max_mnt_count' , offset: 54 , size: 2 },
  { name: 's_magic' , offset: 56 , size: 2 },
  { name: 's_state' , offset: 58 , size: 2 },
  { name: 's_errors' , offset: 60 , size: 2 },
  { name: 's_minor_rev_level' , offset: 62 , size: 2 },
  { name: 's_lastcheck' , offset: 64 , size: 4 },
  { name: 's_checkinterval' , offset: 68 , size: 4 },
  { name: 's_creator_os' , offset: 72 , size: 4 },
  { name: 's_rev_level' , offset: 76 , size: 4 },
  { name: 's_def_resuid' , offset: 80 , size: 2 },
  { name: 's_def_resgid' , offset: 82 , size: 2 },
  { name: 's_first_ino' , offset: 84 , size: 4 },
  { name: 's_inode_size' , offset: 88 , size: 2 },
  { name: 's_block_group_nr' , offset: 90 , size: 2 },
  { name: 's_feature_compat' , offset: 92 , size: 4 },
  { name: 's_feature_incompat' , offset: 96 , size: 4 },
  { name: 's_feature_ro_compat' , offset: 100 , size: 4 },
  { name: 's_uuid' , offset: 104 , size: 16 },
  { name: 's_volume_name' , offset: 120 , size: 16 },
  { name: 's_last_mounted' , offset: 136 , size: 64 },
  { name: 's_algo_bitmap' , offset: 200 , size: 4 },
  { name: 's_prealloc_blocks' , offset: 204 , size: 1 },
  { name: 's_prealloc_dir_blocks' , offset: 205 , size: 1 },
  // { name: '(alignment)' , offset: 206 , size: 2 },
  { name: 's_journal_uuid' , offset: 208 , size: 16 },
  { name: 's_journal_inum' , offset: 224 , size: 4 },
  { name: 's_journal_dev' , offset: 228 , size: 4 },
  { name: 's_last_orphan' , offset: 232 , size: 4 },
  { name: 's_hash_seed' , offset: 236 , size: 16 },
  { name: 's_def_hash_version' , offset: 252 , size: 1 },
  { name: 's_default_mount_options' , offset: 256 , size: 4 },
  { name: 's_first_meta_bg' , offset: 260 , size: 4 },
]

class Superblock {
  constructor(volume) {
    fields.forEach(field => {
      this[field.name] = volume.getData(offset+field.offset, field.size);
    })


    // this.s_inodes_count = volume.getUint32(offset+0);
    // this.s_blocks_count = volume.getUint32(offset+4);
    // this.s_r_blocks_count = volume.getUint32(offset+8);
    // this.s_free_blocks_count = volume.getUint32(offset+12);
    // this.s_free_inodes_count = volume.getUint32(offset+16);
    // this.s_first_data_block = volume.getUint32(offset+20);
    // this.s_log_block_size = volume.getUint32(offset+24);
    // this.s_log_frag_size = volume.getUint32(offset+28);
    // this.s_blocks_per_group = volume.getUint32(offset+32);
    // this.s_frags_per_group = volume.getUint32(offset+36);
    // this.s_inodes_per_group = volume.getUint32(offset+40);
    // this.s_mtime = volume.getUint32(offset+44);
    // this.s_wtime = volume.getUint32(offset+48);
    // this.s_mnt_count = volume.getUint16(offset+52);
    // this.s_max_mnt_count = volume.getUint16(offset+54);
    // this.s_magic = volume.getUint16(offset+56);
    // this.s_state = volume.getUint16(offset+58);
    // this.s_errors = volume.getUint16(offset+60);
    // this.s_minor_rev_level = volume.getUint16(offset+62);
    // this.s_lastcheck = volume.getUint32(offset+64);
    // this.s_checkinterval = volume.getUint32(offset+68);
    // this.s_creator_os = volume.getUint32(offset+72);
    // this.s_rev_level = volume.getUint32(offset+76);
    // this.s_def_resuid = volume.getUint16(offset+80);
    // this.s_def_resgid = volume.getUint16(offset+82);
    // // -- EXT2_DYNAMIC_REV Specific --
    // this.s_first_ino = volume.getUint32(offset+84);
    // this.s_inode_size = volume.getUint16(offset+88);
    // this.s_block_group_nr = volume.getUint16(offset+90);
    // this.s_feature_compat = volume.getUint32(offset+92);
    // this.s_feature_incompat = volume.getUint32(offset+96);
    // this.s_feature_ro_compat = volume.getUint32(offset+100);
    // this.s_algo_bitmap = volume.getUint32(offset+200);
    // // -- Performance Hints --
    // this.s_prealloc_blocks = volume.getUint8(offset+204);
    // this.s_prealloc_dir_blocks = volume.getUint8(offset+205);
    // // this.alignment = volume.getUint16(offset+206);
    // // -- Journaling Support --
    // this.s_journal_inum = volume.getUint32(offset+224);
    // this.s_journal_dev = volume.getUint32(offset+228);
    // this.s_last_orphan = volume.getUint32(offset+232);
    // // -- Directory Indexing Support --
    // this.s_def_hash_version = volume.getUint8(offset+252);

    // // -- Other options --
    // this.s_default_mount_options = volume.getUint32(offset+256);
    // this.s_first_meta_bg = volume.getUint32(offset+260);
  }


}

export default Superblock
