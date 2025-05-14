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
      scoresHigh: [250, 250, 250, 250], // 플레이어별 현재 점수 (100자리 이상)
      scoresLow: [0, 0, 0, 0], // 플레이어별 현재 점수 (100자리 이하)
      isEffect: [false, false, false, false], // 플레이어별 점수 변환 이펙트
      scoresEffect: [0, 0, 0, 0], // 플레이어별 이펙트 점수
      scoresDiff: [0, 0, 0, 0], // 플레이어별 변동 점수
      scores_gap: [0, 0, 0, 0], // 플레이어간 점수 차이
      names: ["▼", "▶", "▲", "◀"], // 플레이어별 이름
      winner: 0, // 현재 점수 입력하는 플레이어
      score_fan: 0, // 현재 점수 (판)
      score_bu: 2, // 현재 점수 (부)
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
        if (this.scoresHigh[idx]>=10 || this.opt_minusriichi){ // 1000점 이상 있거나 음수리치가 가능하다면
          this.scoresHigh[idx]-=10;
          this.riichi[idx]=true;
          this.cnt_riichi++;
        }
        else{ // 리치를 걸수 없을 때
          this.showModal('점수가 모자라 리치를 걸 수 없습니다.');
        }
      }
      else{ // 리치 비활성화
        this.scoresHigh[idx]+=10;
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
      let start_score=this.scoresHigh[idx]*100;
      let arr=[];
      for (let i=0;i<50;i++){ // 변경될 점수 사이를 50등분해서 저장
        arr[i]=start_score+(this.scoresDiff[idx]/50)*(i+1);
      }
      this.isEffect[idx]=true;
      this.scoresEffect[idx]=this.scoresDiff[idx];
      let timecnt=0;
      let repeat=setInterval(() => { // 시간에 따라 반복
        let x=Math.floor(arr[timecnt]/100), y=Math.abs(arr[timecnt]%100);
        this.scoresHigh[idx]=x // 100의 자리 변경
        this.scoresLow[idx]=y // 10의자리 변경
        timecnt++;
        if (timecnt>=50){
          clearInterval(repeat);
          this.isEffect[idx]=false;
          this.scoresEffect=[0,0,0,0];
        }
      }, 20); // 0.02초 * 50번 = 1초동안 실행
    },
    /**모달 창 켜기*/
    showModal(type, status){
      this.modal_type=type;
      this.round_status=status;
      this.modal=true;
    },
    /**모달 창 끄기*/
    hideModal(){
      this.modal_type='';
      this.round_status='';
      this.scoresDiff=[0,0,0,0];
      this.winner=-1;
      this.score_fan=0;
      this.score_bu=2;
      this.win=[false, false, false, false];
      this.lose=[false, false, false, false];
      this.tenpai=[false, false, false, false];
      this.modal=false;
    },
    /**화료, 방총, 텐파이 체크*/
    toggleCheckStatus(idx, status){
      if (status==='win') // 화료 체크
        this.win[idx]=!this.win[idx];
      else if (status==='lose'){ // 방총 체크
        if (this.win[idx])// 화료한 사람이랑 겹치는 경우 스킵
          return;
        if (!this.lose[idx]){ // 방총당한 사람을 바꾸는 경우
          for (let i=0;i<this.lose.length;i++){
            if (i!==idx) // 자신이 아닌 사람들의 체크를 해제
              this.lose[i]=false;
          }
        }
        this.lose[idx]=!this.lose[idx];
      }
      else if (status==='tenpai') // 텐파이 체크
        this.tenpai[idx]=!this.tenpai[idx];
      else if (status==='fan'){ // 판 체크
        if (idx>=9 && this.score_fan===idx) // 역만일경우 처리
          {this.score_fan<14 ? this.score_fan++ : this.score_fan=9;}
        else
          this.score_fan=idx;
      }
      else if (status==='bu') // 부 체크
        this.score_bu=idx;
    },
    /**화료 및 방총 불가능한 경우 반환*/
    checkInvalidStatus(){
      let cnt_win=0, cnt_lose=0;
      for (let i=0;i<this.win.length;i++){
        if (this.win[i]===true) // 화료 인원 세기
          cnt_win++;
        if (this.lose[i]===true) // 방총 인원 세기
          cnt_lose++;
      }
      if (cnt_win===0){ // 화료한 사람이 없음 (불가능한 경우)
        this.showModal('화료한 사람이 선택되지 않았습니다.');
        return;
      }
      else if (cnt_win===4){ // 화료한 사람이 4명임 (불가능한 경우)
        this.showModal('화료한 사람이 4명일 수 없습니다.');
        return;
      }
      else if (cnt_win!==1 && cnt_lose===0) { // 2명 이상 화료했는데 쯔모임 (불가능한 경우)
        this.showModal('쯔모한 사람이 2명 이상일 수 없습니다.');
        return;
      }
      if (!cnt_lose){ // 쯔모
        for (let i=0;i<this.win.length;i++){
          if (this.win[i]===true) // 승자 찾아서 저장
            this.winner=i;
        }
        this.showModal('check_score', 'tsumo');
      }
      else{ // 론
        //다가화 처리하는 코드
        //this.showModal('check_score', 'ron');
      }
    },
    /**실제 점수계산후 반환*/
    calculateScore(who){
      let arr_fan= [1, 2, 3, 4, 5, 6, 8, 11, 13, 13, 14, 15, 16, 17, 18];
      let arr_bu= [20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110];
      let arr_score=[2000,3000,3000,4000,4000,4000,6000,6000,8000,8000,16000,24000,32000,40000,48000]; // 만관 이상 인당 점수
      let fan=arr_fan[this.score_fan], bu=arr_bu[this.score_bu];
      let ret=0, chin_score=0, score=0;
      if ((fan===3 && bu>=70) || (fan===4 && bu>=40)) // 3판 70부, 4판 40부 이상이면 만관
        fan=5;
      if (((fan===3 && bu>=60) || (fan===4 && bu>=30)) && this.opt_roundmangan) // 절상만관시 3판 60부, 4판 30부 인정
        fan=5;
      if (5<=fan)
        chin_score=score=arr_score[fan-5]; // 만관 이상이면 배열 참조
      else
        chin_score=score=bu*Math.pow(2,fan+2); // 아니면 점수 계산식으로 계산
      if (this.round_status==='ron'){ // 론일 때
        if (this.winds[this.winner]==='東') // 친이라면 6배
          score*=6;
        else // 자라면 4배
          score*=4;
        score=Math.ceil(score/100)*100;
        ret=score;
      }
      else if (this.round_status==='tsumo'){ // 쯔모일 때
        chin_score*=2; // 친이라면 2배
        chin_score=Math.ceil(chin_score/100)*100;
        score=Math.ceil(score/100)*100;
        if (this.winds[this.winner]==='東'){ // 이긴사람이 친이라면
          if (who===this.winner) // 이겼다면 3배
            ret=chin_score*3;
          else // 졌다면 그대로
            ret=chin_score;
        }
        else{ // 이긴사람이 자라면
          if (who===this.winner) // 내가 이겼다면
            ret=chin_score+score*2;
          else if (this.winds[who]==='東') // 내가 친이라면 
            ret=chin_score;
          else
            ret=score;
        }
      }
      return ret;
    },
    /**화료 점수계산*/
    calculateWin(){
      if (this.round_status==='tsumo'){
        //책임지불 설정
        for (let i=0;i<this.seats.length;i++){
          if (i===this.winner){
            this.scoresDiff[i]+=this.calculateScore(i);
            this.scoresDiff[i]+=this.cnt_riichi*1000;
            this.scoresDiff[i]+=this.cnt_renjang*300;
          }
          else{
            this.scoresDiff[i]-=this.calculateScore(i);
            this.scoresDiff[i]-=this.cnt_renjang*100;
          }
        }
        this.showModal('show_score', 'tsumo');
      }
    },
    /**유국 점수계산*/
    calculateDraw(){
      let cnt_tenpai=0; // 총 텐파이 인원
      for (let i=0;i<this.tenpai.length;i++){
        if (this.tenpai[i]===true) // 텐파이 인원 세기
          cnt_tenpai++;
      }
      if (0<cnt_tenpai && cnt_tenpai<4){ //올텐파이나 올노텐이 아니라면
        for (let i=0;i<this.tenpai.length;i++){
          if (this.tenpai[i]===true) // 텐파이라면
            this.scoresDiff[i]=3000/cnt_tenpai; // 3000 나눠서 획득
          else
            this.scoresDiff[i]=-3000/(this.seats.length-cnt_tenpai); 
        }
      }
      this.showModal('show_score', 'normal_draw');
    },
    /**국 결과값 처리*/
    saveRound(){
      for (let i=0;i<this.riichi.length;i++) // 리치봉 수거
        this.riichi[i]=false;
      // 옵션에서 롤백한 경우 처리
      for (let i=0;i<this.scoresDiff.length;i++){ // 점수 배분및 기록
        if (this.scoresDiff[i]!==0)
          this.changeScores(i);
        // 점수 기록창에 점수 기록
      }
      // 점수 기록창에 국+본장 기록
      if (this.round_status==='tsumo' || this.round_status==='ron'){ // 화료로 끝났다면
        // 친이 화료했는지 확인하고 아니라면 자리바꾸기
        // 친이 화료했다면 연장봉 추가하고 아니라면 연장봉 초기화
        this.cnt_riichi=0; // 리치봉 초기화
      }
      else if (this.round_status==='normal_draw'){ // 일반유국이라면
        let chk_notenpai=false;
        for (let i=0;i<this.winds.length;i++){
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
  :scoreHigh="scoresHigh[i]"
  :scoreLow="scoresLow[i]"
  :isEffect="isEffect[i]"
  :scoreEffect="scoresEffect[i]"
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
  :scoresDiff
  :names
  :winner
  :score_fan
  :score_bu
  :win
  :lose
  :tenpai
  :round_status
  :modal_type
  @showModal="showModal"
  @hideModal="hideModal"
  @toggleCheckStatus="toggleCheckStatus"
  @checkInvalidStatus="checkInvalidStatus"
  @calculateWin="calculateWin"
  @calculateDraw="calculateDraw"
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
