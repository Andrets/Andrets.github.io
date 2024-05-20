<script setup>
defineProps({
	files: Array,
})
</script>
<template>
	<div class="files_preview">
		<div class="table-container">
			<table class="file-table">
				<colgroup>
					<col style="width: 33.33%" />
					<col style="width: 33.33%" />
					<col style="width: 33.33%" />
				</colgroup>
				<thead>
					<tr>
						<th>Название</th>
						<th>Баллы</th>
						<th>Ссылка на ответ</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(file, index) in files" :key="index">
						<td>{{ file.filename }}</td>
						<td>{{ file.maxPoints }}</td>
						<td><a :href="file.answerLink" target="_blank">Ссылка</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<style scoped>
.files_preview {
	height: 100%;
	> .table {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		width: 100%;
		height: 30px;
		> table {
			display: flex;
			align-items: center;
			height: 30px;
			padding-left: 8px;
			border-right: 1px solid #aeaeae;
			border-bottom: 1px solid #aeaeae;
		}
		> div:last-child {
			border-right: none;
		}
		> div:nth-last-child(2) {
			border-top: none !important;
			border-left: none !important;
			padding-left: 0px !important;
		}
	}
	> .table_files {
		width: 100%;
		height: calc(100% - 30px);
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		> div {
			display: flex;
			border-right: 1px solid #aeaeae;
		}
		> div:last-child {
			border-right: none;
		}
	}
}

.table-container {
	overflow-x: auto;
}

.file-table th,
.file-table td {
	padding: 8px;
	border: 1px solid #ddd;
}

/* .file-table th {
	background-color: #f2f2f2;
} */

/* .file-table tbody tr:nth-child(even) {
	background-color: #f2f2f2;
} */

/* .file-table tbody tr:hover {
	background-color: #ddd;
} */

.file-table td a {
	text-decoration: underline;
}

/* .file-table td a:hover {
	color: darkblue;
} */

.file-table {
	width: 100%;
	border-collapse: collapse;
	table-layout: fixed; /* Равномерное распределение ширины */
}

.file-table th,
.file-table td {
	padding: 8px;
	border: 1px solid #ddd;
	word-wrap: break-word; /* Перенос слов при необходимости */
}
</style>
