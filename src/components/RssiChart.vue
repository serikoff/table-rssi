<template>
	<div :id="`chart-container_${record.id}`" />
</template>

<script>
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';

export default {
	name: 'RssiChart',
	props: {
		record: {
			type: Object,
			required: true,
		},
	},
	mounted() {
		const {
			renderChart,
			record: { id, signals },
		} = this;
		renderChart({ id, signals });
	},
	methods: {
		renderChart({ id, signals }) {
			const dv = new DataSet.View().source(signals);
			dv.transform({
				type: 'fold',
				fields: ['rssi'],
				key: 'type',
				value: 'value',
			});
			const chart = new G2.Chart({
				container: `chart-container_${id}`,
				forceFit: true,
				height: 400,
			});
			chart.source(dv, {
				value: {
					formatter(val) {
						return `-${val + 100}`;
					},
					range: [1, 0],
				},
				ts: {
					type: 'time',
					nice: false,
					mask: 'HH:mm:ss',
					range: [0, 1],
				},
			});
			chart.tooltip({
				crosshairs: true,
			});
			chart
				.line()
				.position('ts*value')
				.color('type')
				.size(2)
				.shape('hv');
			chart.render();
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
