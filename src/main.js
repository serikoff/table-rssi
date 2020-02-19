import Vue from 'vue';
import App from './App.vue';

import { Table, Input, Icon, Button } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

Vue.component(Table.name, Table);
Vue.component(Input.name, Input);
Vue.component(Icon.name, Icon);
Vue.component(Button.name, Button);

new Vue({
	render: h => h(App),
}).$mount('#app');
