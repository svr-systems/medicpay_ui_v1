<template>
  <v-text-field
    v-model="val"
    :label="label"
    :rules="rules"
    :disabled="isDisabled"
    :type="password_show ? 'text' : 'password'"
    prepend-icon="mdi-lock"
    maxlength="30"
    dense
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
        <span>
          {{ password_show ? "Ocultar" : "Mostrar" }}
        </span>
      </v-tooltip>
    </template>
  </v-text-field>
</template>

<script>
export default {
  props: ["model", "label", "rules", "disabled"],
  data() {
    return {
      isDisabled: false,
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
  },
};
</script>
