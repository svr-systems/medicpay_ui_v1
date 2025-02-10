<template>
  <v-card elevation="24" :disabled="ldg" :loading="ldg">
    <v-card-title>
      <v-row dense>
        <v-col cols="8">
          <BtnBack
            :route="{
              name: route + (store_mode ? '' : '.show'),
              params: { id: $window.btoa(id) },
            }"
          />
          <CardTitle :text="$route.meta.title" :icon="$route.meta.icon" />
        </v-col>
        <v-col cols="4" class="text-right" />
      </v-row>
    </v-card-title>
    <v-card-text v-if="item">
      <v-form v-on:submit.prevent ref="item_form" lazy-validation>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="card_title_border">
                <v-row dense>
                  <v-col cols="8">
                    <CardTitle
                      :text="'GENERAL' + (store_mode ? '' : ' | ' + item.uiid)"
                      sub
                    />
                  </v-col>
                  <v-col cols="4" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.name"
                      label="Nombre"
                      dense
                      outlined
                      type="text"
                      :rules="rules.txt_rqd"
                      maxlength="50"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.surname_p"
                      label="A. paterno"
                      dense
                      outlined
                      type="text"
                      :rules="rules.txt_rqd"
                      maxlength="25"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.surname_m"
                      label="A. materno*"
                      dense
                      outlined
                      type="text"
                      :rules="rules.txt"
                      maxlength="25"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-file-input
                      v-model="item.avatar_doc"
                      label="Fotografía*"
                      dense
                      outlined
                      :rules="rules.img"
                      show-size
                      prepend-icon=""
                      accept=".jpg,.jpeg,.png"
                      :disabled="item.avatar_dlt"
                    >
                      <template v-slot:append>
                        <div
                          v-if="!store_mode && item.avatar && !item.avatar_doc"
                        >
                          <BtnDwd :val="item.avatar_b64" />
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                v-on="on"
                                icon
                                small
                                :color="item.avatar_dlt ? 'error' : ''"
                                @click.prevent="
                                  item.avatar_dlt = !item.avatar_dlt
                                "
                              >
                                <v-icon small>
                                  mdi-delete{{ item.avatar_dlt ? "-off" : "" }}
                                </v-icon>
                              </v-btn>
                            </template>
                            {{ item.avatar_dlt ? "NO " : "" }} Eliminar
                          </v-tooltip>
                        </div>
                      </template>
                    </v-file-input>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title class="card_title_border">
                <v-row dense>
                  <v-col cols="8">
                    <CardTitle text="CUENTA" sub />
                  </v-col>
                  <v-col cols="4" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="item.email"
                      label="E-mail"
                      dense
                      outlined
                      type="text"
                      :rules="rules.email_rqd"
                      maxlength="65"
                      counter
                      prepend-icon="mdi-at"
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-select
                      v-model="item.role_id"
                      label="Rol"
                      dense
                      outlined
                      :rules="rules.rqd"
                      :items="roles"
                      :item-text="(v) => v.name"
                      item-value="id"
                      :loading="roles_ldg"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <div class="text-right">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-on="on"
                    fab
                    x-small
                    :color="store_mode ? 'success' : 'warning'"
                    @click.prevent="storeUpdate"
                  >
                    <v-icon small> mdi-check</v-icon>
                  </v-btn>
                </template>
                Confirmar
              </v-tooltip>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  URL_API,
  getHdrs,
  getRsp,
  getErr,
  getRules,
  getObj,
  getFormData,
} from "@/general";
import { getUserObj } from "@/objects";
import Axios from "axios";
import BtnBack from "@/components/BtnBack.vue";
import CardTitle from "@/components/CardTitle.vue";
import BtnDwd from "@/components/BtnDwd.vue";

export default {
  components: {
    BtnBack,
    CardTitle,
    BtnDwd,
  },

  data() {
    return {
      route: "users",
      id: this.$route.params.id
        ? this.$window.atob(this.$route.params.id)
        : null,
      auth: this.$store.getters.getAuth,
      ldg: true,
      store_mode: true,
      item: null,
      rules: getRules(),
      //CATALOGS
      roles: [],
      roles_ldg: true,
      //OTHERS
    };
  },
  methods: {
    getCatalogs() {
      Axios.get(URL_API + "/system/roles", getHdrs(this.auth.token))
        .then((rsp) => {
          rsp = getRsp(rsp);
          this.roles = rsp.data.items;
          this.roles_ldg = false;
        })
        .catch((err) => {
          this.$root.$alert("error", getErr(err));
          this.roles_ldg = false;
        });
    },
    getItem() {
      this.store_mode = this.id == null;

      if (this.store_mode) {
        this.item = getUserObj();

        this.ldg = false;
      } else {
        Axios.get(
          URL_API + "/system/" + this.route + "/" + this.id,
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
      }
    },
    storeUpdate() {
      if (this.$refs.item_form.validate()) {
        this.$root
          .$confirm(
            "¿Confirma " +
              (this.store_mode ? "agregar" : "editar") +
              " registro?"
          )
          .then((confirm) => {
            if (confirm) {
              this.ldg = true;
              let obj = getObj(this.item, this.store_mode);

              Axios.post(
                URL_API +
                  "/system/" +
                  this.route +
                  (this.store_mode ? "" : "/" + obj.id),
                getFormData(obj),
                getHdrs(this.auth.token, true)
              )
                .then((rsp) => {
                  rsp = getRsp(rsp);
                  this.$root.$alert("success", rsp.msg);

                  this.$router.push({
                    name: this.route + ".show",
                    params: {
                      id: this.$window.btoa(
                        this.store_mode ? rsp.data.item.id : this.id
                      ),
                    },
                  });

                  this.ldg = false;
                })
                .catch((err) => {
                  this.$root.$alert("error", getErr(err));
                  this.ldg = false;
                });
            }
          });
      } else {
        this.$root.$alert("error", "Revisa los detalles señalados");
      }
    },
  },
  mounted() {
    this.getCatalogs();
    this.getItem();
  },
};
</script>
