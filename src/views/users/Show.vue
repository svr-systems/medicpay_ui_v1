<template>
  <v-card flat :loading="ldg">
    <v-card-title>
      <v-row dense>
        <v-col cols="8">
          <BtnBack :route="{ name: route }" />
          <CardTitle :text="$route.meta.title" :icon="$route.meta.icon" />
        </v-col>
        <v-col v-if="item" cols="4" class="text-right">
          <v-tooltip v-if="item.active" bottom>
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
            Modificar contraseña
          </v-tooltip>
          <v-tooltip v-if="item.active" bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                fab
                x-small
                color="warning"
                :to="{
                  name: route + '.update',
                  params: { id: $window.btoa(id) },
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
        <v-col v-if="!item.active" cols="12">
          <v-alert dense outlined text shaped type="error">
            <v-row dense>
              <v-col class="grow"> El registro se encuentra inactivo </v-col>
              <v-col
                v-if="auth.user.role_id == 1 || auth.user.role_id == 2"
                class="shrink"
              >
                <v-btn x-small color="success" @click="restoreItem">
                  Activar
                  <v-icon x-small right> mdi-delete-restore </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title class="card_title_border">
              <v-row dense>
                <v-col cols="8">
                  <CardTitle :text="'GENERAL | ' + item.uiid" sub />
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
                <v-col cols="12" md="3">
                  <VisVal :val="item.name" lab="Nombre" />
                </v-col>
                <v-col cols="12" md="3">
                  <VisVal :val="item.surname_p" lab="A. paterno" />
                </v-col>
                <v-col cols="12" md="3">
                  <VisVal :val="item.surname_m" lab="A. materno" />
                </v-col>
                <v-col cols="12" md="3">
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
                <v-col cols="12" md="3">
                  <VisVal :val="item.email" lab="E-mail" />
                </v-col>
                <v-col cols="12" md="3">
                  <VisVal :val="item.role.name" lab="Rol" />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          v-if="
            item.active && (auth.user.role_id == 1 || auth.user.role_id == 2)
          "
          cols="12"
        >
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
            Inactivar
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-text>
    <!-- DIALOGS -->
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
        <v-card-text v-if="password_data">
          <v-form v-on:submit.prevent ref="password_data_form" lazy-validation>
            <v-row dense>
              <v-col cols="12">
                <InpPassword
                  :model.sync="password_data.password"
                  label="Contraseña"
                  :rules="rules.password_rqd"
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
import { URL_API, getHdrs, getRsp, getErr, getRules } from "@/general";
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
      id: this.$route.params.id
        ? this.$window.atob(this.$route.params.id)
        : null,
      auth: this.$store.getters.getAuth,
      ldg: true,
      item: null,
      reg_dlg: false,
      rules: getRules(),
      //DIALOGS
      password_data: null,
      password_dlg: false,
      password_dlg_ldg: false,
      //OTHERS
    };
  },
  methods: {
    getItem() {
      this.ldg = true;

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
    },
    deleteItem() {
      this.$root
        .$confirm("¿Confirma eliminar el registro?")
        .then((confirmed) => {
          if (confirmed) {
            this.ldg = true;

            Axios.delete(
              URL_API + "/system/" + this.route + "/" + this.id,
              getHdrs(this.auth.token)
            )
              .then((rsp) => {
                rsp = getRsp(rsp);
                this.$root.$alert("error", rsp.msg);
                this.$router.push({ name: this.route });
                this.ldg = false;
              })
              .catch((err) => {
                this.$root.$alert("error", getErr(err));
              });
          }
        });
    },
    restoreItem() {
      this.$root
        .$confirm("¿Confirma activar el registro?")
        .then((confirmed) => {
          if (confirmed) {
            this.ldg = true;

            Axios.post(
              URL_API + "/system/" + this.route + "/restore",
              { id: this.id },
              getHdrs(this.auth.token)
            )
              .then((rsp) => {
                rsp = getRsp(rsp);
                this.$root.$alert("success", rsp.msg);
                this.item = rsp.data.item;
                this.ldg = false;
              })
              .catch((err) => {
                this.$root.$alert("error", getErr(err));
              });
          }
        });
    },
    passwordDlg() {
      this.password_data = {
        id: this.item.id,
        password: null,
      };
      this.password_dlg_ldg = false;
      this.password_dlg = true;
    },
    passwordDlgClose() {
      this.password_dlg = false;
      this.$refs.password_data_form.reset();
    },
    passwordHandle() {
      if (this.$refs.password_data_form.validate()) {
        this.$root
          .$confirm("¿Confirma modificar la contraseña?")
          .then((confirmed) => {
            if (confirmed) {
              this.password_dlg_ldg = true;

              Axios.post(
                URL_API + "/system/" + this.route + "/password",
                this.password_data,
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
    console.log(this.id);
    this.getItem();
  },
};
</script>
