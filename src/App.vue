<script setup lang="ts">
import axios from 'axios'
import { ref } from "vue"
import type { BoardGame } from './types/types.d'

const games = ref<Array<BoardGame>>([]);
const isLoading = ref(false);
const userID = ref();
//const userPassword = ref();
const errorCode = ref('');

// BGG 로그인 함수
// const loginToBGG = async (username: string, password: string) => {
//   isLoading.value = true;
//   try {
//     // 브라우저에서는 withCredentials: true로 쿠키를 자동으로 저장
//     await axios.post(
//       '/api/login/api/v1',
//       {
//         credentials: { username, password }
//       },
//       {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: true
//       }
//     );
//     isLoggedIn.value = true;
//     alert('로그인 성공!');
//   } catch (error) {
//     console.error('로그인 실패:', error);
//     alert('로그인 실패!');
//   } finally {
//     isLoading.value = false;
//   }
// };

const fetchGames = () => {
  isLoading.value=true;
  //const proxy='https://cors.bridged.cc/';
  //const proxy='https://cors-anywhere.herokuapp.com/';
  const url=`https://boardgamegeek.com/xmlapi2/collection?username=${userID.value}&stats=1&excludesubtype=boardgameexpansion`;
  axios.get(url)
    .then(response => {
      errorCode.value='';
      const parser=new DOMParser();
      const xmlDoc=parser.parseFromString(response.data, 'text/xml');
      const items=xmlDoc.getElementsByTagName('item');
      if (xmlDoc.getElementsByTagName('error').length>0)
        errorCode.value=String(xmlDoc.getElementsByTagName('error')[0].getElementsByTagName('message')[0].textContent);
      games.value=Array.from(items).map(item => {
        let noImage='https://cf.geekdo-images.com/zxVVmggfpHJpmnJY9j-k1w__itemrep/img/Py7CTY0tSBSwKQ0sgVjRFfsVUZU=/fit-in/246x300/filters:strip_icc()/pic1657689.jpg';
        return {
          // 썸네일 이름 랭크 플레이횟수 내평점 보드게임정보
          thumbnail: String(item.getElementsByTagName('thumbnail').length ? item.getElementsByTagName('thumbnail')[0].textContent : noImage),
          name: String(item.getElementsByTagName('name')[0].textContent),
          rank: String(item.getElementsByTagName('rank')[0].getAttribute('value')),
          numplays: String(item.getElementsByTagName('numplays')[0].textContent),
          rating: String(item.getElementsByTagName('rating')[0].getAttribute('value')),
          objectid: Number(item.getAttribute('objectid')),
        };
      });
      isLoading.value = false;
    })
    .catch(error => {
      console.error('API 요청 실패:', error);
      errorCode.value='API 요청 실패';
      isLoading.value=false;
    });
}
//onMounted(fetchGames);
</script>

<template>
<h2>보드게임 목록</h2>
<input type="text" v-model="userID">
<button @click="fetchGames">목록 불러오기</button>
<div v-if="isLoading">
  <p>로딩 중입니다...</p>
  <!-- 로딩바 컴포넌트 사용 가능 -->
</div>
<div v-else>
  <div v-if="errorCode!==''">
    {{ errorCode }}
  </div>
  <li v-else v-for="game in games" :key="game.objectid">
    <img v-if="game.thumbnail" :src="game.thumbnail" :alt="game.name" style="max-width: 100px; max-height: 100px;">
    <span>이름 : {{ game.name }} | </span>
    <span>순위 : {{ game.rank }} | </span>
    <span>플레이 횟수 : {{ game.numplays }} | </span>
    <span>내 평점: {{ game.rating }} | </span>
  </li>
</div>
</template>

<style scoped>
</style>
