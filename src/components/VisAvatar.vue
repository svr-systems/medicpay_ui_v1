<template>
  <div>
    <v-avatar :size="size_val">
      <v-img v-if="val" :src="getImg(val)" />
      <v-icon v-else :size="size_val"> mdi-{{ icon_val }} </v-icon>
    </v-avatar>
    <span v-if="lab_prop" v-text="lab" class="ml-2 caption" />
  </div>
</template>

<script>
import { getBlob } from "@/exports";

export default {
  props: ["val", "lab", "icon", "size"],
  data() {
    return {
      doc_obj: null,
      lab_prop: false,
      icon_val: null,
      size_val: null,
    };
  },
  methods: {
    getImg(v) {
      return URL.createObjectURL(getBlob(v.cnt, v.ext));
    },
  },
  mounted() {
    this.lab_prop = typeof this.lab != "undefined";
    this.icon_val =
      typeof this.icon != "undefined" ? this.icon : "account-circle";
    this.size_val = typeof this.size != "undefined" ? this.size : 21;
  },
};
</script>
