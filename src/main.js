import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css';
import reveal from './directives/reveal'

const app = createApp(App)

app.use(router)
app.directive('reveal', reveal)
app.mount('#app')
