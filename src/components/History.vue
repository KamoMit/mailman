<template>
  <v-container>
    <v-list rounded class="mx-auto">
      <p class="h4 ma-4 font-weight-regular success--text">History</p>
      <v-card rounded-xl v-if="RequestHistory.length" elevation="2" class="mb-4">
        <v-list-item-group>
          <v-list class="mx-4" v-for="(HistoryItem, i) in RequestHistory" :key="HistoryItem.id">
            <v-list-item-content>
              <v-list-item-title>{{ i + 1 }}.{{ HistoryItem.request }}
              </v-list-item-title>
              <v-list-item-content>
                <p>URL: {{ HistoryItem.URL }}</p>
                <br /><br />
                <div @click="HistoryItem.open = !HistoryItem.open" class="mt-4 pointer">
                  <p v-if="HistoryItem.open">{{ HistoryItem.data }}</p>
                  <p v-else>click to see data</p>
                </div>

                <v-btn depressed class="mt-4" color="error" @click="removeHistory(i)">DELETE</v-btn>
              </v-list-item-content>
            </v-list-item-content>
          </v-list>
        </v-list-item-group>
      </v-card>
      <p v-else class="mx-4">No available search History</p>

    </v-list>
  </v-container>
</template>

<script>
export default {
  name: "History",
  computed: {
    RequestHistory() {
      return this.$store.state.History;
    },
  },
  methods: {
    removeHistory(id) {
      this.$store.commit("removeFromHistory", id);
    },
  },
  mounted() {
    if (localStorage.History) {
      this.$store.state.History = JSON.parse(localStorage.History);
    }
  },
};
</script>