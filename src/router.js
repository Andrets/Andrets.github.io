import {createRouter, createWebHistory} from "vue-router";
import axios from "axios";
import Home from "./screens/Home.vue";
import Login from "./screens/Login.vue";
import Register from "./screens/Register.vue";
import Tests from "./screens/Tests.vue"
import Profile from "./screens/Profile.vue"
import { useApiStore } from "./stores/api.store.js";
import {onMounted} from "vue";


const routes = [
    {
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			requiresAuth: false
		}
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
		meta: {
			requiresAuth: false
		}
	},
	{
		path: '/tests',
		name: 'Tests',
		component: Tests,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/profile',
		name: 'Profile',
		component: Profile,
		meta: {
			requiresAuth: true
		},
	}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeResolve(async function(to, from, next) {
	const apiStore = useApiStore()
	if (to.meta.requiresAuth) {
		const response = await apiStore.checkLogin()
		if (!response) {
			next('/login')
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
