<template>
  <v-card flat :loading="ldg">
    <v-card-title>
      <v-row dense>
        <v-col cols="8">
          <BtnBack
            v-if="!profile_mode"
            :route="{
              name: route,
            }"
          />
          <CardTitle :text="$route.meta.title" :icon="$route.meta.icon" />
        </v-col>
        <v-col cols="4" class="text-right">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                fab
                x-small
                color="pink"
                dark
                class="mr-1"
                @click.prevent="passwordDlg"
              >
                <v-icon small> mdi-lock-reset </v-icon>
              </v-btn>
            </template>
            Modificar Contraseña
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                fab
                x-small
                color="warning"
                :to="
                  !profile_mode
                    ? {
                        name: route + '.update',
                        params: { id: id },
                      }
                    : {
                        name: route + '.profile_update',
                      }
                "
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
                  <VisVal :val="item.surname_p" lab="A. paterno" />
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <VisVal :val="item.surname_m" lab="A. materno" />
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <VisDoc :val="item.avatar_b64" lab="Fotografía" img />
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
                  <VisVal :val="item.email" lab="E-mail" />
                </v-col>
                <v-col cols="12" sm="12" md="3">
                  <VisVal :val="item.role.name" lab="Rol" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-tooltip v-if="!profile_mode" right>
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
    <v-dialog
      v-model="password_dlg"
      persistent
      overlay-color="black"
      max-width="350"
    >
      <v-card flat :disabled="password_dlg_ldg" :loading="password_dlg_ldg">
        <v-card-title class="card_title_border">
          <v-row dense>
            <v-col cols="6">
              <CardTitle text="MODIFICAR" sub />
            </v-col>
            <v-col cols="6">
              <div class="text-right">
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      icon
                      small
                      color="primary"
                      @click.prevent="passwordDlgClose"
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
        <v-card-text v-if="password">
          <v-form v-on:submit.prevent ref="password_form" lazy-validation>
            <v-row dense>
              <v-col cols="12">
                <InpPassword
                  :model.sync="password.password"
                  label="Contraseña"
                  :rules="rules.password"
                  counter
                />
              </v-col>
              <v-col cols="12">
                <div class="text-right">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        fab
                        x-small
                        color="pink"
                        dark
                        @click.prevent="passwordHandle"
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
    </v-dialog>
  </v-card>
</template>

<script>
import { URL_API, getHdrs, getRsp, getErr, getRules } from "@/exports";
import Axios from "axios";
import BtnBack from "@/components/BtnBack.vue";
import CardTitle from "@/components/CardTitle.vue";
import VisVal from "@/components/VisVal.vue";
import VisDoc from "@/components/VisDoc.vue";
import DlgReg from "@/components/DlgReg.vue";
import InpPassword from "@/components/InpPassword.vue";

export default {
  components: {
    BtnBack,
    CardTitle,
    VisVal,
    VisDoc,
    DlgReg,
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
      item: null,
      reg_dlg: false,
      rules: getRules(),
      //DIALOGS
      password: null,
      password_dlg: false,
      password_dlg_ldg: false,
      //OTHERS
      profile_mode: true,
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
    passwordDlg() {
      this.password = {
        id: this.item.id,
        password: null,
      };
      this.password_dlg_ldg = false;
      this.password_dlg = true;
    },
    passwordDlgClose() {
      this.password_dlg = false;
      this.$refs.password_form.reset();
    },
    passwordHandle() {
      if (this.$refs.password_form.validate()) {
        this.$root
          .$confirm("¿Confirma modificar la contraseña?")
          .then((confirmed) => {
            if (confirmed) {
              this.password_dlg_ldg = true;

              Axios.post(
                URL_API + "/" + this.route + "/password",
                this.password,
                getHdrs(this.auth.token)
              )
                .then((rsp) => {
                  rsp = getRsp(rsp);
                  this.$root.$alert("success", rsp.msg);
                  this.passwordDlgClose();
                  this.getItem();
                  this.password_dlg_ldg = false;
                })
                .catch((err) => {
                  this.$root.$alert("error", getErr(err));
                });
            }
          });
      } else {
        this.$root.$alert("error", "Revisa los detalles señalados");
      }
    },
  },
  mounted() {
    this.profile_mode = this.$route.name == this.route + ".profile";
    if (this.profile_mode) {
      this.id = this.auth.user.id;
    }

    this.getItem();
  },
};
</script>
