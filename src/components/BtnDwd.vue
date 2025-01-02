<template>
  <span>
    <v-tooltip v-if="doc_obj" bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon small @click.prevent="docDwd">
          <v-icon small> mdi-download </v-icon>
        </v-btn>
      </template>
      Descargar
    </v-tooltip>
  </span>
</template>

<script>
import { getBlob, getDateTime } from "@/exports";

export default {
  props: ["val"],
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
