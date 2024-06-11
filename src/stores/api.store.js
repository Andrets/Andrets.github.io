import axios from 'axios'
import { defineStore } from 'pinia'
import {ref} from "vue";
import router from "../router.js";

export const useApiStore = defineStore('api',  () => {
	const login = async (payload) => {
		isLoading.value = true
		const response = await axios.post('http://localhost:8000/api-v1/auth/login', payload, {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		})
		if (response.status === 201) {
			isLoading.value = false
			isLoggedIn.value = true
			window.location.href = '/'
			const response = await axios.get("http://localhost:8000/api-v1/profile/getProfile", {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (response.status === 200) {
				localStorage.setItem("user", JSON.stringify(response.data.message))
				userInfo.value = response.data.message
				return response.data
			} else {
				userErrors.value = response.data.message
			}
		} else {
			loginErrors.value = response.data.error
		}
	}
	const checkLogin = async () =>  {
		isLoading.value = true
		const authorized = localStorage.getItem("authorized")
		if (authorized === "true") {
			isLoading.value = false
			isLoggedIn.value = true
			return true
		} else {
			try {
				const response = await axios.get('http://localhost:8000/api-v1/auth/check', {
				withCredentials: true,
				headers: {
					'Content-Type': "application/json",
				},
			})
			if (response.status === 401) {
				isLoading.value = false
				errors.value = response.data
				return false
			} else {
				isLoading.value = false
				isLoggedIn.value = true
				localStorage.setItem("authorized", "true")
				return true
			}
			} catch(err) {
				console.error(err)
			}
		}
	}
	const register = async (payload) => {
		const response = await axios.post("http://localhost:8000/api-v1/auth/register", payload, {
			withCredentials: true,
			headers: {
				'Content-Type': "application/json",
			},
		})
		if (response.status === 201) {
			this.registerSuccess = true
			return response.data
		}
		this.registerSuccess = false
		return response.data
	}

	const registerSuccess = ref(false)
	const isLoggedIn = ref(false)
	const isLoading = ref(false)
	const loginErrors = ref()
	const userInfo = ref()
	const userErrors = ref()

	return { login, loginErrors, isLoading, register, checkLogin, registerSuccess, isLoggedIn, userInfo, userErrors }
})