<template>
  <v-tooltip v-if="val" left>
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        icon
        small
        :color="color"
        class="ml-1"
        @click.prevent="docDwd"
      >
        <v-icon small> mdi-{{ icon }} </v-icon>
      </v-btn>
    </template>
    {{ lab }}
  </v-tooltip>
</template>

<script>
import { getBlob, getDateTime } from "@/general";

export default {
  props: ["lab", "val", "icon", "color"],
  components: {},
  data() {
    return {
      doc_obj: null,
    };
  },

  methods: {
    docDwd() {
      let link = document.createElement("a");
      link.setAttribute("target", "_blank");
      link.href = this.doc_obj;
      link.download = getDateTime("", "", "") + "." + this.val.ext;
      link.click();
    },
  },

  mounted() {
    if (this.val) {
      this.doc_obj = URL.createObjectURL(getBlob(this.val.cnt, this.val.ext));
    }
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
