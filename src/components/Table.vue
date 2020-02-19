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
			<div
				slot="filterDropdown"
				slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
				style="padding: 8px"
			>
				<a-input
					v-ant-ref="c => (searchInput = c)"
					:placeholder="`Search ${column.title}`"
					:value="selectedKeys[0]"
					@change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
					@pressEnter="() => handleSearch(selectedKeys, confirm)"
					style="width: 188px; margin-bottom: 8px; display: block;"
				/>
				<a-button
					type="primary"
					@click="() => handleSearch(selectedKeys, confirm)"
					icon="search"
					size="small"
					style="width: 90px; margin-right: 8px"
					>Search
				</a-button>
				<a-button
					@click="() => handleReset(clearFilters)"
					size="small"
					style="width: 90px"
					>Reset
				</a-button>
			</div>
			<a-icon
				slot="filterIcon"
				slot-scope="filtered"
				type="search"
				:style="{ color: filtered ? '#108ee9' : undefined }"
			/>
			<template slot="customRender" slot-scope="text">
				<span v-if="searchText">
					<template
						v-for="(fragment, i) in text
							.toString()
							.split(new RegExp(`(((?!${searchText})|)${searchText})`, 'i'))"
					>
						<mark
							v-if="fragment.toLowerCase() === searchText.toLowerCase()"
							:key="i"
							class="highlight"
							>{{ fragment }}</mark
						>
						<template v-else>{{ fragment }}</template>
					</template>
				</span>
				<template v-else>{{ text }}</template>
			</template>
			<div slot="expandedRowRender" slot-scope="record" style="margin: 0">
				<RssiChart :record="record" />
			</div>
		</a-table>
	</div>
</template>

<script>
import { RssiChart } from './';

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
			searchText: '',
			searchInput: null,
			filteredInfo: null,
			sortedInfo: null,
		};
	},
	computed: {
		columns() {
			const { getColumnProps } = this;
			const columns = [
				{
					title: 'First name',
					sorter: (a, b) =>
						a.first_name.toLowerCase() < b.first_name.toLowerCase() ? -1 : 1,
					...getColumnProps('first_name'),
				},
				{
					title: 'Last name',
					sorter: (a, b) =>
						a.last_name.toLowerCase() < b.last_name.toLowerCase() ? -1 : 1,
					...getColumnProps('last_name'),
				},
				{
					title: 'MAC adress',
					sorter: (a, b) => (a.mac.replace(/-/g, '') < b.mac.replace(/-/g, '') ? -1 : 1),
					...getColumnProps('mac'),
				},
				{
					title: 'Phone',
					sorter: (a, b) =>
						a.phone.replace(/-|\(|\)/g, '') - b.phone.replace(/-|\(|\)/g, ''),
					...getColumnProps('phone'),
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
		handleSearch(selectedKeys, confirm) {
			confirm();
			this.searchText = selectedKeys[0];
		},
		handleReset(clearFilters) {
			clearFilters();
			this.searchText = '';
		},
		getColumnProps(dataIndex) {
			let { sortedInfo } = this;
			sortedInfo = sortedInfo || {};
			return {
				dataIndex,
				key: dataIndex,
				scopedSlots: {
					filterDropdown: 'filterDropdown',
					filterIcon: 'filterIcon',
					customRender: 'customRender',
				},
				onFilter: (value, record) =>
					record[dataIndex]
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase()),
				onFilterDropdownVisibleChange: visible => {
					if (visible) {
						setTimeout(() => {
							this.searchInput.focus();
						});
					}
				},
				sortOrder: sortedInfo.columnKey === dataIndex && sortedInfo.order,
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
