import { createApp } from 'vue'
import App from './App.vue'
import Player from './components/Player.vue'

const app = createApp(App)
app.component('Player', Player)
app.mount('#app')