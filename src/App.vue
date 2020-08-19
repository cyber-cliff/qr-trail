<template>
	<div id="app">
		<router-view :visitors="visitors" />
	</div>
</template>

<script>
import Vue from "vue";
import { EventBus } from "./event-bus.js";
export default {
	created() {
		EventBus.$on("visitor:add", (visitor) => {
			this.visitors.push(visitor);
			Vue.localStorage.set("visitors", JSON.stringify(this.visitors));
		});

		const visitors = Vue.localStorage.get("visitors");
		if (visitors) {
			this.visitors = JSON.parse(visitors);
		}
	},
	data() {
		return {
			visitors: [],
		};
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	padding: 20px;
	max-width: 350px;
	margin: 0 auto;
}

.boxu {
	margin-top: 5px;
	margin-bottom: 5px;
}
</style>
