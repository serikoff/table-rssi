<template>
	<div>
		<a-table
			:bordered="true"
			:columns="columns"
			:dataSource="listUsers"
			@change="handleChange"
			:pagination="{ pageSize: 10 }"
			:loading="isLoading"
			:expandRowByClick="true"
			:rowKey="el => el.id"
		>
			<div slot="expandedRowRender" slot-scope="record" style="margin: 0">
				<RssiChart :record="record" />
			</div>
		</a-table>
	</div>
</template>

<script>
import RssiChart from './RssiChart';

export default {
	name: 'Table',
	components: {
		RssiChart,
	},
	props: {
		listUsers: {
			type: Array,
			required: true,
		},
		isLoading: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			filteredInfo: null,
			sortedInfo: null,
		};
	},
	computed: {
		columns() {
			let { sortedInfo } = this;
			sortedInfo = sortedInfo || {};
			const columns = [
				{
					title: 'First name',
					dataIndex: 'first_name',
					key: 'first_name',
					onFilter: (value, record) => record.first_name.includes(value),
					sorter: (a, b) =>
						a.first_name.toLowerCase() < b.first_name.toLowerCase() ? -1 : 1,
					sortOrder: sortedInfo.columnKey === 'first_name' && sortedInfo.order,
				},
				{
					title: 'Last name',
					dataIndex: 'last_name',
					key: 'last_name',
					sorter: (a, b) =>
						a.last_name.toLowerCase() < b.last_name.toLowerCase() ? -1 : 1,
					sortOrder: sortedInfo.columnKey === 'last_name' && sortedInfo.order,
				},
				{
					title: 'MAC adress',
					dataIndex: 'mac',
					key: 'mac',
					onFilter: (value, record) => record.mac.includes(value),
					sorter: (a, b) => (a.mac.replace(/-/g, '') < b.mac.replace(/-/g, '') ? -1 : 1),
					sortOrder: sortedInfo.columnKey === 'mac' && sortedInfo.order,
				},
				{
					title: 'Phone',
					dataIndex: 'phone',
					key: 'phone',
					onFilter: (value, record) => record.phone.includes(value),
					sorter: (a, b) =>
						a.phone.replace(/-|\(|\)/g, '') - b.phone.replace(/-|\(|\)/g, ''),
					sortOrder: sortedInfo.columnKey === 'phone' && sortedInfo.order,
				},
			];
			return columns;
		},
	},
	methods: {
		handleChange(pagination, filters, sorter) {
			this.sortedInfo = sorter;
		},
		clearAll() {
			this.sortedInfo = null;
		},
		setAgeSort() {
			this.sortedInfo = {
				order: 'descend',
				columnKey: 'age',
			};
		},
	},
};
</script>

<style lang="scss" scoped>
.table-operations {
	margin-bottom: 16px;
}

.table-operations > button {
	margin-right: 8px;
}
</style>
