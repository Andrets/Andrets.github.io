<script setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import { useApiStore } from '../stores/api.store'

const apiStore = useApiStore()

const login = ref('')
const password = ref('')
const email = ref('')

const formSubmitted = ref(false)

const loginHandler = async () => {
	formSubmitted.value = true
	try {
		await apiStore.register({
			username: login.value,
			password: password.value,
      email:    email.value,
		})
	} catch (err) {
		console.log(err)
	}
}
</script>

<template>
	<main>
		<div class="container text-center w-25">
			<h1>Регистрация</h1>
			<form method="POST" @submit.prevent="loginHandler()">
				<InputText
					type="text"
					class="form-control mt-3"
					title="Логин"
					id="username"
					name="username"
					placeholder="Логин..."
					v-model="login"
				/>
				<InputText
					type="password"
					class="form-control mt-3"
					title="Пароль"
					id="password"
					name="password"
					placeholder="Пароль..."
					v-model="password"
				/>
				<InputText
					type="email"
					title="Почта"
					placeholder="Почта..."
					v-model="email"
				/>
				<Button
					:style="{
						display: 'flex',
						'align-items': 'center',
						'justify-content': 'center',
						color: '#000000',
						'background-color': '#AEAEAE',
					}"
					severity="secondary"
					type="submit"
				>
					Зарегистрироваться
				</Button>
			</form>
			<span class="mt-2"> <RouterLink to="/login">Войти</RouterLink></span>
		</div>
	</main>
</template>

<style scoped>
main {
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 60px);
	width: 100%;
	> div {
		display: flex;
		flex-direction: column;
		height: 384px;
		width: 319px;
		padding: 0 30px;
		text-align: center;
		> h1 {
			font-size: 40px;
			text-align: center;
			font-weight: 400;
			margin: 20px;
		}
		> form {
			display: flex;
			flex-direction: column;
			text-align: center;
			gap: 15px;
		}
		> span {
			text-align: center;
			margin-top: 10px;
			font-size: 20px;
			color: #aeaeae;
			cursor: pointer;
		}
	}
}
</style>
