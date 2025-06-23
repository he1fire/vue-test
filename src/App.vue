<script setup lang="ts">
import axios from 'axios';
import { ref } from "vue"
import type { BoardGame } from './types/types.d';

const games = ref<Array<BoardGame>>([]);
const isLoading = ref(false);

const fetchGames = () => {
  isLoading.value = true;
  const url = 'https://boardgamegeek.com/xmlapi2/collection?username=he1fire&stats=1&excludesubtype=boardgameexpansion';
  axios.get(url)
    .then(response => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const items = xmlDoc.getElementsByTagName('item');
      games.value = Array.from(items).map(item => {
        let noImage='https://cf.geekdo-images.com/zxVVmggfpHJpmnJY9j-k1w__itemrep/img/Py7CTY0tSBSwKQ0sgVjRFfsVUZU=/fit-in/246x300/filters:strip_icc()/pic1657689.jpg';
        return {
          objectid: Number(item.getAttribute('objectid')),
          name: String(item.getElementsByTagName('name')[0].textContent),
          thumbnail: String(item.getElementsByTagName('thumbnail').length ? item.getElementsByTagName('thumbnail')[0].textContent : noImage),
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
