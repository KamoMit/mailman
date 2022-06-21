<template>
  <v-container >
    <p class="ma-4 h4 font-weight-regular success--text">Response Area</p>
    <div class="ma-4">{{ DisplayData }}</div>
  </v-container>
</template>

<script>
export default {
  name: "Response",
  computed: {
    DisplayData() {
      return this.$store.state.DataToDisplay;
    },
  },
};
</script>