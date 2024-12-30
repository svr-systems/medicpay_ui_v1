<template>
  <v-card flat>
    <v-card-title />
    <v-card-text>
      <v-row dense justify="center">
        <v-col cols="12" xs="10" md="3">
          <v-card elevation="24" :disabled="ldg" :loading="ldg">
            <v-card-title>
              <v-row dense>
                <v-col cols="12" class="text-right">
                  <BtnTheme small />
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-form v-on:submit.prevent ref="data_form" lazy-validation>
                <v-row class="mt-1 text-center">
                  <v-col cols="12">
                    <img height="55" :src="require('@/assets/logo.png')" />
                  </v-col>
                  <v-col cols="12">
                    <span class="overline">{{ app_name }}</span>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="data.email"
                      label="E-mail"
                      type="text"
                      dense
                      maxlength="50"
                      :rules="rules.email"
                      prepend-icon="mdi-account"
                    />
                  </v-col>
                  <v-col cols="12">
                    <InpPassword
                      :model.sync="data.password"
                      label="Contraseña"
                      :rules="rules.password"
                    />
                  </v-col>
                  <v-col cols="12">
                    <div class="text-right">
                      <v-btn block small color="warning" @click.prevent="login">
                        Iniciar sesión
                        <v-icon right small> mdi-login</v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" class="mt-1">
                    <small>{{ version }}</small>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  VERSION,
  APP_NAME,
  URL_API,
  getHdrs,
  getRsp,
  getErr,
  getRules,
} from "@/exports";
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
      version: VERSION,
      app_name: APP_NAME,
      rules: getRules(),
      data: {
        email: "",
        password: "",
      },
      ldg: false,
    };
  },
  methods: {
    login() {
      if (this.$refs.data_form.validate()) {
        this.ldg = true;

        Axios.post(URL_API + "/auth/login", this.data, getHdrs())
          .then((rsp) => {
            rsp = getRsp(rsp);

            if (rsp.ok) {
              this.$store.dispatch("loginAction", rsp.data);
              this.$router.push({ name: "home" });
            } else {
              this.$root.$alert("error", getErr(rsp));
            }

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
