<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon small class="mr-1" :to="route">
        <v-icon small> mdi-chevron-left </v-icon>
      </v-btn>
    </template>
    Átras
  </v-tooltip>
</template>

<script>
export default {
  props: ["route"],
};
</script>
