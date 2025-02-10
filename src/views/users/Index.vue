<template>
  <v-card elevation="24" :disabled="ldg">
    <v-card-title>
      <v-row dense>
        <v-col cols="8">
          <CardTitle :text="$route.meta.title" :icon="$route.meta.icon" />
        </v-col>
        <v-col cols="4" class="text-right">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                fab
                x-small
                color="success"
                :to="{
                  name: route + '.store',
                }"
              >
                <v-icon small> mdi-plus </v-icon>
              </v-btn>
            </template>
            Agregar
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12" md="9" class="pb-0">
          <v-row dense>
            <v-col
              v-if="auth.user.role_id == 1 || auth.user.role_id == 2"
              cols="12"
              md="3"
              class="pb-0"
            >
              <v-select
                v-model="active"
                label="Mostrar"
                dense
                :items="active_opts"
                :item-text="(v) => v.name"
                item-value="id"
                :disabled="items.length > 0"
              />
            </v-col>
            <v-col cols="12" md="3" class="pb-0">
              <v-select
                v-model="filter"
                label="Filtro"
                dense
                :items="filter_opts"
                :item-text="(v) => v.name"
                item-value="id"
                :disabled="items.length > 0"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3" class="pb-0">
          <v-text-field
            v-model="items_srch"
            label="Buscar en resultados..."
            dense
            type="text"
            single-line
            hide-details
          >
            <template v-slot:append>
              <v-icon small> mdi-magnify </v-icon>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn
            v-if="items.length == 0"
            block
            color="info"
            x-small
            :loading="ldg"
            @click.prevent="getItems"
          >
            Aplicar parámetros
            <v-icon x-small right> mdi-database-search-outline </v-icon>
          </v-btn>
          <v-btn v-else block x-small @click.prevent="items = []">
            Cambiar parámetros
            <v-icon x-small right> mdi-database-refresh-outline </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12">
          <v-data-table
            :items="items"
            :search="items_srch"
            :headers="items_hdrs"
            :loading="ldg"
            :items-per-page="15"
            dense
          >
            <template v-slot:item.key="{ item }">
              <b v-text="item.key + 1" />
            </template>
            <template v-slot:item.action="{ item }">
              <div class="text-right">
                <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      icon
                      small
                      :color="item.active ? '' : 'error'"
                      :to="{
                        name: route + '.show',
                        params: { id: $window.btoa(item.id) },
                      }"
                    >
                      <v-icon small> mdi-eye </v-icon>
                    </v-btn>
                  </template>
                  Detalle
                </v-tooltip>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { URL_API, getHdrs, getRsp, getErr } from "@/general";
import Axios from "axios";
import CardTitle from "@/components/CardTitle.vue";

export default {
  components: {
    CardTitle,
  },
  data() {
    return {
      route: "users",
      auth: this.$store.getters.getAuth,
      ldg: false,
      items: [],
      items_srch: "",
      items_hdrs: [],
      active: 1,
      active_opts: [],
      filter: 0,
      filter_opts: [],
      //CATALOGS
      //OTHERS
    };
  },
  methods: {
    getItems() {
      this.ldg = true;
      this.items = [];

      Axios.get(
        URL_API +
          "/system/" +
          this.route +
          "?active=" +
          this.active +
          "&filter=" +
          this.filter,
        getHdrs(this.auth.token)
      )
        .then((rsp) => {
          rsp = getRsp(rsp);
          this.items = rsp.data.items;

          if (!this.items.length) {
            this.$root.$alert(
              "warning",
              "Sin resultados al aplicar parámetros"
            );
          }

          this.ldg = false;
        })
        .catch((err) => {
          this.$root.$alert("error", getErr(err));
          this.ldg = false;
        });
    },
  },
  mounted() {
    this.active_opts = [
      {
        id: 1,
        name: "ACTIVOS",
      },
      {
        id: 0,
        name: "INACTIVOS",
      },
    ];

    this.filter_opts = [
      {
        id: 0,
        name: "TODOS",
      },
    ];

    this.items_hdrs = [
      {
        text: "#",
        value: "key",
        filterable: false,
        sortable: false,
        width: "60",
      },
      {
        text: "ID",
        value: "uiid",
      },
      {
        text: "Nombre",
        value: "full_name",
      },
      {
        text: "E-mail",
        value: "email",
      },
      {
        text: "Rol",
        value: "role.name",
      },
      {
        value: "action",
        text: "",
        filterable: false,
        sortable: false,
        width: "60",
      },
    ];
  },
};
</script>
