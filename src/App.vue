<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from "vue"
import type { BoardGame } from './types/types.d';

const games = ref<Array<BoardGame>>([]);
const isLoading = ref(false);

const fetchGames = () => {
  isLoading.value = true;
  const url = 'https://boardgamegeek.com/xmlapi2/collection?username=he1fire&stats=1';
  axios.get(url)
    .then(response => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const items = xmlDoc.getElementsByTagName('item');
      games.value = Array.from(items).map(item => {
        return {
          objectid: Number(item.getAttribute('objectid')),
          name: String(item.getElementsByTagName('name')[0].textContent),
          //thumbnail: ''
          thumbnail: String(item.getElementsByTagName('thumbnail').length ? item.getElementsByTagName('thumbnail')[0].textContent : ''),
        };
      });
      isLoading.value = false;
    })
    .catch(error => {
      console.error('API 요청 실패:', error);
    });
}
//onMounted(fetchGames);
</script>

<template>
  <div>
    <h2>보드게임 목록</h2>
    <div v-if="isLoading">
      <p>로딩 중입니다...</p>
      <!-- 로딩바 컴포넌트 사용 가능 -->
    </div>
    <ul v-else>
      <li v-for="game in games" :key="game.objectid">
        <img v-if="game.thumbnail" :src="game.thumbnail" :alt="game.name" style="max-width: 100px; max-height: 100px;">
        <span>{{ game.name }}</span>
      </li>
    </ul>
    <button @click="fetchGames">목록 불러오기</button>
  </div>
</template>

<style scoped>
</style>
