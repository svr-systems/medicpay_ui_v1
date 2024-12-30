<template>
  <v-tooltip left>
    <template v-slot:activator="{ on }">
      <v-btn :small="isSmall" v-on="on" icon @click.prevent="themeDarkAction">
        <v-icon :small="isSmall"> mdi-brightness-6 </v-icon>
      </v-btn>
    </template>
    Utilizar modo: {{ $store.getters.getConf.theme_dark ? "Obscuro" : "Claro" }}
  </v-tooltip>
</template>

<script>
export default {
  props: ["small"],
  data: () => ({
    color: null,
    msg: null,
    visible: false,
    isSmall: false,
  }),
  methods: {
    themeDarkHandle() {
      this.$vuetify.theme.dark = !this.$store.getters.getConf.theme_dark;
    },
    themeDarkAction() {
      this.$store.dispatch("themeDarkAction");
      this.themeDarkHandle();
    },
  },
  mounted() {
    this.isSmall = typeof this.small !== "undefined";
    this.themeDarkHandle();
  },
};
</script>
