<template>
  <v-container>
    <v-layout row>
      <v-flex sm2 md2>
        <v-select
          block
          class="ml-4 ma-8"
          solo
          v-model="selectedRequest"
          label="Request Type"
          :items="RequestOptions"
        ></v-select>
      </v-flex>
      <v-flex sm8 md8
        ><v-text-field
          color="success"
          class="mt-4"
          label="Insert a URL"
          v-model="input"
        ></v-text-field
      ></v-flex>
      <v-flex sm2 md2
        ><v-btn
          class="ma-8 rounded"
          tile
          outlined
          color="success"
          @click="inputSubmit()"
          >Send</v-btn
        ></v-flex
      >
    </v-layout>

    <div
      v-if="
        selectedRequest !== 'GET' &&
        selectedRequest !== 'DELETE' &&
        selectedRequest !== 'HEAD'
      "
    >
      <p class="ml-4">JSON</p>
      <v-textarea
        class="ma-4"
        solo
        name="input-7-4"
        cols="40"
        rows="5"
        v-model="JSONBody"
      ></v-textarea>
    </div>

    <slot></slot>
  </v-container>
</template>

<script>
export default {
  computed: {
    RequestOptions() {
      return this.$store.state.options;
    },
    JSONBody: {
      get() {
        return JSON.stringify(this.$store.state.JSONBody);
      },
      set(value) {
        if (this.IsJSONValid(value)) {
          console.log(value);
          this.$store.commit("changeDataToDisplay", "No Data provided");
          this.$store.commit("changeJSONBody", value);
        } else {
          this.$store.commit("changeDataToDisplay", "error: Invalid JSON");
        }
      },
    },
  },
  data() {
    return {
      input: "",
      selectedRequest: "GET",
    };
  },
  methods: {
    inputSubmit: function () {
      if(this.input != undefined || this.$store.state.DataToDisplay !== "error: Invalid JSON"){
        this.$store.dispatch("Request",{
            requestType: this.selectedRequest,
            input: this.input,
        })
      }
    },
    IsJSONValid(newJSON) {
      try {
        JSON.parse(newJSON);
      } catch (e) {
        return false;
      }
      return true;
    },
  },
};
</script>