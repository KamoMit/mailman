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
  props: {
    tabID: {
      type: Number,
    },
  },
  methods: {
    inputSubmit: function () {
      if (this.selectedRequest === "GET") {
        this.$store.dispatch("getRequest", {
          requestType: this.selectedRequest,
          input: this.input,
        });
      } else if (this.selectedRequest === "POST") {
        this.$store.dispatch("postRequest", {
          requestType: this.selectedRequest,
          input: this.input,
        });
      } else if (this.selectedRequest === "DELETE") {
        this.$store.dispatch("deleteRequest", {
          input: this.input,
          requestType: this.selectedRequest,
        });
      } else if (this.selectedRequest === "PUT") {
        this.$store.dispatch("putRequest", {
          input: this.input,
          requestType: this.selectedRequest,
        });
      } else if (this.selectedRequest === "PATCH") {
        this.$store.dispatch("patchRequest", {
          input: this.input,
          requestType: this.selectedRequest,
        });
      } else if (this.selectedRequest === "OPTIONS") {
        this.$store.dispatch("optionsRequest", {
          input: this.input,
          requestType: this.selectedRequest,
        });
      } else if (this.selectedRequest === "HEAD") {
        this.$store.dispatch("headRequest", {
          input: this.input,
          requestType: this.selectedRequest,
        });
      } else if (this.selectedRequest === "OPTIONS") {
        this.$store.dispatch("optionsRequest", {
          input: this.input,
          requestType: this.selectedRequest,
        });
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