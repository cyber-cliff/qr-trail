<template>
  <div>
    <qrcode-stream @decode="onDecode"></qrcode-stream>

    <div v-if="visitor">
      <b-table :data="[visitor]" :columns="columns"></b-table>
    </div>

    <div class="form-container">
      <b-field label="Date">
        <b-datepicker
          ref="datepicker"
          v-model="questions.date"
          expanded
          placeholder="Click to select a date..."
        >
        </b-datepicker>
      </b-field>

      <b-field label="Check-in Time">
        <b-timepicker
          v-model="questions.time"
          placeholder="Click to select time..."
          :enable-seconds="enableSeconds"
          :hour-format="hourFormat"
        >
        </b-timepicker>
      </b-field>

      <b-field label="Temperature">
        <b-input type="text" v-model="questions.temperature"></b-input>
      </b-field>

      <b-button
        class="is-info"
        @click="saveEntry"
        expanded
        :disabled="visitor === null"
      >
        Save Entry
      </b-button>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
import formatDate from "date-format";
import { QrcodeStream } from "vue-qrcode-reader";

import { EventBus } from "../event-bus.js";

export default {
  name: "ScanForm",
  components: {
    QrcodeStream,
  },

  data() {
    return {
      visitor: null,

      enableSeconds: true,
      hourFormat: "24",

      questions: {
        date: new Date(),
        time: new Date(),
        temperature: "36",
      },

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

        {
          field: "travelled_foreign",
          label: "Travelled to foreign country",
        },
        {
          field: "other_cities",
          label: "Visited other cities",
        },
        {
          field: "sore_throat",
          label: "Has sore throat",
        },
        {
          field: "body_pains",
          label: "Has body pains",
        },
        {
          field: "headache",
          label: "Has headache",
        },
        {
          field: "fever",
          label: "Has fever",
        },
        {
          field: "sick",
          label: "Has been sick",
        },
        {
          field: "close_contact_person",
          label: "Close contact person",
        },
        {
          field: "close_contact_animal",
          label: "Close contact animal",
        },
      ],
    };
  },
  methods: {
    onDecode(decodedString) {
      try {
        const encodedWord = CryptoJS.enc.Base64.parse(decodedString);
        const decoded = CryptoJS.enc.Utf8.stringify(encodedWord);

        this.visitor = JSON.parse(decoded);
      } catch (err) {
        console.log("err occurred: ", err);
      }
    },

    saveVisitor() {
      if (this.visitor) {
        try {
          Object.assign(this.visitor, {
            temperature: this.questions.temperature,
            date: formatDate("yyyy/MM/dd", this.questions.date),
            time: formatDate("hh:mm", this.questions.time),
          });

          EventBus.$emit("visitor:add", this.visitor);

          this.$buefy.dialog.alert("Visitor added on file!");
          this.resetForm();
          window.scrollTo(0, 0);
        } catch (err) {
          console.log("err: ", err);
        }
      } else {
        this.$buefy.dialog.alert("You forgot to scan first.");
      }
    },

    saveAndSkip() {
      this.saveVisitor();
    },

    saveEntry() {
      this.saveVisitor();
    },

    resetForm() {
      this.visitor = null;

      this.questions = {
        date: new Date(),
        time: new Date(),
        temperature: "36",
      };
    },
  },
};
</script>
