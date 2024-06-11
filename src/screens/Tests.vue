<script setup>
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import ProgressSpinner from 'primevue/progressspinner'
import Tag from 'primevue/tag'
import { onMounted, ref } from 'vue'
import FilePreviewComponent from '../components/FilePreviewComponent.vue'
import Header from '../components/Header.vue'
import ResultPreviewComponent from '../components/ResultPreviewComponent.vue'
import { useFileStore } from '../stores/file.store.js'

const fileStore = useFileStore()
const newFile = ref()
const error = ref()
const filename = ref('')
const files1 = ref([])
const audioFile = ref(null)

const handleFileChange = event => {
	const file = event.target.files[0]
	filename.value = file.name
	console.log(file.name)
}
const isLoading1 = ref(false)
const downLoadFile = async event => {
	try {
		isLoading1.value = true
		const fileUp = event.files[0]
		const formData = new FormData()
		formData.append(fileUp.name, fileUp)
		await fileStore.downLoadFile(formData)
		if (fileStore.success) {
			isLoading1.value = false
		}
	} catch (err) {
		console.error(err)
	}
}
const isLoading = ref(false)
const file = ref(null)
const onSubmit = async event => {
	isLoading.value = true
	let maxMaxPoints = 0
	setTimeout(() => {
		try {
			let totalMaxPoints = 0
			let totalAvgPoints = 0
			let totalPercentagePoints = 0

			for (let i = 0; i < 3; i++) {
				const max = Math.round(Math.random() * 50) + 50
				const avg = Math.round(Math.random() * 50) + 25
				const percentage = Math.round(Math.random() * 50) + 50

				const maxPoints = Math.round(max * (percentage / 100))
				const avgPoints = avg
				const percentagePoints = percentage

				if (maxPoints > totalMaxPoints) {
					totalMaxPoints = maxPoints // Если да, обновляем максимальное значение
				}
				totalAvgPoints += avgPoints
				totalPercentagePoints = percentagePoints

				files.value.push({
					filename: selectedFile.value[i].name,
					maxPoints,
					avgPoints,
					percentagePoints,
					answerLink: 'http://localhost:8000/',
				})
				if (maxPoints > maxMaxPoints) {
					maxMaxPoints = maxPoints // Если да, обновляем максимальное значение
				}
			}

			// Сохраняем суммарные значения в объект result.value
			result.value = {
				maxPoints: totalMaxPoints,
				avgPoints: totalAvgPoints / 2,
				percentagePoints: totalPercentagePoints,
			}

			isLoading.value = false
			// Сбрасываем значения формы
			event.target.reset()
			name.value = ''
			tag.value = ''
			selectedFile.value = ''
			fileInput.value = ''
			tags.value = []
		} catch (err) {
			isLoading.value = false
			console.error(err)
			event.target.reset()
		}
	}, 10000)
}
onMounted(async () => {
	const response = await fileStore.getFiles()
	console.log(response)
	files1.value = fileStore.files
})
const selectedFile = ref([])
const addTags = () => {
	if (tag.value) {
		tags.value.push(tag.value)
		localStorage.setItem('tags', JSON.stringify(tags.value))
	}
}

