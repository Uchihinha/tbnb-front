import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import installElementPlus from './plugins/element';
import 'element-plus/lib/theme-chalk/index.css';

import { toCurrency } from './filters/currency';
import { toDatetime } from './filters/datetime';

import money from 'v-money';
import VueTheMask from 'vue-the-mask';

import titleMixin from './mixins/titleMixin';


const app = createApp(App);
installElementPlus(app);
app.use(router).mount('#app');

app.mixin(titleMixin);

app.use(money);

app.use(VueTheMask);

app.config.globalProperties.$filters = {
	toCurrency,
	toDatetime
};