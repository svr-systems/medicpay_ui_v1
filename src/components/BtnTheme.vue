<template>
  <v-tooltip left>
    <template v-slot:activator="{ on }">
      <v-btn small v-on="on" icon @click.prevent="themeDarkAction">
        <v-icon small> mdi-brightness-6 </v-icon>
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
    this.themeDarkHandle();
  },
};
</script>
