<script setup></script>
<template>
	<header>
		<ol>
			<li>
				<span class="pi pi-fw pi-home"></span
				><RouterLink to="/">Главная</RouterLink>
			</li>
			<li>
				<span class="pi pi-fw pi-plus"></span
				><RouterLink to="/tests">Новое тестирование</RouterLink>
			</li>
			<li>
				<span class="pi pi-user"></span
				><RouterLink to="/profile">Профиль</RouterLink>
			</li>
		</ol>
	</header>
</template>
<style scoped>
header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 60px;
	background-color: #d9d9d9;
	padding: 0 250px;
}

a {
	font-size: 20px;
	line-height: 25px;
}

ol {
	display: grid;
	grid-template-columns: 4fr repeat(2, 1fr);
	align-items: center;
	width: 100%;
	padding: 0;
	margin: 0;
}

ol > li {
	display: flex;
	align-items: center;
	gap: 2px;
	> span {
		font-size: 20px;
		padding-top: 1px;
	}
}

ol > li:nth-last-child(1) {
	justify-self: end;
}
ol > li:nth-last-child(2) {
	justify-self: center;
}
ol > li:nth-last-child(3) {
	justify-self: start;
}

li {
	display: flex;
	align-items: center;
	gap: 2px;
}
</style>
