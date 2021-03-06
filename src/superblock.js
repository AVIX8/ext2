// Superblock https://www.nongnu.org/ext2-doc/ext2.html#superblock
// The superblock is always located at byte offset 1024 from the beginning of the file,
// block device or partition formatted with Ext2 and later variants (Ext3, Ext4).
// Its structure is mostly constant from Ext2 to Ext3 and Ext4 with only some minor changes.

const offset = 1024;

class Superblock {
  constructor(v) {
    this.s_inodes_count = v.getData(offset + 0, 4)
    this.s_blocks_count = v.getData(offset + 4, 4)
    this.s_r_blocks_count = v.getData(offset + 8, 4)
    this.s_free_blocks_count = v.getData(offset + 12, 4)
    this.s_free_inodes_count = v.getData(offset + 16, 4)
    this.s_first_data_block = v.getData(offset + 20, 4)
    this.s_log_block_size = v.getData(offset + 24, 4)
    this.s_log_frag_size = v.getData(offset + 28, 4)
    this.s_blocks_per_group = v.getData(offset + 32, 4)
    this.s_frags_per_group = v.getData(offset + 36, 4)
    this.s_inodes_per_group = v.getData(offset + 40, 4)
    this.s_mtime = v.getData(offset + 44, 4) * 1000
    this.s_wtime = v.getData(offset + 48, 4) * 1000
    this.s_mnt_count = v.getData(offset + 52, 2)
    this.s_max_mnt_count = v.getData(offset + 54, 2)
    this.s_magic = v.getData(offset + 56, 2)
    this.s_state = v.getData(offset + 58, 2)
    this.s_errors = v.getData(offset + 60, 2)
    this.s_minor_rev_level = v.getData(offset + 62, 2)
    this.s_lastcheck = v.getData(offset + 64, 4) * 1000
    this.s_checkinterval = v.getData(offset + 68, 4)
    this.s_creator_os = v.getData(offset + 72, 4)
    this.s_rev_level = v.getData(offset + 76, 4)
    this.s_def_resuid = v.getData(offset + 80, 2)
    this.s_def_resgid = v.getData(offset + 82, 2)
    this.s_first_ino = v.getData(offset + 84, 4)
    this.s_inode_size = v.getData(offset + 88, 2) || 128;
    this.s_block_group_nr = v.getData(offset + 90, 2)
    this.s_feature_compat = v.getData(offset + 92, 4)
    this.s_feature_incompat = v.getData(offset + 96, 4)
    this.s_feature_ro_compat = v.getData(offset + 100, 4)
    this.s_uuid = v.getData(offset + 104, 16)
    this.s_volume_name = v.getData(offset + 120, 16)
    this.s_last_mounted = v.getData(offset + 136, 64)
    this.s_algo_bitmap = v.getData(offset + 200, 4)
    this.s_prealloc_blocks = v.getData(offset + 204, 1)
    this.s_prealloc_dir_blocks = v.getData(offset + 205, 1)
    // this.['(alignment)'] = v.getData(offset+206, 2)
    this.s_journal_uuid = v.getData(offset + 208, 16)
    this.s_journal_inum = v.getData(offset + 224, 4)
    this.s_journal_dev = v.getData(offset + 228, 4)
    this.s_last_orphan = v.getData(offset + 232, 4)
    this.s_hash_seed = v.getData(offset + 236, 16)
    this.s_def_hash_version = v.getData(offset + 252, 1)
    // this['padding - reserved for future expansion'] = v.getData(offset+253, 3)
    this.s_default_mount_options = v.getData(offset + 256, 4)
    this.s_first_meta_bg = v.getData(offset + 260, 4)
    // this['Unused - reserved for future revisions'] = v.getData(offset+264, 760)
  }


}

export default Superblock
