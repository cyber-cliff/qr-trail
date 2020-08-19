<template>
  <section>
    <div class="columns is-mobile">
      <div class="column is-two-thirds">
        <div id="qr-container" class="inline">
          <qrcode
            :value="this.url"
            :options="{ width: 132 }"
            tag="img"
          ></qrcode>
        </div>
        <h1 class="inline">_ _QR Trail</h1>
      </div>

      <div class="column" v-if="is_scan_page">
        <b-button class="is-pulled-right" type="is-light" @click="goToFiles">
          Files
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import VueQrcode from "@chenfengyuan/vue-qrcode";
Vue.component(VueQrcode.name, VueQrcode);

export default {
  name: "Header",
  data() {
    return {
      url: "https://qr_trail.surge.sh",
      is_scan_page: this.$route.name == "Scan",
    };
  },
  methods: {
    goToFiles() {
      this.$router.push("/files");
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 28px;
}

h2 {
  font-size: 25px;
}

.text-centered {
  text-align: center;
}

.inline {
  display: inline-block;
}

#qr-container {
  width: 25px;
}
</style>
