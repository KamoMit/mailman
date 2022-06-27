<template>
  <v-app id="app">
    <tabComponent :tabs="GetTabs" @selected="setSelected">
      <v-btn
        class="ml-4 rounded"
        tile
        outlined
        color="success"
        @click="addTab"
      >
        Add Tab
      </v-btn>
    </tabComponent>
    <Response></Response>
    <History></History>
  </v-app>
</template>

<script>
import tabComponent from "./components/tabComponent.vue";
import Response from "./components/Response";
import History from "./components/History.vue";
export default {
  name: "App",

  components: {
    tabComponent,
    Response,
    History,
  },
  computed: {
    GetTabs() {
      return this.$store.state.tabs;
    },
    getSelectedTab() {
      return this.$store.state.selectedTab;
    },
  },
  methods: {
    setSelected(tab) {
      this.$store.commit("setSelectedTab", tab.title);
    },
    addTab() {
      let tabNumber = this.GetTabs[this.GetTabs.length -1].tabNumber + 1;
      this.$store.commit("addTab", {
        id: Math.random(),
        tabNumber,
        title: "tab " + tabNumber,
      });
    },
  },
};
</script>
