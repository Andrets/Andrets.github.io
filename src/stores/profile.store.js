import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore('profile', () => {
	const csrfToken = document.cookie.match(/csrftoken=([^ ;]+)/)[1]
	axios.defaults.headers.common['X-CSRFToken'] = csrfToken
	// const getProfileInfo = async () => {
	//     const userData = localStorage.getItem("user")
	//     if (userData != null) {
	//         profileInfo.value = userData
	//         return userData
	//     } else {
	//         const response = await axios.get("http://localhost:8000/api-v1/profile/getProfile", {
	//             withCredentials: true,
	//             headers: {
	//                 'Content-Type': 'application/json'
	//             }
	//         })
	//         if (response.status === 200) {
	//             profileInfo.value = response.data.message
	//             localStorage.setItem("user", JSON.stringify(profileInfo.value))
	//             return response.data
	//         } else {
	//             error.value = response.data
	//         }
	//     }
	// }
	const getProfileInfo = async () => {
		if (!localStorage.getItem('user') === null || '') {
			profileInfo.value = JSON.parse(localStorage.getItem('user'))
		} else {
			const response = await axios.get(
				'http://localhost:8000/api-v1/profile/getProfile',
				{
					withCredentials: true,
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			if (response.status === 200) {
				profileInfo.value = response.data.message
				localStorage.setItem('user', JSON.stringify(response.data.message))
				return response.data
			} else {
				error.value = response.data
			}
		}
	}
	const logout = async () => {
		if (
			localStorage.getItem('user') != null &&
			localStorage.getItem('authorized') !== true
		) {
			localStorage.setItem('user', JSON.stringify(null))
			localStorage.setItem('authorized', JSON.stringify(false))
		}
		const response = await axios.get(
			'http://localhost:8000/api-v1/auth/logout',
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
		if (response.status === 200) {
			successOrNot.value = true
			window.location.href = '/login'
		} else {
			successOrNot.value = false
		}
		return response.data
	}

	const profileInfo = ref()
	const error = ref()
	const successOrNot = ref()

	return { getProfileInfo, profileInfo, error, logout, successOrNot }
})
