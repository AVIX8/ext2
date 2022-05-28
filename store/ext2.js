import ext2 from '~/src/ext2'
// const fileReader = new FileReader();
// fileReader.onload = function(event) {
//   const arrayBuffer = event.target.result;
// };

export const state = () => ({
  volume: undefined,
})

export const mutations = {
  setVolume(state, file) {
    // this.file = file
    // fileReader.readAsArrayBuffer(file);
    console.log(file.arrayBuffer());
  },
}

export const actions = {
  openFile(state, file) {
    ext2.importFile(file)
  },
}
