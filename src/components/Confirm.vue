<template>
  <v-dialog v-model="visible" persistent overlay-color="black" max-width="400">
    <v-card elevation="24" flat>
      <v-card-title />
      <v-card-text v-if="msg">
        <v-row dense class="text-center">
          <v-col cols="12">
            <v-icon color="warning" size="64">
              mdi-alert-octagon-outline
            </v-icon>
          </v-col>
          <v-col cols="12">
            <div class="title pt-2">
              {{ msg }}
            </div>
          </v-col>
          <v-col cols="12">
            <v-btn fab small color="secondary" @click.prevent="cancel">
              <v-icon small> mdi-close </v-icon>
            </v-btn>
            <span class="mx-2" />
            <v-btn
              ref="btn_confirm"
              fab
              small
              color="success"
              @click.prevent="accept"
            >
              <v-icon small> mdi-check </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    msg: null,
    visible: false,
    resolve: null,
  }),
  methods: {
    show(msg) {
      this.msg = msg;
      this.visible = true;

      return new Promise((resolve) => {
        this.resolve = resolve;
      });
    },
    accept() {
      this.resolve(true);
      this.visible = false;
    },
    cancel() {
      this.resolve(false);
      this.visible = false;
    },
  },
};
</script>
