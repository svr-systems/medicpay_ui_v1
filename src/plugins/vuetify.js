import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import es from "vuetify/lib/locale/es";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: {
      es,
    },
    current: "es",
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#EEEEEE",
        secondary: "#818181",
      },
      light: {
        primary: "#212121",
        secondary: "#818181",
      },
    },
  },
});
