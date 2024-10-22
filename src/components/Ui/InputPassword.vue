<template>
	<Input :label="label" v-model:inputData="inputData" :placeholder="placeholder" :showError="showError"
		:textError="textError" :type="passType">
	<span class="toggle-password" @click="changePassType">
		<OffPass v-if="!showPassword" />
		<OnPass v-else />
	</span>
	</Input>
</template>

<script setup lang="ts">
import Input from './Input.vue';
import OffPass from '@/components/Icons/OffPass.vue'
import OnPass from '@/components/Icons/OnPass.vue'
import { ref, computed } from 'vue';

defineProps({
	label: {
		type: String,
		required: true
	},
	placeholder: {
		type: String,
		default: 'Введите значение',
	},
	maxLength: {
		type: Number,
		default: 100,
	},
	showError: {
		type: Boolean,
		default: false,
	},
	textError: {
		type: String,
	},
})

const inputData = defineModel('inputData')

const showPassword = ref(false)
const passType = computed(() => {
	return showPassword.value ? "text" : "password";
})
const changePassType = () => {
	showPassword.value = !showPassword.value;
}
</script>

<style scoped lang="scss">
.toggle-password {
	color: $green-light;
	position: absolute;
	right: 28px;
	top: 50%;
	margin-top: -8px;
	line-height: 16px;
}
</style>
