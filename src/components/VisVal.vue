<template>
  <div>
    <div v-if="lab_prop" class="text-caption font-weight-bold" v-text="lab" />
    <div v-if="!bool_prop" class="text-description">
      <span v-if="!color_prop">
        <v-icon v-if="icon_prop" small> mdi-{{ icon }} </v-icon>
        <v-btn v-if="link_prop" icon x-small :href="link" target="_blank">
          <v-icon x-small> mdi-open-in-new</v-icon>
        </v-btn>
        {{ value }}
      </span>
      <v-chip v-else x-small dark :color="color">
        <v-icon v-if="icon_prop" small> mdi-{{ icon }} </v-icon>
        <v-btn v-if="link_prop" icon x-small :href="link" target="_blank">
          <v-icon x-small> mdi-open-in-new</v-icon>
        </v-btn>
        {{ value }}
      </v-chip>
    </div>
    <div v-else>
      <v-icon small :color="value ? 'info' : ''">
        mdi-checkbox-blank-circle{{ value ? "" : "-outline" }}
      </v-icon>
    </div>
    <div v-if="sub_prop" class="text-caption">
      <small>
        {{ sub }}
      </small>
    </div>
  </div>
</template>

<script>
export default {
  props: ["val", "lab", "sub", "color", "bool", "num", "icon", "link"],
  data() {
    return {
      value: null,
      lab_prop: false,
      sub_prop: false,
      color_prop: false,
      bool_prop: false,
      icon_prop: false,
      link_prop: false,
    };
  },

  mounted() {
    this.value = this.val;

    if (typeof this.bool != "undefined") {
      this.bool_prop = true;
    } else {
      this.value =
        typeof this.num == "undefined" && (!this.val || this.val == "")
          ? "-"
          : this.val;
    }

    this.lab_prop = typeof this.lab != "undefined";
    this.sub_prop = typeof this.sub != "undefined";
    this.color_prop = typeof this.color != "undefined";
    this.icon_prop = typeof this.icon != "undefined";
    this.link_prop = typeof this.link != "undefined";
  },
};
</script>

<style>
.text-description {
  white-space: pre-line;
}
</style>
