import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import OneSymbolVue from './components/Symbols/OneSymbol.vue';
import TwoSymbolVue from './components/Symbols/TwoSymbol.vue';
import CrossSymbolVue from './components/Symbols/CrossSymbol.vue';
import CircleSymbolVue from './components/Symbols/CircleSymbol.vue';

const app = createApp(App);
app.component("OneSymbol", OneSymbolVue)
app.component("TwoSymbol", TwoSymbolVue)
app.component("CrossSymbol", CrossSymbolVue)
app.component("CircleSymbol", CircleSymbolVue)
app.use(router).mount('#app')