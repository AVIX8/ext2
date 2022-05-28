<template>
  <v-col>

    <!-- header -->
    <v-row class="header">
      <v-card-title>{{ $store.state.ext2.filename }}</v-card-title>
      <v-btn link to="/"  class="my-auto" icon><v-icon>mdi-close</v-icon></v-btn>
      <v-btn class="my-auto" disabled icon><v-icon>mdi-file-export</v-icon></v-btn>
      <v-spacer></v-spacer>
    </v-row>

    <v-row>

      <!-- дерево папок -->
      <v-col>
        <a-folder-tree />
      </v-col>

      <!--  -->
      <v-col>
        {{ $store.state.ext2 }}
      </v-col>

      <v-col>

      </v-col>
    </v-row>

  </v-col>


</template>


<style scoped>
.header {
  display: flex;
  gap: 8px;
}
</style>
