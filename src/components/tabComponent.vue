<template>
  <div>
    <v-tabs class="ma-4" color="success">
      <v-tab
        v-for="(tab, index) in GetTabs"
        :key="tab.tabId"
        :class="{ active: tab === GetSelected }"
        @click="setTab(tab.title)"
        class="body-1 text-uppercase font-weight-medium"
      >
        {{ tab.title }}
        <v-btn
          icon
          small
          color="success"
          v-if="GetTabs.length !== 1"
          @click="removeTab(index)"
        >
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </v-tab>
    </v-tabs>
    <keep-alive>
      <tab :key="GetSelected"></tab>
    </keep-alive>
    <slot></slot>
  </div>
</template>

<script>
import tab from "./tab.vue";
import { mapState} from 'vuex';
export default {
  components: {
    tab,
  },
  computed: {
    ...mapState({
      GetTabs: "tabs",
      GetSelected: "selectedTab"
    })

  },
  methods: {
    setTab(tab) {
      this.$store.commit("setSelectedTab",  tab);
    },
    removeTab(id) {
      this.$store.commit("removeTab", id);
    },
  },
  mounted() {
    if (localStorage.tabs) {
      this.$store.state.tabs = JSON.parse(localStorage.tabs);
    }
  },
  watch: {
    GetTabs: {
      handler(newTabs) {
        localStorage.tabs = JSON.stringify(newTabs);
      },
      deep: true,
    },
  },
};
</script>