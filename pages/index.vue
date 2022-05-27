<template>
<v-app>

  <v-row align="center" justify="center" class="ma-0">
    <v-card class="">
      <v-card-text>


        <v-file-input
          :value="file"
          prepend-icon="mdi-file"
          accept=".ext2volume"
          placeholder="открыть .ext2volume"
        />
        <v-btn  @click="createNewVolume"> Создать ext2volume</v-btn>
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
    createNewVolume() {
      console.log('createNewVolume')
    },
  },
}
</script>
