<template>
  <v-card flat :loading="ldg">
    <v-card-title>
      <v-row dense>
        <v-col cols="8">
          <BtnBack :route="{ name: route }" />
          <CardTitle :text="$route.meta.title" :icon="$route.meta.icon" />
        </v-col>
        <v-col cols="4" class="text-right">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                fab
                x-small
                color="warning"
                :to="{
                  name: route + '.update',
                  params: { id: id },
                }"
              >
                <v-icon small> mdi-pencil </v-icon>
              </v-btn>
            </template>
            Editar
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text v-if="item">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="card_title_border">
              <v-row dense>
                <v-col cols="8">
                  <CardTitle text="GENERAL" sub />
                </v-col>
                <v-col cols="4" class="text-right">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        icon
                        small
                        @click.prevent="reg_dlg = true"
                      >
                        <v-icon small> mdi-database-clock </v-icon>
                      </v-btn>
                    </template>
                    Registro
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" sm="12" md="3">
                  <VisVal :val="item.name" lab="Nombre" />
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <VisVal :val="item.example_type.name" lab="Tipo" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                fab
                x-small
                color="error"
                @click.prevent="deleteItem"
              >
                <v-icon small> mdi-delete </v-icon>
              </v-btn>
            </template>
            Eliminar
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-text>
    <DlgReg v-model="reg_dlg" :item="item" />
  </v-card>
</template>

<script>
import { URL_API, getHdrs, getRsp, getErr } from "@/exports";
import Axios from "axios";
import BtnBack from "@/components/BtnBack.vue";
import CardTitle from "@/components/CardTitle.vue";
import VisVal from "@/components/VisVal.vue";
import DlgReg from "@/components/DlgReg.vue";

export default {
  components: {
    BtnBack,
    CardTitle,
    VisVal,
    DlgReg,
  },
  data() {
    return {
      route: "examples",
      id: this.$route.params.id ? this.$route.params.id : null,
      auth: this.$store.getters.getAuth,
      ldg: true,
      item: null,
      reg_dlg: false,
      //DIALOGS
      //OTHERS
    };
  },
  methods: {
    getItem() {
      this.ldg = true;

      Axios.get(
        URL_API + "/" + this.route + "/" + this.id,
        getHdrs(this.auth.token)
      )
        .then((rsp) => {
          rsp = getRsp(rsp);
          this.item = rsp.data.item;
          this.ldg = false;
        })
        .catch((err) => {
          this.$root.$alert("error", getErr(err));
        });
    },
    deleteItem() {
      this.$root
        .$confirm("¿Confirma eliminar el registro?")
        .then((confirmed) => {
          if (confirmed) {
            this.ldg = true;

            Axios.delete(
              URL_API + "/" + this.route + "/" + this.id,
              getHdrs(this.auth.token)
            )
              .then((rsp) => {
                rsp = getRsp(rsp);
                this.$root.$alert("warning", rsp.msg);
                this.$router.push({ name: this.route });
                this.ldg = false;
              })
              .catch((err) => {
                this.$root.$alert("error", getErr(err));
              });
          }
        });
    },
  },
  mounted() {
    this.getItem();
  },
};
</script>
