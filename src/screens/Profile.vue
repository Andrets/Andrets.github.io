<template>
	<Header />
	<main>
		<User :user="user" />
		Выйти? <Button type="button" @click="logout()">Выйти</Button>
	</main>
</template>
<script setup>
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import Header from '../components/Header.vue'
import User from '../components/User.vue'
import { useProfileStore } from '../stores/profile.store.js'

const profileStore = useProfileStore()

const user = ref({})

const error = ref()

onMounted(async () => {
	try {
		await profileStore.getProfileInfo()
		user.value = profileStore.profileInfo
	} catch (err) {
		console.error(err)
	}
})

const logout = async () => {
	try {
		const response = await profileStore.logout()
		if (profileStore.successOrNot) {
			window.location.href = '/login'
		} else {
			error.value = response.message
			window.location.href = '/login'
		}
	} catch (err) {
		console.error(err)
	}
}
</script>
<style scoped>
main {
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 60px);
	width: 100%;
}
</style>
