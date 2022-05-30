<template>
  <v-treeview
    :active.sync="active"
    :items="$store.state.ext2.tree"
    :load-children="getChildren"
    :open.sync="openItems"
    dense
    :open-on-click="false"
    activatable
    item-key="inode"
    return-object
  >
    <template #prepend="{ item, open }">
      <v-icon v-if="item.isDir" color="grey">
        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
      <v-icon v-else :color="getColor(item)">
        {{ getIcon(item) }}
      </v-icon>
    </template>
  </v-treeview>
</template>

<script>
const files = {
  html: { icon: 'mdi-language-html5', color: 'orange' },
  js: { icon: 'mdi-nodejs', color: 'green' },
  json: { icon: 'mdi-code-json', color: 'yellow' },
  md: { icon: 'mdi-language-markdown', color: 'blue' },
  pdf: { icon: 'mdi-file-pdf', color: 'red' },
  png: { icon: 'mdi-file-image', color: 'green' },
  jpg: { icon: 'mdi-file-image', color: 'green' },
  c: { icon: 'mdi-language-c', color: 'blue' },
  mp3: { icon: 'mdi-file-music', color: 'red' },
  mp4: { icon: 'mdi-file-video', color: 'red' },
  txt: { icon: 'mdi-file-document-outline', color: 'blue' },
  xls: { icon: 'mdi-file-excel', color: 'green' },
}

export default {
  data: () => ({
    active: [],
    openItems: [],
  }),
  watch: {
    active() {
      if (!this.active.length) this.select(undefined)
      else this.select(this.active[0])
    },
  },
  methods: {
    getChildren(item) {
      // console.log('getChildren', item)
      this.$store.commit('ext2/readDirectory', item)
    },
    isFolder(item) {
      return item.name.split('.')[1] === undefined
    },
    getIcon(item) {
      return files[item.name.split('.').slice(-1)[0]]?.icon ?? 'mdi-file'
    },
    getColor(item) {
      return files[item.name.split('.').slice(-1)[0]]?.color ?? 'ligh-greay'
    },
    select(item) {
      this.$store.commit('ext2/setActive', item)
    },
  },
}
</script>

<style scoped></style>
