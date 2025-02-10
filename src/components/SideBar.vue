<template>
  <v-navigation-drawer v-model="drawerVal" fixed temporary app clipped>
    <v-list-item>
      <v-list-item-avatar>
        <VisAvatar :val="$store.getters.getAuth.user.avatar_b64" size="40" />
      </v-list-item-avatar>
      <v-list-item-title>
        <div class="user-name pt-1">
          {{ $store.getters.getAuth.user.full_name }}
        </div>
        <div class="user-email">
          {{ $store.getters.getAuth.user.email }}
        </div>
        <div class="user-role">
          {{ $store.getters.getAuth.user.role.name }} |
          {{ $store.getters.getAuth.user.uiid }}
        </div>
        <div class="py-1">
          <v-btn text x-small width="76" @click.prevent="logoutHandle">
            Cerrar Sesión
          </v-btn>
        </div>
      </v-list-item-title>
    </v-list-item>
    <v-divider />
    <div v-for="(item, i) in side_bar_items" :key="i">
      <div v-if="item.links">
        <v-list dense nav>
          <v-list-item
            v-for="(link, i) in item.links"
            :key="i"
            :to="{ name: link.link }"
            v-if="link.show"
            link
          >
            <v-list-item-icon class="mr-0">
              <v-icon small>
                {{ link.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ link.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
      <div v-if="item.divider">
        <v-divider />
      </div>
    </div>
    <v-list dense nav>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <small>
              {{ app_version }}
            </small>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { APP_VERSION, URL_API, getHdrs, getErr } from "@/general";
import { getSideBarItems } from "@/router/sideBarItems";
import Axios from "axios";
import VisAvatar from "@/components/VisAvatar.vue";

export default {
  props: ["drawer"],
  components: {
    VisAvatar,
  },
  data() {
    return {
      app_version: APP_VERSION,
      auth: this.$store.getters.getAuth,
      side_bar_items: getSideBarItems(),
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
};
</script>

<style scoped>
.user-name {
  font-size: 10px;
}
.user-email {
  font-size: 9px;
}
.user-role {
  padding-top: 5px;
  font-size: 7px !important;
}
.v-size--x-small {
  font-size: 9px !important;
}
</style>
