<template>
  <v-row dense justify="center">
    <v-col cols="12" md="4">
      <v-card elevation="24" :disabled="ldg" :loading="ldg">
        <v-card-title>
          <v-row dense>
            <v-col cols="12" class="text-right">
              <BtnTheme />
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-form v-on:submit.prevent ref="item_form" lazy-validation>
            <v-row class="mt-1 text-center">
              <v-col cols="12">
                <img height="55" :src="require('@/assets/logo.png')" />
              </v-col>
              <v-col cols="12">
                <span class="overline">{{ app_name }}</span>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="item.email"
                  label="E-mail"
                  dense
                  outlined
                  type="text"
                  :rules="rules.email"
                  maxlength="50"
                  prepend-icon="mdi-at"
                />
              </v-col>
              <v-col cols="12">
                <InpPassword
                  :model.sync="item.password"
                  label="Contraseña"
                  :rules="rules.required"
                />
              </v-col>
              <v-col cols="12">
                <div class="text-right">
                  <v-btn
                    block
                    small
                    color="warning"
                    @click.prevent="loginHandle"
                  >
                    Iniciar sesión
                    <v-icon right small> mdi-login</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" class="mt-1">
                <small>{{ app_version }}</small>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {
  APP_VERSION,
  APP_NAME,
  URL_API,
  getHdrs,
  getRsp,
  getErr,
  getRules,
} from "@/general";
import Axios from "axios";
import BtnTheme from "@/components/BtnTheme.vue";
import InpPassword from "@/components/InpPassword.vue";

export default {
  components: {
    BtnTheme,
    InpPassword,
  },
  data() {
    return {
      app_version: APP_VERSION,
      app_name: APP_NAME,
      rules: getRules(),
      item: {
        email: "",
        password: "",
      },
      ldg: false,
    };
  },
  methods: {
    loginHandle() {
      if (this.$refs.item_form.validate()) {
        this.ldg = true;

        Axios.post(URL_API + "/auth/login", this.item, getHdrs())
          .then((rsp) => {
            rsp = getRsp(rsp);
            this.$store.dispatch("loginAction", rsp.data.auth);
            this.$router.push({ name: "home" });
            this.ldg = false;
          })
          .catch((err) => {
            this.$root.$alert("error", getErr(err));
            this.ldg = false;
          });
      }
    },
  },
};
</script>
