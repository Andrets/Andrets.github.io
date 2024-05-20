<script setup>
defineProps({
	result: Object,
})
</script>
<template>
	<div class="result_preview">
		<div>
			<h1>{{ result.maxPoints }}</h1>
			Макс. балл
		</div>
		<div>
			<h1>{{ result.avgPoints }}</h1>
			Ср. балл
		</div>
		<div>
			<h1>{{ result.percentagePoints }}%</h1>
			Процент
		</div>
	</div>
</template>
<style scoped>
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
</style>
<script setup lang="ts"></script>
