<template>
  <span :class="v_sub ? 'caption' : 'subtitle-1'">
    <v-icon v-if="v_icon" :small="!v_sub" :x-small="v_sub" class="ml-1">
      {{ icon }}
    </v-icon>
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ["text", "icon", "sub"],
  data() {
    return {
      v_icon: false,
      v_sub: false,
    };
  },
  mounted() {
    this.v_icon = typeof this.icon != "undefined";
    this.v_sub = typeof this.sub != "undefined";
  },
};
</script>
