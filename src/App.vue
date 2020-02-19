<template>
	<div id="app">
		<Table :listUsers="listUsers" :isLoading="isLoading" />
	</div>
</template>

<script>
import { Table } from './components/';
import axios from 'axios';

axios.defaults.baseURL = window.location.origin;

export default {
	name: 'App',
	components: {
		Table,
	},
	data: () => ({
		listUsers: [],
		isLoading: false,
	}),
	mounted() {
		this.isLoading = true;
		axios
			.get('https://cors-anywhere.herokuapp.com/https://rssi.wmrk.tk/', {
				headers: {
					accept: 'application/json',
				},
			})
			.then(({ data }) => {
				this.listUsers = Object.keys(data).map(id => ({ id, ...data[id] }));
				this.isLoading = false;
				console.log(this.listUsers);
			})
			.catch(err => {
				this.isLoading = false;
				console.log(err);
			});
	},
};
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	padding: 20px;
	.ant-table-expanded-row {
		td {
			padding: 0;
			padding-top: 30px;
			padding-right: 20px;
		}
	}
}
</style>
