<template>
	<div>
		<Header />
		<RegisterForm />
	</div>
</template>
<script>
import RegisterForm from "@/components/RegisterForm";
import Header from "@/components/Header";
export default {
	name: "Register",
	components: {
		RegisterForm,
		Header,
	},
};
</script>
