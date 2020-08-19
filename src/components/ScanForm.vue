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
      <b-field label="Temperature">
        <b-input type="text" v-model="questions.temperature"></b-input>
      </b-field>

      <b-field
        label="Foreign countries you have worked, visited, transited in the past 14 days?"
      >
        <b-input
          type="text"
          v-model="questions.foreign_countries_text"
        ></b-input>
      </b-field>

      <b-field
        label="Cities in the Philippines you have worked, lived or transited in the past 14 days?"
      >
        <b-input type="text" v-model="questions.cities_worked_text"></b-input>
      </b-field>

      <b-field
        label="Have you been sick in the past 30 days? Hospital visited if any?"
      >
        <b-input
          type="text"
          v-model="questions.hospitals_visited_text"
        ></b-input>
      </b-field>

      <b-field
        label="In the last 14 days, did you have any of the following: fever, colds, cough, sore throat, loss of smell and taste, muscle pain, headache or difficulty in breathing?"
      >
        <b-input type="text" v-model="questions.symptoms_text"></b-input>
      </b-field>

      <b-field
        label="In the last 14 days, have you been in close contact or exposed to any person suspected of our confirmed with COVID-19?"
      >
        <b-input
          type="text"
          v-model="questions.close_contact_person_text"
        ></b-input>
      </b-field>

      <b-field
        label="In the last 14 days, have you been in close contact with farm animals or exposed to wild animals?"
      >
        <b-input
          type="text"
          v-model="questions.close_contact_animal_text"
        ></b-input>
      </b-field>

      <div class="block">
        <b-field
          label="The information I have given is true, correct, and complete. I understand that failure to answer any question or giving false answer can be penalized in accordance with law."
        />
        <b-radio v-model="questions.consent_one" native-value="yes">
          Yes
        </b-radio>
        <b-radio v-model="questions.consent_one" native-value="no">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field
          label="I voluntarily and freely consent to the collection and sharing of the above personal information only in relation to the Hrep COVID-19 internal protocols."
        />
        <b-radio v-model="questions.consent_two" native-value="yes">
          Yes
        </b-radio>
        <b-radio v-model="questions.consent_two" native-value="no">
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
      questions: {
        temperature: "36",
        travelled_foreign_countries: "no",
        foreign_countries_text: "",

        cities_worked: "no",
        cities_worked_text: "",

        hospitals_visited: "no",
        hospitals_visited_text: "",

        symptoms: "no",
        symptoms_text: "",

        close_contact_person: "no",
        close_contact_person_text: "",

        close_contact_animal: "no",
        close_contact_animal_text: "",

        consent_one: "yes",
        consent_two: "yes",
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
        this.questions.travelled_foreign_countries = this.questions
          .foreign_countries_text
          ? "yes"
          : "no";

        this.questions.cities_worked = this.questions.cities_worked_text
          ? "yes"
          : "no";
        this.questions.hospitals_visited = this.questions.hospitals_visited_text
          ? "yes"
          : "no";

        this.questions.symptoms = this.questions.symptoms_text ? "yes" : "no";
        this.questions.close_contact_person = this.questions
          .close_contact_person_text
          ? "yes"
          : "no";

        this.questions.close_contact_animal = this.questions
          .close_contact_animal_text
          ? "yes"
          : "no";

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
        cities_worked_text: "",

        hospitals_visited: "no",
        hospitals_visited_text: "",

        symptoms: "no",
        symptoms_text: "",

        close_contact_person: "no",
        close_contact_person_text: "",

        close_contact_animal: "no",
        close_contact_animal_text: "",

        consent_one: "yes",
        consent_two: "yes",
      };
    },
  },
};
</script>
