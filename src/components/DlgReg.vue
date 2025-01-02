<template>
  <v-dialog v-model="show" persistent overlay-color="black" max-width="400">
    <v-card flat>
      <v-card-title class="card_title_border">
        <v-row dense>
          <v-col cols="6">
            <CardTitle text="REGISTRO" icon="mdi-database-clock" sub />
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
                    @click.prevent="show = false"
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
      <v-card-text v-if="item">
        <v-row dense>
          <v-col cols="12">
            <VisVal :val="item.id" lab="ID" />
          </v-col>
          <v-col cols="6">
            <VisVal
              :val="item.created_by.email"
              :sub="item.created_at"
              lab="Creación"
            />
          </v-col>
          <v-col cols="6">
            <VisVal
              :val="item.updated_by.email"
              :sub="item.updated_at"
              lab="Últ. edición"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CardTitle from "@/components/CardTitle.vue";
import VisVal from "@/components/VisVal.vue";

export default {
  components: {
    CardTitle,
    VisVal,
  },
  props: {
    value: Boolean,
    item: Object,
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      },
    },
  },
};
</script>
