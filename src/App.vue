<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from "vue"
import type { BoardGame, Log } from './types/types.d'

const games = ref<Array<BoardGame>>([]);
const logs = ref<Array<Log>>([]);
const isLoading = ref(false);
//const userID = ref();
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

onMounted(() => {
  isLoading.value=true;
  //const proxy='https://cors.bridged.cc/';
  //const proxy='https://cors-anywhere.herokuapp.com/';
  let collectionurl=`https://boardgamegeek.com/xmlapi2/collection?username=he1fire&stats=1&excludesubtype=boardgameexpansion`;
  axios.get(collectionurl)
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
        thumbnail: String(item.getElementsByTagName('thumbnail').length ? item.getElementsByTagName('thumbnail')[0].textContent : noImage),
        name: String(item.getElementsByTagName('name')[0].textContent),
        rank: String(item.getElementsByTagName('rank')[0].getAttribute('value')),
        numplays: String(item.getElementsByTagName('numplays')[0].textContent),
        rating: String(item.getElementsByTagName('rating')[0].getAttribute('value')),
        objectid: Number(item.getAttribute('objectid')),
      };
    });
    isLoading.value = false;
    let logurl=`https://boardgamegeek.com/xmlapi2/plays?username=he1fire&page=1`;
    axios.get(logurl)
    .then(response => {
      errorCode.value='';
      const parser=new DOMParser();
      const xmlDoc=parser.parseFromString(response.data, 'text/xml');
      const plays=xmlDoc.getElementsByTagName('play');
      if (xmlDoc.getElementsByTagName('error').length>0)
        errorCode.value=String(xmlDoc.getElementsByTagName('error')[0].getElementsByTagName('message')[0].textContent);
      logs.value=Array.from(plays).map(play => {
          const objectid = Number(play.getElementsByTagName('item')[0].getAttribute('objectid'));
          const game = games.value.find(x => x.objectid === objectid);
          if (!game) return null; // filter out logs with no matching game
          return {
            date: String(play.getAttribute('date')),
            comment: String(play.getElementsByTagName('comments')[0].textContent),
            objectid,
            game
          };
        })
        .filter((log): log is Log => log !== null);
      isLoading.value = false;
    }) 
    .catch(error => {
      console.error('로그 API 요청 실패:', error);
      errorCode.value='로그 API 요청 실패';
      isLoading.value=false;
    });
  })
  .catch(error => {
    console.error('컬렉션 API 요청 실패:', error);
    errorCode.value='컬렉션 API 요청 실패';
    isLoading.value=false;
  });
})
/**
  시작화면에서 닉네임 입력
  -> 있으면 다음화면으로 넘어가고 해당 닉네임 경로로 라우팅
  -> 없으면 에러창 + 그대로
  만약 이름 넣은 경로로 바로 들어오면 그때도 처리
  -- 일단 내것만 만들고 나중에 다른사람들도 쓸 수 있게 기능 추가하기
  탭 2개 넣기
  1.
  mygames 데이터베이스 받아옴
  썸네일 / 이름 / 랭크 / 난이도(가져옴) / 최소~최대인원 / 추천인원(가져옴) / 내평점 / 플레이횟수 / 코멘트 대충 이정도 넣으면 될듯
  썸네일, 이름 클릭시 해당 보드게임긱 페이지로 이동 가능하게
  https://boardgamegeek.com/xmlapi2/collection?username=he1fire&stats=1&excludesubtype=boardgameexpansion
  https://boardgamegeek.com/xmlapi2/thing?id=205059&stats=1
  2.
  로그 페이지 불러옴
  일자 / 썸네일 / 이름 / 내용 / 인원 / 위치 정도 넣으면 될듯
  여기서 썸네일, 이름 클릭시 해당 게임으로 필터걸어서 보여주기 - 점수 평균, 승리확률, 최소최대점수정도 보여주면 더 좋다
  마찬가지로 로그 클릭시 해당 로그로 이동?
  추가로 마작이랑 후루요니로그, 확장들 데이터 분석하는게 필요하긴함
  같이 게임한 사람 이런거 모아보는 기능도 있으면 좋을듯
  https://boardgamegeek.com/xmlapi2/plays?username=he1fire&page=1
  https://boardgamegeek.com/xmlapi2/plays?username=he1fire&id=205059
  최대한? 모바일 대응되게 ㅇㅇ
*/
</script>

<template>
<h2>보드게임 목록</h2>
<div v-if="isLoading">
  <p>로딩 중입니다...</p>
  <!-- 로딩바 컴포넌트 사용 가능 -->
</div>
<div v-else>
  <details>
    <summary>보드게임 목록</summary>
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
  </details>
  <details>
    <summary>보드게임 로그</summary>
    <div v-if="errorCode!==''">
      {{ errorCode }}
    </div>
    <li v-else v-for="log in logs" :key="log.objectid">
      <span>이름 : {{ log.game?.name || '알 수 없음' }} | </span>
      <span>날짜 : {{ log.date }} | </span>
      <div>코멘트 : {{ log.comment }} </div>
    </li>
  </details>
</div>
</template>

<style scoped>
</style>
