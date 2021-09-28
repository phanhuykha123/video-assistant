<template>
	<div class="form-container">
		<form action="" class="form-register" @submit.prevent="handleLogin">
			<el-row>
				<img src="../assets/welcome.png" alt="" class="form-image" />
				<el-col :span="24">
					<el-input :placeholder="placeholder[userState.language]" v-model="name"></el-input>
				</el-col>
				<el-button type="primary" style="width: 100%; margin: 20px 0" @click="handleLogin">{{
					buttons.login[userState.language]
				}}</el-button>
				<el-button type="primary" style="width: 100%; margin: 5px 0" @click="handleGoBack">
					{{ buttons.back[userState.language] }}
				</el-button>

				<el-col :span="24"> </el-col>
			</el-row>
		</form>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				name: '',
				buttons: {
					login: {
						vi: 'Đăng nhập',
						en: 'Login',
					},
					back: {
						vi: 'Quay lại',
						en: 'Go Back',
					},
				},
				placeholder: {
					vi: 'Vui lòng nhập tên của bạn',
					en: 'Insert your name to begin',
				},
			};
		},
		computed: {
			...mapGetters({
				node: 'chat/node',
				userState: 'chat/userState',
			}),
		},
		methods: {
			...mapActions({
				register: 'chat/register',
			}),
			handleLogin() {
				this.register(this.name);
			},
			handleGoBack() {
				this.$store.dispatch('chat/getNode', {
					event: 'goto',
					data: `conversation_start`,
				});
			},
		},
	};
</script>

<style scoped>
	.form-container {
		position: relative;
		height: 100%;
	}

	.form-image {
		max-width: 100%;
	}

	.form-register {
		width: 80%;
		position: absolute;
		left: 50%;
		top: 40%;
		transform: translate(-50%, -50%);
	}
</style>
