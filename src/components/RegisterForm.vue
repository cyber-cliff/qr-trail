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

      <b-field label="Address">
        <b-input type="text" v-model="user.address" required></b-input>
      </b-field>

      <b-button class="is-info" @click="saveEntry" expanded>
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
      },
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
