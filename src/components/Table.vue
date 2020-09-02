<template>
  <div>
    <div v-if="visitors.length">
      <b-button class="is-info" @click="downloadCSV" expanded>
        Download CSV
      </b-button>

      <div class="boxu">
        <b-button class="is-danger" @click="clearData" expanded>
          Clear Data
        </b-button>
      </div>

      <div class="boxu">
        <b-table :data="visitors" :columns="columns"></b-table>
      </div>
    </div>
    <div v-else>
      <b-notification
        type="is-warning"
        v-model="showNotification"
        aria-close-label="Close notification"
      >
        There's no data yet. Gotta scan 'em all!
      </b-notification>
    </div>
  </div>
</template>

<script>
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { EventBus } from "../event-bus.js";

export default {
  name: "Table",
  props: {
    visitors: Array,
  },
  data() {
    return {
      showNotification: this.$props.visitors.length == 0,
      columns: [
        {
          field: "lname",
          label: "Last Name",
        },
        {
          field: "fname",
          label: "First Name",
        },
        {
          field: "mname",
          label: "Mid Name",
        },
        {
          field: "nation",
          label: "Nationality",
        },
        {
          field: "age",
          label: "Phone",
        },
        {
          field: "address",
          label: "Address",
        },
        {
          field: "gender",
          label: "Gender",
        },
      ],
    };
  },
  methods: {
    getDate() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0");
      let yyyy = today.getFullYear();

      today = mm + "-" + dd + "-" + yyyy;
      return today;
    },

    downloadCSV() {
      const visitors_data = JSON.parse(JSON.stringify(this.$props.visitors));
      var csv = Papa.unparse(visitors_data);
      var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const date = this.getDate();
      saveAs(blob, `visitors-${date}.csv`);
    },

    clearData() {
      this.$buefy.dialog.confirm({
        message:
          "Are you sure you want to clear all the data? Download the CSV first if you haven't done so already.",
        onConfirm: () => {
          EventBus.$emit("visitor:clear");
        },
      });
    },
  },
};
</script>
