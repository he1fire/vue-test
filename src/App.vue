<script setup lang="ts">
import axios from 'axios';
import { ref } from "vue";
import type { BoardGame } from './types/types.d';

const games = ref<Array<BoardGame>>([]);
const isLoading = ref(false);
const isLoggedIn = ref(false);
const userID = ref();
const userPassword = ref();

// BGG 로그인 함수
const loginToBGG = async (username: string, password: string) => {
  isLoading.value = true;
  try {
    // 브라우저에서는 withCredentials: true로 쿠키를 자동으로 저장
    await axios.post(
      '/api/login/api/v1',
      {
        credentials: { username, password }
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    );
    isLoggedIn.value = true;
    alert('로그인 성공!');
  } catch (error) {
    console.error('로그인 실패:', error);
    alert('로그인 실패!');
  } finally {
    isLoading.value = false;
  }
};

// 컬렉션 불러오기
const fetchGames = () => {
  if (!isLoggedIn.value) {
    alert('먼저 로그인해주세요!');
    return;
  }
  isLoading.value = true;
  const url = `/api/xmlapi2/collection?username=${userID.value}&stats=1&excludesubtype=boardgameexpansion`;
  axios.get(url, { withCredentials: true })
    .then(response => {
      const parser=new DOMParser();
      const xmlDoc=parser.parseFromString(response.data, 'text/xml');
      const items=xmlDoc.getElementsByTagName('item');
      games.value=Array.from(items).map(item => {
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
      isLoading.value = false;
    });
};

// 예시: 직접 로그인 버튼을 누르면 호출
// 실제로는 사용자 입력 폼을 만들어서 username, password를 받아야 합니다.
// 아래는 예시용이니, 실제로는 적절한 UI를 만들어 사용하세요.
const handleLogin = () => {
  if (userID.value && userPassword.value) {
    loginToBGG(userID.value, userPassword.value);
  }
};
</script>

<template>
  <h2>보드게임 목록</h2>
  <div v-if="!isLoggedIn">
    <input type="text" v-model="userID">
    <input type="password" v-model="userPassword">
    <button @click="handleLogin">BGG 로그인</button>
  </div>
  <div v-else>
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
