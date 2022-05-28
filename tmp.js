
const table = `0	4	inode
4	2	rec_len
6	1	name_len
7	1	file_type
8	255	name`

table.split('\n').forEach(element => {
  const e = element.split('	');
  // console.log('{ name:', `'${element[2]}'`, ', offset:', element[0], ', size:', element[1], '},' );
  console.log(`this.${e[2]} = volume.getData(offset+${e[0]}, ${e[1]})`);
});
