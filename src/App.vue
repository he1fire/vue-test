<script>
import Player from './components/player.vue'
import Panel from './components/panel.vue'
import Modal from './components/modal.vue'
export default {
  components: {
    Player,
    Panel,
    Modal
  },
  data(){
    return {
      seats: ["Down", "Right", "Up", "Left"],
      winds: ["東", "南", "西", "北"],
      scores: [250, 250, 250, 250],
      scores_low: ["00", "00", "00", "00"],
      scores_change: [0, 0, 0, 0],
      scores_gap: [0, 0, 0, 0],
      riichi: [false, false, false, false],
      now_wind: "東",
      now_round: 1,
      cnt_riichi: 0,
      cnt_renjang: 0,
      round_status: "",
      opt_minusriichi: false,
      opt_roundmangan: false,
      modal: false,
      modal_contents: ""
    };
  },
  methods: {
    /**해당 위치의 리치 활성화/비활성화*/
    toggleActiveRiichi(seat){
      let idx=this.seats.indexOf(seat); // 위치 기준 인덱스 반환
      if (this.riichi[idx]===false){ //  리치 활성화
        if (this.scores[idx]>=10 || this.opt_minusriichi){ // 1000점 이상 있거나 음수리치가 가능하다면
          this.scores[idx]-=10;
          this.riichi[idx]=true;
          this.cnt_riichi++;
        }
        else{ // 리치를 걸수 없을 때
          this.showModal('점수가 모자라 리치를 걸 수 없습니다.');
        }
      }
      else{ // 리치 비활성화
        this.scores[idx]+=10;
        this.riichi[idx]=false;
        this.cnt_riichi--;
      }
    },
    /**모달 창 켜기*/
    showModal(x, status, scores_change=[]){
      this.modal_contents=x;
      this.round_status=status;
      this.scores_change=scores_change;
      this.modal=true;
    },
    /**모달 창 끄기*/
    hideModal(){
      this.modal_contents='';
      this.round_status='';
      this.scores_change=[0,0,0,0];
      this.modal=false;
    },
    /**국 결과값 처리*/
    saveRound(){
      for (let i=0;i<4;i++) // 리치봉 수거
        this.riichi[i]=false;
      // 옵션에서 롤백한 경우 처리
      for (let i=0;i<4;i++){ // 점수 배분및 기록
        if (this.scores_change[i]!==0){
          // 점수가 변했다면 점수변동 및 이펙트 출력
        }
        // 점수 기록창에 점수 기록
      }
      // 점수 기록창에 국+본장 기록
      if (this.round_status==='win'){ // 화료로 끝났다면
        // 친이 화료했는지 확인하고 아니라면 자리바꾸기
        // 친이 화료했다면 연장봉 추가하고 아니라면 연장봉 초기화
        this.cnt_riichi=0; // 리치봉 초기화
      }
      else if (this.round_status==='normal_draw'){ // 일반유국이라면
        // 친이 텐파이인지 확인하고 아니라면 자리바꾸기
        this.cnt_renjang++; // 연장봉 추가
      }
      else if (this.round_status==='special_draw'){ // 특수유국이라면
        this.cnt_renjang++; // 연장봉 추가
      }
      this.hideModal(); // 모달 창 끄기
    }
  }
};
</script>

<template>
<!-- 각 방향별 player 컴포넌트 생성 -->
<Player
  v-for="(_, i) in seats"
  :key="i"
  :seat="seats[i]"
  :wind="winds[i]"
  :score="scores[i]"
  :score_low="scores_low[i]"
  :score_change="scores_change[i]"
  :riichi="riichi[i]"
  @toggleActiveRiichi="toggleActiveRiichi"
/>
<!-- 중앙 panel 컴포넌트 생성 -->
<Panel
  :now_wind
  :now_round
  :cnt_riichi
  :cnt_renjang
  @showModal="showModal"
/>
<!-- modal 컴포넌트 생성 -->
<Modal
  v-if="modal"
  :modal_contents
  :scores_change
  @showModal="showModal"
  @hideModal="hideModal"
  @saveRound="saveRound"
/>
</template>

<style>
/* 전체 설정 */
*{
  margin: 0;
  -webkit-text-size-adjust:none;
}
html, body{
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  font-family: 'Noto Serif KR', serif;
  /* 드래그방지 */
  -ms-user-select: none; 
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

/* 가로모드 활성화 */
@media (orientation: portrait) {
	html {
		transform: rotate(-90deg);
		transform-origin: top left;
		position: absolute;
		top: 100%;
		left: 0;
		width: 100vh;
    height: 100vw;
	}
}
</style>
