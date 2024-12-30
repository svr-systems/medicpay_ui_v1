<template>
  <v-card flat>
    <v-card-title class="p-0">
      <v-row dense>
        <v-col cols="8" class="subtitle-1">
          <v-icon small> mdi-home </v-icon>
          {{ $route.meta.title }}
        </v-col>
        <v-col cols="4" class="text-right"> </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12" class="text-center">
          <v-img
            :src="require('@/assets/logo.png')"
            class="my-3"
            contain
            height="90"
          />
          <h1 class="display-1 font-weight-bold mb-3">Bienvenido</h1>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>
