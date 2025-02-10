<template>
  <v-snackbar
    v-model="visible"
    app
    top
    elevation="12"
    :color="color"
    timeout="5500"
    transition="slide-y-transition"
  >
    <div class="text-center">
      {{ msg }}
    </div>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    color: null,
    msg: null,
    visible: false,
  }),
  methods: {
    show(color, msg) {
      this.color = color;
      this.msg = msg;
      this.visible = true;
    },
  },
};
</script>
