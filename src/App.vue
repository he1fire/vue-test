<script>
import player from './components/player.vue'
import panel from './components/panel.vue'
import modal from './components/modal.vue'
export default {
  components: {
    player,
    panel,
    modal
  },
  data(){
    return {
      seats: ["Down", "Right", "Up", "Left"], // 플레이어별 위치
      winds: ["東", "南", "西", "北"], // 플레이어별 현재 자풍
      scores: [250, 250, 250, 250], // 플레이어별 현재 점수 (100자리 이상)
      scores_low: [0, 0, 0, 0], // 플레이어별 현재 점수 (100자리 이하)
      scores_effect: [false, false, false, false], // 플레이어별 점수 변환 이펙트
      scores_change: [0, 0, 0, 0], // 플레이어별 변동 점수
      scores_gap: [0, 0, 0, 0], // 플레이어간 점수 차이
      riichi: [false, false, false, false], // 플레이어별 리치 유무
      win: [false, false, false, false], // 플레이어별 화료 유무
      lose: [false, false, false, false], // 플레이어별 방총 유무
      tenpai: [false, false, false, false], // 플레이어별 텐파이 유무
      now_wind: "東", // 현재 장풍
      now_round: 1, // 현재 국
      cnt_riichi: 0, // 현재 누적 리치봉
      cnt_renjang: 0, // 현재 누적 연장봉
      round_status: "", // 라운드 형태 - 론 쯔모 일반유국 특수유국
      opt_minusriichi: false, // 음수리치 옵션
      opt_roundmangan: false, // 절상만관 옵션
      modal: false, // 모달창 활성화
      modal_type: "", // 모달창 종류
    };
  },
  methods: {
    /**리치 활성화/비활성화*/
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
    /**바람 및 라운드 변경*/
    changeWindsAndRounds(){
      let all_winds="東南西北";
      let cnt=0;
      this.winds.unshift(this.winds.pop()); // 개인 바람 변경
      for (let i=0;i<all_winds.length;i++){
        if (this.now_wind===all_winds[i]) // 현재 라운드 계산
          cnt+=i*4;
      }
      cnt+=this.now_round; // 국 증가
      this.now_wind=all_winds[Math.floor((cnt%16)/4)]; // 현재 바람 수정
      this.now_round=cnt%4+1; // 현재 라운드 수정
    },
    /**점수 변동 효과*/
    changeScores(idx){
      let start_score=this.scores[idx]*100;
      let arr=[];
      for (let i=0;i<50;i++){ // 변경될 점수 사이를 50등분해서 저장
        arr[i]=start_score+(this.scores_change[idx]/50)*(i+1);
      }
      this.scores_effect[idx]=true;
      let timecnt=0;
      let repeat=setInterval(() => { // 시간에 따라 반복
        let x=Math.floor(arr[timecnt]/100), y=Math.abs(arr[timecnt]%100);
        this.scores[idx]=x // 100의 자리 변경
        this.scores_low[idx]=y // 10의자리 변경
        timecnt++;
        if (timecnt>=50){
          clearInterval(repeat);
          this.scores_effect[idx]=false;
        }
      }, 20); // 0.02초 * 50번 = 1초동안 실행
    },
    /**모달 창 켜기*/
    showModal(type, status, changed=[]){
      this.modal_type=type;
      this.round_status=status;
      for (let i=0;i<this.scores_change.length;i++)
        this.scores_change[i]=changed[i];
      this.modal=true;
    },
    /**모달 창 끄기*/
    hideModal(){
      this.modal_type='';
      this.round_status='';
      this.win=[false, false, false, false];
      this.lose=[false, false, false, false];
      this.tenpai=[false, false, false, false];
      this.modal=false;
    },
    /**화료 체크*/
    toggleCheckWin(idx){
      this.win[idx]=!this.win[idx]
    },
    /**방총 체크*/
    toggleCheckLose(idx){
      this.lose[idx]=!this.lose[idx]
    },
    /**텐파이 체크*/
    toggleCheckTenpai(idx){
      this.tenpai[idx]=!this.tenpai[idx]
    },
    /**일반유국 점수계산*/
    normalDraw(){
      let cnt_tenpai=0; // 총 텐파이 인원
      let changed=[0, 0, 0, 0]; // 변경되는 점수
      for (let i=0;i<this.seats.length;i++){
        if (this.tenpai[i]===true) // 텐파이 인원 세기
          cnt_tenpai++;
      }
      if (0<cnt_tenpai && cnt_tenpai<4){ //올텐파이나 올노텐이 아니라면
        for (let i=0;i<this.seats.length;i++){
          if (this.tenpai[i]===true) // 텐파이라면
            changed[i]=3000/cnt_tenpai; // 3000 나눠서 획득
          else
          changed[i]=-3000/(this.seats.length-cnt_tenpai); 
        }
      }
      this.showModal('show_score', 'normal_draw', changed);
    },
    /**국 결과값 처리*/
    saveRound(){
      for (let i=0;i<this.seats.length;i++) // 리치봉 수거
        this.riichi[i]=false;
      // 옵션에서 롤백한 경우 처리
      for (let i=0;i<this.seats.length;i++){ // 점수 배분및 기록
        if (this.scores_change[i]!==0)
          this.changeScores(i);
        // 점수 기록창에 점수 기록
      }
      // 점수 기록창에 국+본장 기록
      if (this.round_status==='win'){ // 화료로 끝났다면
        // 친이 화료했는지 확인하고 아니라면 자리바꾸기
        // 친이 화료했다면 연장봉 추가하고 아니라면 연장봉 초기화
        this.cnt_riichi=0; // 리치봉 초기화
      }
      else if (this.round_status==='normal_draw'){ // 일반유국이라면
        let chk_notenpai=false;
        for (let i=0;i<this.seats.length;i++){
          if (this.winds[i]==='東' && this.tenpai[i]===false){ // 친이 노텐인지 체크
            chk_notenpai=true;
            break;
          } 
        }
        if (chk_notenpai) // 친이 노텐이라면
          this.changeWindsAndRounds(); // 바람 및 라운드 변경
        this.cnt_renjang++; // 연장봉 추가
      }
      else if (this.round_status==='special_draw'){ // 특수유국이라면
        this.cnt_renjang++; // 연장봉 추가
      }
      this.hideModal(); // 모달 창 끄기
    },
  }
};
</script>

<template>
<!-- 각 방향별 player 컴포넌트 생성 -->
<player
  v-for="(_, i) in seats"
  :key="i"
  :seat="seats[i]"
  :wind="winds[i]"
  :score="scores[i]"
  :score_low="scores_low[i]"
  :score_effect="scores_effect[i]"
  :score_change="scores_change[i]"
  :scores_gap="scores_gap[i]"
  :riichi="riichi[i]"
  @toggleActiveRiichi="toggleActiveRiichi"
/>
<!-- 중앙 panel 컴포넌트 생성 -->
<panel
  :now_wind
  :now_round
  :cnt_riichi
  :cnt_renjang
  @showModal="showModal"
/>
<!-- modal 컴포넌트 생성 -->
<modal
  v-if="modal"
  :scores_change
  :win
  :lose
  :tenpai
  :round_status
  :modal_type
  @showModal="showModal"
  @hideModal="hideModal"
  @toggleCheckWin="toggleCheckWin"
  @toggleCheckLose="toggleCheckLose"
  @toggleCheckTenpai="toggleCheckTenpai"
  @normalDraw="normalDraw"
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
