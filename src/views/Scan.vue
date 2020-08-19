<template>
	<div>
		<Header />
		<ScanForm />
	</div>
</template>
<script>
import ScanForm from "@/components/ScanForm";
import Header from "@/components/Header";

export default {
	name: "Scan",
	components: {
		ScanForm,
		Header,
	},
};
</script>
