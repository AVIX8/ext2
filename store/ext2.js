
// const fileReader = new FileReader();
// fileReader.onload = function(event) {
//   const arrayBuffer = event.target.result;
// };

export const state = () => ({
  file: undefined,
})

export const mutations = {
  openFile(state, file) {
    // this.file = file
    // fileReader.readAsArrayBuffer(file);
    console.log(file.arrayBuffer());
  },
}

export const actions = {
  async openFile(state, file) {
    const buffer = await file.arrayBuffer()
    console.log(new Int8Array(buffer).toString('utf8'));
  },
}
