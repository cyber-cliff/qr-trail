<template>
	<div>
		<Header />
		<Table :visitors="visitors" />
	</div>
</template>
<script>
import Header from "@/components/Header";
import Table from "@/components/Table";
export default {
	name: "Scan",
	components: {
		Header,
		Table,
	},
	props: {
		visitors: Array,
	},
};
</script>
