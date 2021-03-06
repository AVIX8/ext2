import Vue from 'vue'
import volume from '~/src/Volume'

const root = {name: 'root', isDir: true, inode: 2, children: []}

const defaultState = {
  file: null,
  filename: '',
  tree: [{...root}],
  active: null,
  fileInfo: {},
  superblock: null,
}

export const state = () => (JSON.parse(JSON.stringify(defaultState)))

const hiddenDir = ['.', '..']

export const mutations = {
  setFile(state, file) {
    state.file = file;
    state.filename = file.name;
  },
  setSuperblock(state, superblock){
    Vue.set(state, 'superblock', superblock)
  },
  closeFile(state) {
    Object.assign(state, JSON.parse(JSON.stringify(defaultState)))
  },
  readDirectory(state, item) {
    const items = volume.readDirectory(item.inode).filter(el => !hiddenDir.includes(el.name))
    items.forEach(child => {
      if (child.isDir) {
        child.children = []
      }
    })

    Vue.set(item, 'children', items)
  },

  setActive(state, item) {
    Vue.set(state, 'active', item)
  }
}

export const actions = {
  async openFile({ commit, state }, file) {
    commit('closeFile')
    commit('setFile', file)
    // console.log(state.volume);
    const superblock = await volume.importFile(file);
    // console.log(superblock);
    commit('setSuperblock', superblock)
    commit('readDirectory', state.tree[0])
  },

  exportFile({ commit, state }) {
    // console.log(state.active);
    const filename = state.active.name
    let file = volume.getFullFile(state.active)
    // console.log(file);
    file = new Blob([new Uint8Array(file)])
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove()
  }
}
