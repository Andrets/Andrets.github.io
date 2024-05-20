<script setup>
import Header from '../components/Header.vue'
</script>
<template>
	<Header />
	<main>
		<div class="container">
			<div>Новое тестирование</div>
			<div>Последние тестирования</div>
			<div>Тесты</div>
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
}

.container {
	display: flex;
	flex-direction: row;
	gap: 24px;
	width: 100%;
	padding: 0 360px;
	> div {
		width: 364px;
		cursor: pointer;
		background-color: #aeaeae;
		height: calc(100vh - 110px);
		border-radius: 6px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30px;
		text-align: center;
		line-height: 36.31px;
		padding: 0 10px;
	}
}

@media screen and (max-width: 1400px) {
	.container {
		padding: 0 300px;
	}
}

@media screen and (max-width: 1200px) {
	.container {
		padding: 0 300px;
	}
}

@media screen and (max-width: 1000px) {
	.container {
		padding: 0 200px;
	}
}

@media screen and (max-width: 800px) {
	.container {
		padding: 0 100px;
	}
}

@media screen and (max-width: 600px) {
	.container {
		padding: 0 50px;
	}
}

@media screen and (max-width: 400px) {
	.container {
		padding: 0 20px;
	}
}
</style>