const fileInput = ref()
const files = ref([])
const name = ref('')
const tag = ref()
const tags = ref([])
const result = ref({})
</script>
<template>
	<Header />
	<main>
		<section>
			<div class="loading">
				<label>Загрузите файл</label>
				<FileUpload
					mode="basic"
					accept=".opus"
					:maxFileSize="10000000"
					:style="{
						width: '100%',
						height: '40px',
						'background-color': '#AEAEAE',
						'border-radius': '6px',
						border: 'none',
						color: '#000000',
						'font-size': '19px',
						outline: 'none',
					}"
					upload-icon="none"
					choose-icon="none"
					choose-label="Загрузить файл с аудио"
					class="audioFile"
					:auto="true"
					:customUpload="true"
					@uploader="downLoadFile"
				/>
				<Button label="Загрузить" @click="downLoadFile()" />
				<ProgressSpinner v-if="isLoading1" style="width: 50px; height: 50px" />
			</div>
			<div class="file_loading">
				<form @submit.prevent="onSubmit">
					<FileUpload
						mode="basic"
						accept=".txt"
						:maxFileSize="1000000"
						:style="{
							width: '100%',
							height: '40px',
							'background-color': '#AEAEAE',
							'border-radius': '6px',
							border: 'none',
							color: '#000000',
							'font-size': '19px',
							outline: 'none',
						}"
						v-model="fileInput"
						upload-icon="none"
						choose-icon="none"
						choose-label="Загрузить файл с тестом"
						@change="handleChangeFiles()"
					/>
					<div class="name_field">
						<label for="name">Название</label>
						<InputText type="text" id="name" name="name" v-model="name" />
					</div>
					<div class="tags_field">
						<label for="tags">Теги</label>
						<div class="add_tags">
							<InputText
								type="text"
								id="tags"
								name="tags"
								:style="{ width: '100%' }"
								v-model="tag"
							/>
							<Button
								label="Добавить"
								:style="{
									width: '150px',
								}"
								:disabled="tag === ''"
								@click="addTags()"
							/>
						</div>
						<div class="tags">
							<Tag
								v-for="(tag, index) in tags"
								:key="index"
								:value="tag"
								@remove="() => tags.value.pop(tag)"
								:style="{
									'background-color': '#E4E4E4E4',
									color: '#000000',
									border: 'none',
									'font-size': '14px',
									outline: 'none',
									'border-radius': '6px',
									'max-width': '125px',
									height: '30px',
								}"
							/>
						</div>
					</div>
					<div class="test_chooser">
						<label for="test">Файлы</label>
						<MultiSelect
							v-model="selectedFile"
							display="chip"
							:options="files1"
							optionLabel="name"
							placeholder="Выбери файлы"
							:maxSelectedLabels="5"
							:style="{
								width: '100%',
								'background-color': '#E4E4E4',
								border: 'none',
							}"
							dropdown-icon="pi pi-caret-right"
							class="multiselect"
						/>
					</div>
					<Button
						label="Запустить"
						type="submit"
						icon="fas fa-spinner fa-spin"
						:disabled="isLoading"
					/>
					<ProgressSpinner v-if="isLoading" style="width: 50px; height: 50px" />
				</form>
			</div>
		</section>
		<section>
			<ResultPreviewComponent :result="result" />
			<FilePreviewComponent :files="files" />
		</section>
	</main>
</template>

<style scoped>
main {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	height: calc(100vh - 60px);
	padding: 0 250px;
	gap: 20px;
	> section {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-block: 25px;
		> div {
			width: 100%;
			border: 1px solid #aeaeae;
			border-radius: 6px;
		}
		> .loading {
			padding: 25px;
			display: flex;
			flex-direction: column;
			width: 100%;
			gap: 12px;
		}
	}
	> .file_loading {
		grid-template-rows: repeat(2, 1fr);
	}
}

.file_loading {
	padding: 30px;
	> form {
		display: flex;
		flex-direction: column;
		gap: 20px;
		> .name_field {
			display: flex;
			flex-direction: column;
			gap: 10px;
			font-size: 20px;
			color: #000000;
		}
		> .tags_field {
			display: flex;
			flex-direction: column;
			gap: 10px;
			font-size: 20px;
			color: #000000;
			> .add_tags {
				display: flex;
				gap: 15px;
				width: 100%;
			}
			> .tags {
				display: flex;
				flex-wrap: wrap;
				gap: 10px;
			}
		}
		> .test_chooser {
			display: flex;
			flex-direction: column;
			gap: 10px;
			font-size: 20px;
			color: #000000;
		}
	}
}

.result_preview {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	height: 185px;
	> div {
		border-right: 1px solid #aeaeae;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		color: #000000;
		text-align: center;
		> h1 {
			font-size: 50px;
			font-weight: 400;
		}
	}
	> div:last-child {
		border-right: none;
	}
}
@media (min-width: 768px) {
	.multiselect {
		width: 20rem;
	}
}
.multiselect {
	@media (min-width: 768px) {
		width: 20rem;
	}
}
.fa {
	display: inline-block; /* removed comment */
	font: normal normal normal 14px/1 FontAwesome;
	font-size: inherit;
	text-rendering: auto;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.fa {
	display: inline;
}
</style>
