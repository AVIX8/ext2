export default {
  // i_mode
  EXT2_S_IFSOCK: 0xc000, //	socket
  EXT2_S_IFLNK: 0xa000, //	symbolic link
  EXT2_S_IFREG: 0x8000, //	regular file
  EXT2_S_IFBLK: 0x6000, //	block device
  EXT2_S_IFDIR: 0x4000, //	directory
  EXT2_S_IFCHR: 0x2000, //	character device
  EXT2_S_IFIFO: 0x1000, //	fifo
  // -- process execution user/group override --
  EXT2_S_ISUID: 0x0800, //	Set process User ID
  EXT2_S_ISGID: 0x0400, //	Set process Group ID
  EXT2_S_ISVTX: 0x0200, //	sticky bit
  // -- access rights --
  EXT2_S_IRUSR: 0x0100, //	user read
  EXT2_S_IWUSR: 0x0080, //	user write
  EXT2_S_IXUSR: 0x0040, //	user execute
  EXT2_S_IRGRP: 0x0020, //	group read
  EXT2_S_IWGRP: 0x0010, //	group write
  EXT2_S_IXGRP: 0x0008, //	group execute
  EXT2_S_IROTH: 0x0004, //	others read
  EXT2_S_IWOTH: 0x0002, //	others write
  EXT2_S_IXOTH: 0x0001, //	others execute

  EXT2_BAD_INO: 1, //	bad blocks inode
  EXT2_ROOT_INO: 2, //	root directory inode
  EXT2_ACL_IDX_INO: 3, //	ACL index inode (deprecated?)
  EXT2_ACL_DATA_INO: 4, //	ACL data inode (deprecated?)
  EXT2_BOOT_LOADER_INO: 5, //	boot loader inode
  EXT2_UNDEL_DIR_INO: 6, //	undelete directory inode

  EXT2_FT_UNKNOWN: 0, //	Unknown File Type
  EXT2_FT_REG_FILE: 1, //	Regular File
  EXT2_FT_DIR: 2, //	Directory File
  EXT2_FT_CHRDEV: 3, //	Character Device
  EXT2_FT_BLKDEV: 4, //	Block Device
  EXT2_FT_FIFO: 5, //	Buffer File
  EXT2_FT_SOCK: 6, //	Socket File
  EXT2_FT_SYMLINK: 7, //	Symbolic Link
}
