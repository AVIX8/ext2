import ext2 from '~/src/Ext2'

export const state = () => ({
  filename: '',
  tree: [{name: 'root', isDir: true, inode: 2, children: []}],
})

const hiddenDir = ['.', '..']

export const mutations = {
  setFilename(state, filename) {
    state.filename = filename;
  },
  readDirectory(state, item) {
    const items = ext2.readDirectory(item.inode).filter(el => !hiddenDir.includes(el.name))
    items.forEach(item => {
      if (item.isDir) {
        item.children = []
      }
    })

    item.children = items;
  }
}

export const actions = {
  async openFile({ commit, state }, file) {
    commit('setFilename', file.name)
    await ext2.importFile(file)

    commit('readDirectory', state.tree[0])
  },
}
