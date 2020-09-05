<template>
  <div>
    <qrcode-stream @decode="onDecode"></qrcode-stream>

    <div v-if="visitor">
      <b-table :data="[visitor]" :columns="columns"></b-table>
    </div>

    <div class="boxu">
      <b-button class="is-info" @click="saveAndSkip" expanded>
        Save Entry and Skip Questionnaire
      </b-button>
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

      <div class="block">
        <b-field
          label="Have you have worked, visited, transited in any foreign country in the past 14 days?"
        />
        <b-radio
          v-model="questions.travelled_foreign_countries"
          native-value="yes"
        >
          Yes
        </b-radio>
        <b-radio
          v-model="questions.travelled_foreign_countries"
          native-value="no"
        >
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field
          label="Cities in the Philippines you have worked, lived or transited in the past 14 days?"
        />
        <b-radio v-model="questions.cities_worked" native-value="yes">
          Yes
        </b-radio>
        <b-radio v-model="questions.cities_worked" native-value="no">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field label="Sore throat" />
        <b-radio v-model="questions.symptoms_sore_throat" native-value="yes">
          Yes
        </b-radio>
        <b-radio v-model="questions.symptoms_sore_throat" native-value="no">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field label="Body pains" />
        <b-radio v-model="questions.symptoms_body_pains" native-value="yes">
          Yes
        </b-radio>
        <b-radio v-model="questions.symptoms_body_pains" native-value="no">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field label="Headache" />
        <b-radio v-model="questions.symptoms_headache" native-value="yes">
          Yes
        </b-radio>
        <b-radio v-model="questions.symptoms_headache" native-value="no">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field label="Fever" />
        <b-radio v-model="questions.symptoms_fever" native-value="yes">
          Yes
        </b-radio>
        <b-radio v-model="questions.symptoms_fever" native-value="no">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field label="Have you been sick in the past 30 days?" />
        <b-radio v-model="questions.sick" native-value="yes">
          Yes
        </b-radio>
        <b-radio v-model="questions.sick" native-value="no">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field
          label="Have you had any contact with anyone with fever, cough, cold, and sore throat in the past 14 days?"
        />
        <b-radio v-model="questions.close_contact_person" native-value="yes">
          Yes
        </b-radio>
        <b-radio v-model="questions.close_contact_person" native-value="no">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field
          label="In the last 14 days, have you been in close contact with farm animals or exposed to wild animals?"
        />
        <b-radio v-model="questions.close_contact_animal" native-value="yes">
          Yes
        </b-radio>
        <b-radio v-model="questions.close_contact_animal" native-value="no">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field
          label="I understand that my personal information is protected by RA 10173, Data Privacy Act of 2012, and that I am required by RA 11469, Bayanihan to Heal as One Act, to provide thruthful information."
        />
        <b-radio v-model="questions.agree_to_collect_data" native-value="yes">
          Yes
        </b-radio>
        <b-radio v-model="questions.agree_to_collect_data" native-value="no">
          No
        </b-radio>
      </div>

      <b-button class="is-info" @click="saveEntry" expanded>
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

        travelled_foreign_countries: "no",

        cities_worked: "no",

        symptoms_sore_throat: "no",
        symptoms_body_pains: "no",
        symptoms_headache: "no",
        symptoms_fever: "no",
        sick: "no",

        close_contact_person: "no",

        close_contact_animal: "no",

        agree_to_collect_data: "yes",
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
      ],
    };
  },
  methods: {
    onDecode(decodedString) {
      const encodedWord = CryptoJS.enc.Base64.parse(decodedString);
      const decoded = CryptoJS.enc.Utf8.stringify(encodedWord);

      this.visitor = JSON.parse(decoded);
    },

    saveVisitor() {
      if (this.visitor) {
        this.questions.date = formatDate("yyyy/MM/dd", this.questions.date);
        this.questions.time = formatDate("hh:mm", this.questions.time);

        Object.assign(this.visitor, this.questions);

        EventBus.$emit("visitor:add", this.visitor);

        this.$buefy.dialog.alert("Visitor added on file!");
        this.resetForm();
        window.scrollTo(0, 0);
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
        travelled_foreign_countries: "no",
        foreign_countries_text: "",

        cities_worked: "no",

        symptoms_sore_throat: "no",
        symptoms_body_pains: "no",
        symptoms_headache: "no",
        symptoms_fever: "no",
        sick: "no",

        hospitals_visited: "no",
        hospitals_visited_text: "",

        symptoms: "no",
        symptoms_text: "",

        close_contact_person: "no",

        close_contact_animal: "no",
        close_contact_animal_text: "",

        agree_to_collect_data: "yes",
      };
    },
  },
};
</script>
