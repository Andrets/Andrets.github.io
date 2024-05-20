import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useFileStore = defineStore('file', () => {
	const downLoadFile = async payload => {
		const csrfToken = document.cookie.match(/csrftoken=([^ ;]+)/)[1]
		axios.defaults.headers.common['X-CSRFToken'] = csrfToken
		try {
			const response = await axios.post(
				'http://localhost:8000/api-v1/file/uploadToBucket',
				payload,
				{
					withCredentials: true,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			if (response.status === 200) {
				success.value = true
				return response.data
			}
			return response.data
		} catch (err) {
			error.value = err
		}
	}
	const getFiles = async () => {
		const csrfToken = document.cookie.match(/csrftoken=([^ ;]+)/)[1]
		axios.defaults.headers.common['X-CSRFToken'] = csrfToken
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
			files.value = response.data.message.files
			return response.data
		} else {
			error.value = response.data
		}
	}
	const success = ref(false)
	const files = ref([])
	const error = ref()
	return { downLoadFile, success, error, getFiles, files }
})
