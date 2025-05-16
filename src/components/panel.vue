<script>
import graphics from './graphics.vue'
export default {
  components: {
    graphics,
  },
  props: {
    currentWind: String,
    currentRound: Number,
    countRiichi: Number,
    countRenchan: Number,
  },
  emits: ['show-modal', 'roll-dice'],
  data(){
    return {
    };
  },
  methods: {
    /**모달 창 켜기*/
    showModal(type, status){
      this.$emit('show-modal', type, status);
    },
    /**주사위 굴리기*/
    rollDice(){
      this.$emit('roll-dice');
    },
  }
};
</script>

<template>
<div class="container_mid" id='Mid'>
  <!-- 현재 라운드 -->
  <div class="now" @click="showModal('roll_dice'), rollDice()">
    {{ currentWind }} {{ currentRound }} 局
  </div>
  <!-- 현재 총 리치봉 -->
  <div class="riichi">
    <graphics kind="riichiStickMini"/>
    <span>x {{ countRiichi }}</span>
  </div>
  <!-- 현재 연장봉 -->
  <div class="renchan">
    <graphics kind="renchanStickMini"/>
    <span>x {{ countRenchan }}</span>
  </div>
  <!-- 옵션 버튼 -->
  <div class="option"><!-- 옵션함수 추가 -->
    옵션
  </div>
  <!-- 화료 버튼 -->
  <div class="win" @click="showModal('check_player_win')">
    화료
  </div>
  <!-- 유국 버튼 -->
  <div class="draw" @click="showModal('choose_draw_kind')">
    유국
  </div>
</div>
</template>

<style scoped>
/* 정보창 위치 */
#Mid{
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 정보창 */
.container_mid{
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(3, 150px);
  grid-template-areas: 
    "now now option"
    "now now win"
    "riichi renchan draw";
  position: fixed;
  text-align: center;
  font-size: 40px;
}
.now{
  grid-area: now;
  font-size: 70px;
}
.riichi{
  grid-area: riichi;
  margin: 0 auto 0 auto;
  transform: translate(20px,-10px);
}
.renchan{
  grid-area: renchan;
  margin: auto;
  transform: translate(20px,-10px);
}
.option{
  grid-area: option;
}
.win{
  grid-area: win;
}
.draw{
  grid-area: draw;
}
</style>
