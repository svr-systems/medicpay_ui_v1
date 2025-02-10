<template>
  <div>
    <div class="text-caption font-weight-bold" v-text="lab" />
    <div>
      <div v-if="val">
        <v-tooltip v-if="img_prop" right>
          <template v-slot:activator="{ on }">
            <v-avatar
              v-on="on"
              class="pointer"
              size="21"
              @click.prevent="img_dlg = true"
            >
              <v-img :src="doc_obj" />
            </v-avatar>
          </template>
          Ver
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon x-small @click.prevent="docDwd">
              <v-icon small> mdi-download </v-icon>
            </v-btn>
          </template>
          Descargar
        </v-tooltip>
      </div>
      <v-tooltip v-else right>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" small> mdi-alert </v-icon>
        </template>
        Pendiente
      </v-tooltip>
    </div>
    <v-dialog
      v-model="img_dlg"
      persistent
      overlay-color="black"
      max-width="350"
    >
      <v-card flat>
        <v-card-title class="card_title_border">
          <v-row dense>
            <v-col cols="6">
              <CardTitle :text="lab" icon="" sub />
            </v-col>
            <v-col cols="6">
              <div class="text-right">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      icon
                      small
                      color="primary"
                      @click.prevent="img_dlg = false"
                    >
                      <v-icon small> mdi-close </v-icon>
                    </v-btn>
                  </template>
                  Cerrar
                </v-tooltip>
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text v-if="doc_obj">
          <v-row dense>
            <v-col cols="12">
              <v-img :src="doc_obj" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getBlob, getDateTime } from "@/general";
import CardTitle from "@/components/CardTitle.vue";

export default {
  props: ["lab", "val", "img"],
  components: {
    CardTitle,
  },
  data() {
    return {
      doc_obj: null,
      img_prop: null,
      img_dlg: false,
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

    this.img_prop = typeof this.img != "undefined";
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
