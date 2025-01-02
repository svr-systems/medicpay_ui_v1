<template>
  <v-text-field
    v-model="val"
    :label="label"
    dense
    outlined
    :type="password_show ? 'text' : 'password'"
    :rules="rules"
    maxlength="30"
    prepend-icon="mdi-lock"
    :disabled="isDisabled"
    :counter="isCounter"
  >
    <template v-slot:append>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            text
            x-small
            :disabled="isDisabled"
            @click.prevent="password_show = !password_show"
          >
            <v-icon small> mdi-eye{{ password_show ? "" : "-off" }} </v-icon>
          </v-btn>
        </template>
        {{ password_show ? "Ocultar" : "Mostrar" }}
      </v-tooltip>
    </template>
  </v-text-field>
</template>

<script>
export default {
  props: ["model", "label", "rules", "disabled", "counter"],
  data() {
    return {
      isDisabled: false,
      isCounter: false,
      password_show: false,
    };
  },
  computed: {
    val: {
      get() {
        return this.model;
      },
      set(v) {
        this.$emit("update:model", v);
      },
    },
  },
  mounted() {
    this.isDisabled =
      typeof this.disabled !== "undefined" ? this.disabled : false;
    this.isCounter = typeof this.counter !== "undefined" ? this.counter : false;
  },
};
</script>
