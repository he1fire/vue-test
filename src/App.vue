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
      opt_minusriichi: false,
      opt_roundmangan: false,
      RyuukyokuModal: false
    };
  },
  methods: {
    activeRiichi(seat){ // 해당 위치의 리치 활성화/비활성화
      let idx=this.seats.indexOf(seat); // 위치 기준 인덱스 반환
      if (this.riichi[idx]===false){ //  리치 활성화
        if (this.scores[idx]>=10 || this.opt_minusriichi){ // 1000점 이상 있거나 음수리치가 가능하다면
          this.scores[idx]-=10;
          this.riichi[idx]=true;
          this.cnt_riichi++;
        }
        else{
          //modal 창 활성화후 점수가 없다고 알려주기
        }
      }
      else{ // 리치 비활성화
        this.scores[idx]+=10;
        this.riichi[idx]=false;
        this.cnt_riichi--;
      }
    },
    showModal(x){
      if (x==="Ryuukyoku")
        this.RyuukyokuModal=true;
    },
    hideModal(x){
      if (x==="Ryuukyoku")
        this.RyuukyokuModal=false;
    }
  }
};
</script>

<template>
<Player
  v-for="(_, i) in seats"
  :key="i"
  :seat="seats[i]"
  :wind="winds[i]"
  :score="scores[i]"
  :score_low="scores_low[i]"
  :score_change="scores_change[i]"
  :riichi="riichi[i]"
  @activeRiichi="activeRiichi"
/>
<Panel
  :now_wind
  :now_round
  :cnt_riichi
  :cnt_renjang
  @showModal="showModal"
/>
<Modal
  v-if="RyuukyokuModal"
  @hideModal="hideModal"
/>
</template>

<style>
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
</style>
