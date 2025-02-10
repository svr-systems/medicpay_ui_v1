<template>
  <v-app>
    <Alert ref="alert" />
    <Confirm ref="confirm" />
    <SideBar v-if="$store.getters.getAuth" :drawer.sync="drawer" />
    <v-app-bar v-if="$store.getters.getAuth" app dense dark>
      <v-app-bar-nav-icon
        v-if="$store.getters.getAuth"
        @click.prevent="drawer = true"
      />
      <v-toolbar-title>
        <span class="overline">{{ app_name }}</span>
      </v-toolbar-title>
      <v-spacer />
      <BtnTheme />
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { APP_NAME } from "@/general";
import SideBar from "@/components/SideBar.vue";
import BtnTheme from "@/components/BtnTheme.vue";

export default {
  components: {
    SideBar,
    BtnTheme,
  },
  data() {
    return {
      app_name: APP_NAME,
      drawer: false,
    };
  },
  mounted() {
    this.$root.$alert = this.$refs.alert.show;
    this.$root.$confirm = this.$refs.confirm.show;
  },
};
</script>

<style>
.theme--dark.v-application {
  background: #1e1e1e !important;
}
.v-tooltip__content {
  font-size: 12px !important;
}
.v-icon.v-icon {
  vertical-align: baseline !important;
}
.v-alert__icon {
  font-size: 16px !important;
  margin-right: 2px !important;
}
.v-card__title {
  padding: 10px !important;
}
.card_title_margin {
  margin-bottom: 16px !important;
}
.card_title_border {
  margin-bottom: 16px !important;
  border-bottom: 0.5px solid rgba(126, 126, 126, 0.2);
}
.v-color-picker {
  max-width: 100% !important;
}
</style>
