<template>
  <v-navigation-drawer v-model="drawerVal" fixed temporary app clipped>
    <v-list-item>
      <v-list-item-avatar>
        <VisAvatar :val="$store.getters.getAuth.user.avatar_b64" size="40" />
      </v-list-item-avatar>
      <v-list-item-title>
        <div class="user-name">
          {{ $store.getters.getAuth.user.full_name }}
        </div>
        <div class="user-email">
          {{ $store.getters.getAuth.user.email }}
        </div>
        <div class="user-role">
          {{ $store.getters.getAuth.user.role.name }}
        </div>
      </v-list-item-title>
    </v-list-item>

    <v-divider />

    <v-list dense nav>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="{ name: item.link }"
        v-if="item.show"
        link
      >
        <v-list-item-icon class="mr-0">
          <v-icon small>
            {{ item.icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click.prevent="logoutHandle">
        <v-list-item-icon class="mr-0">
          <v-icon small> mdi-logout-variant </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> Cerrar Sesión </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <small>
              {{ version }}
            </small>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { VERSION, URL_API, getHdrs, getErr } from "@/exports";
import Axios from "axios";
import VisAvatar from "@/components/VisAvatar.vue";

export default {
  props: ["drawer"],
  components: {
    VisAvatar,
  },
  data() {
    return {
      version: VERSION,
      auth: this.$store.getters.getAuth,
      items: [],
    };
  },
  computed: {
    drawerVal: {
      get() {
        return this.drawer;
      },
      set(v) {
        this.$emit("update:drawer", v);
      },
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutAction");
      this.$router.push({ name: "login" });
    },
    logoutHandle() {
      this.drawerVal = false;

      this.$root.$confirm("¿Cerrar sesión?").then((confirmed) => {
        if (confirmed) {
          Axios.get(
            URL_API + "/auth/logout",
            getHdrs(this.$store.getters.getAuth.token)
          )
            .then((rsp) => {
              this.logout();
            })
            .catch((err) => {
              this.$root.$alert("error", getErr(err));
              this.logout();
            });
        }
      });
    },
  },
  mounted() {
    this.items = [
      {
        link: "home",
        title: "Inicio",
        icon: "mdi-home",
        show: true,
      },
      {
        link: "users",
        title: "Usuarios",
        icon: "mdi-account-multiple",
        show: true,
      },
      {
        link: "users.profile",
        title: "Mi perfil",
        icon: "mdi-card-account-details",
        show: true,
      },
    ];
  },
};
</script>

<style scoped>
.user-name {
  font-size: 12px;
}
.user-email {
  font-size: 10px;
}
.user-role {
  padding-top: 5px;
  font-size: 8px;
}
</style>