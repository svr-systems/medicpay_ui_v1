<template>
  <v-card flat :disabled="ldg" :loading="ldg">
    <v-card-title>
      <v-row dense>
        <v-col cols="8">
          <BtnBack
            :route="{
              name:
                route +
                (!profile_mode ? (store_mode ? '' : '.show') : '.profile'),
              params: { id: id },
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
                    <CardTitle text="GENERAL" sub />
                  </v-col>
                  <v-col cols="4" class="text-right" />
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" sm="12" md="3">
                    <v-text-field
                      v-model="item.name"
                      label="Nombre"
                      dense
                      outlined
                      type="text"
                      :rules="rules.required"
                      maxlength="50"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="3">
                    <v-text-field
                      v-model="item.surname_p"
                      label="A. paterno"
                      dense
                      outlined
                      type="text"
                      :rules="rules.required"
                      maxlength="25"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="3">
                    <v-text-field
                      v-model="item.surname_m"
                      label="A. materno*"
                      dense
                      outlined
                      type="text"
                      maxlength="25"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="3">
                    <v-file-input
                      v-model="item.avatar_doc"
                      label="Fotografía (IMG)*"
                      dense
                      outlined
                      :rules="rules.imgLmtNR"
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
                  <v-col cols="12" sm="12" md="3">
                    <v-text-field
                      v-model="item.email"
                      label="E-mail"
                      dense
                      outlined
                      type="text"
                      :rules="rules.email"
                      maxlength="65"
                      counter
                      prepend-icon="mdi-account"
                    />
                  </v-col>
                  <v-col v-if="store_mode" cols="12" sm="12" md="3">
                    <InpPassword
                      :model.sync="item.password"
                      label="Contraseña"
                      :rules="rules.password"
                      counter
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="3">
                    <v-select
                      v-model="item.role_id"
                      label="Rol"
                      dense
                      outlined
                      :rules="rules.required"
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
} from "@/exports";
import Axios from "axios";
import BtnBack from "@/components/BtnBack.vue";
import CardTitle from "@/components/CardTitle.vue";
import BtnDwd from "@/components/BtnDwd.vue";
import InpPassword from "@/components/InpPassword.vue";

export default {
  components: {
    BtnBack,
    CardTitle,
    BtnDwd,
    InpPassword,
  },

  data() {
    return {
      route: "users",
      id:
        this.$route.params && this.$route.params.id
          ? this.$route.params.id
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
      profile_mode: true,
    };
  },
  methods: {
    getCatalogs() {
      Axios.get(URL_API + "/roles", getHdrs(this.auth.token))
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
        this.item = {
          id: null,
          name: null,
          surname_p: null,
          surname_m: null,
          avatar: null,
          avatar_doc: null,
          avatar_dlt: false,
          email: null,
          password: null,
          role_id: null,
        };

        this.ldg = false;
      } else {
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
      }
    },
    storeUpdate() {
      if (this.$refs.item_form.validate()) {
        this.$root
          .$confirm(
            "¿Confirma " +
              (this.store_mode ? " agregar" : " editar") +
              " registro?"
          )
          .then((confirmed) => {
            if (confirmed) {
              this.ldg = true;
              let obj = getObj(this.item, this.store_mode);

              Axios.post(
                URL_API +
                  "/" +
                  this.route +
                  (this.store_mode ? "" : "/" + obj.id),
                getFormData(obj),
                getHdrs(this.auth.token, true)
              )
                .then((rsp) => {
                  rsp = getRsp(rsp);
                  this.$root.$alert("success", rsp.msg);

                  if (this.profile_mode) {
                    this.$store.dispatch("profileAction", rsp.data.item);
                  }

                  this.$router.push({
                    name:
                      this.route + (!this.profile_mode ? ".show" : ".profile"),
                    params: {
                      id: this.store_mode ? rsp.data.item.id : this.id,
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
    this.profile_mode = this.$route.name == this.route + ".profile_update";
    if (this.profile_mode) {
      this.id = this.auth.user.id;
    }

    this.getCatalogs();
    this.getItem();
  },
};
</script>
