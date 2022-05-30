<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer
      v-if="$store.state.ext2.file"
      app
      clipped
      permanent
      width="400px"
    >
      <a-folder-tree />
    </v-navigation-drawer>

    <v-app-bar app clipped-left class="app-bar">
      <v-toolbar-title>{{ $store.state.ext2.filename }}</v-toolbar-title>
      <v-btn v-if="$store.state.ext2.file" icon @click="closeFile"
        ><v-icon>mdi-close</v-icon></v-btn
      >
      <v-spacer></v-spacer>

      <v-file-input
        ref="fileInput"
        :value="$store.state.ext2.file"
        accept=".ext2volume"
        class="d-none"
        @change="onFileChanged"
      />

      <v-btn disabled icon><v-icon>mdi-file-plus</v-icon></v-btn>

      <v-btn icon @click="handleOpenFile"
        ><v-icon>mdi-file-import</v-icon></v-btn
      >

      <v-btn disabled icon><v-icon>mdi-file-export</v-icon></v-btn>
      <v-divider vertical inset />
      <v-btn icon @click="switchTheme"><v-icon>{{ $vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon></v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  methods: {
    closeFile() {
      this.$store.commit('ext2/closeFile')
    },
    handleOpenFile() {
      this.$refs.fileInput.$refs.input.click()
    },
    onFileChanged(file) {
      this.$store.dispatch('ext2/openFile', file)
    },
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  },
}
</script>

<style scoped>
.app-bar >>> .v-toolbar__content {
  gap: 8px;
}
</style>
