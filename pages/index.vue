<template>
  <v-app>
    <v-row align="center" justify="center" class="ma-0">
      <v-card>
        <v-card-text>
          <v-file-input
            ref="fileInput"
            accept=".ext2volume"
            class="d-none"
            @change="onFileChanged"
          />

          <v-btn large block left class="mb-4" @click="handleOpenFile">
            <v-icon left>mdi-file-import</v-icon> Открыть ext2volume<v-spacer/></v-btn
          >
          <v-btn large block @click="createNewFile">
            <v-icon left>mdi-file-plus</v-icon> Создать ext2volume<v-spacer/></v-btn
          >
        </v-card-text>
      </v-card>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      file: undefined,
    }
  },
  methods: {
    handleOpenFile() {
      this.$refs.fileInput.$refs.input.click()
    },
    onFileChanged(file) {
      this.$store.dispatch('ext2/openFile', file)
      this.$router.push('/explorer')
    },
    createNewFile() {
      console.log('createNewFile')
    },
  },
}
</script>
