<template>
  <div>
    <div class="form-container">
      <b-field label="Last Name">
        <b-input type="text" v-model="user.lname" required></b-input>
      </b-field>

      <b-field label="First Name">
        <b-input type="text" v-model="user.fname" required></b-input>
      </b-field>

      <b-field label="Middle Name">
        <b-input type="text" v-model="user.mname" required></b-input>
      </b-field>

      <b-field label="Nationality">
        <b-input type="text" v-model="user.nation" required></b-input>
      </b-field>

      <b-field label="Age">
        <b-input type="number" v-model="user.age" required></b-input>
      </b-field>

      <div class="block">
        <b-field label="Gender" />
        <b-radio v-model="user.gender" native-value="M">
          Male
        </b-radio>
        <b-radio v-model="user.gender" native-value="F">
          Female
        </b-radio>
      </div>

      <b-field label="Phone number">
        <b-input type="text" v-model="user.phone" required></b-input>
      </b-field>

      <b-field label="Complete Dauis Address w/ Purok">
        <b-input type="text" v-model="user.address" required></b-input>
      </b-field>

      <div class="block">
        <b-field
          label="Have you have worked, visited, transited in any foreign country in the past 14 days?"
        />
        <b-radio v-model="user.travelled_foreign" native-value="Y">
          Yes
        </b-radio>
        <b-radio v-model="user.travelled_foreign" native-value="N">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field
          label="Cities in the Philippines you have worked, lived or transited in the past 14 days?"
        />
        <b-radio v-model="user.other_cities" native-value="Y">
          Yes
        </b-radio>
        <b-radio v-model="user.other_cities" native-value="N">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field label="Sore throat" />
        <b-radio v-model="user.sore_throat" native-value="Y">
          Yes
        </b-radio>
        <b-radio v-model="user.sore_throat" native-value="N">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field label="Body pains" />
        <b-radio v-model="user.body_pains" native-value="Y">
          Yes
        </b-radio>
        <b-radio v-model="user.body_pains" native-value="N">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field label="Headache" />
        <b-radio v-model="user.headache" native-value="Y">
          Yes
        </b-radio>
        <b-radio v-model="user.headache" native-value="N">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field label="Fever" />
        <b-radio v-model="user.fever" native-value="Y">
          Yes
        </b-radio>
        <b-radio v-model="user.fever" native-value="N">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field label="Have you been sick in the past 30 days?" />
        <b-radio v-model="user.sick" native-value="Y">
          Yes
        </b-radio>
        <b-radio v-model="user.sick" native-value="N">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field
          label="Have you had any contact with anyone with fever, cough, cold, and sore throat in the past 14 days?"
        />
        <b-radio v-model="user.close_contact_person" native-value="Y">
          Yes
        </b-radio>
        <b-radio v-model="user.close_contact_person" native-value="N">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field
          label="In the last 14 days, have you been in close contact with farm animals or exposed to wild animals?"
        />
        <b-radio v-model="user.close_contact_animal" native-value="Y">
          Yes
        </b-radio>
        <b-radio v-model="user.close_contact_animal" native-value="N">
          No
        </b-radio>
      </div>

      <div class="block">
        <b-field
          label="I understand that my personal information is protected by RA 10173, Data Privacy Act of 2012, and that I am required by RA 11469, Bayanihan to Heal as One Act, to provide thruthful information."
        />
        <b-radio v-model="agree" native-value="Y">
          Yes
        </b-radio>
        <b-radio v-model="agree" native-value="N">
          No
        </b-radio>
      </div>

      <b-button
        class="is-info"
        @click="saveEntry"
        expanded
        :disabled="isGenerateQRDisabled"
      >
        Generate QR Code
      </b-button>
    </div>

    <div class="qr-container" v-if="this.url">
      <div class="boxu">
        <b-notification
          v-model="showNotification"
          aria-close-label="Close notification"
        >
          This will serve as your ID which can be scanned by the establishments
          you enter so they can get your information. You can download it below
          and have it printed for easy access.
        </b-notification>
      </div>

      <qrcode
        :value="this.url"
        :options="{ width: 200 }"
        tag="img"
        ref="qr"
      ></qrcode>

      <b-button class="is-link" @click="downloadQR" expanded>
        Download QR Code
      </b-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import CryptoJS from "crypto-js";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import { saveAs } from "file-saver";

Vue.component(VueQrcode.name, VueQrcode);

export default {
  name: "RegisterForm",

  computed: {
    isGenerateQRDisabled: function() {
      return this.agree === "N";
    },
  },

  data() {
    return {
      showNotification: true,
      user: {
        lname: "",
        fname: "",
        mname: "",
        nation: "",
        age: "",
        phone: "",
        address: "",
        gender: "M",

        // questions
        travelled_foreign: "N",

        other_cities: "N",

        sore_throat: "N",
        body_pains: "N",
        headache: "N",
        fever: "N",
        sick: "N",

        close_contact_person: "N",

        close_contact_animal: "N",
      },
      agree: "N",
      url: "",
    };
  },
  methods: {
    encrypt(str) {
      const encodedWord = CryptoJS.enc.Utf8.parse(str);
      const encoded = CryptoJS.enc.Base64.stringify(encodedWord);
      return encoded;
    },
    saveEntry() {
      const user = JSON.stringify(this.user);
      const cipherText = this.encrypt(user);

      this.url = cipherText;

      Vue.localStorage.set("user", user);

      this.$buefy.dialog.alert("Your QR ID is generated!");

      window.scrollTo(0, document.body.scrollHeight);
    },
    downloadQR() {
      saveAs(
        this.$refs.qr.$el.src,
        `QRID-${this.user.fname}-${this.user.lname}.png`
      );
    },
  },
  created() {
    const user_str = Vue.localStorage.get("user");
    if (user_str) {
      const cipherText = this.encrypt(user_str);
      this.url = cipherText;

      this.user = JSON.parse(user_str);
    }
  },
};
</script>

<style>
.form-container {
  margin-top: 20px;
}

.qr-container {
  text-align: center;
}
</style>
