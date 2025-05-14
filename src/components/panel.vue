<script>
export default {
  props: {
    currentWind: String,
    currentRound: Number,
    countRiichi: Number,
    countRenchan: Number,
  },
  emits: ['showModal'],
  data(){
    return {
    };
  },
  methods: {
    /**모달 창 켜기*/
    showModal(type, status){
      this.$emit('showModal', type, status);
    },
  }
};
</script>

<template>
<div class="container_mid" id='Mid'>
  <!-- 현재 라운드 -->
  <div class="now">
    {{ currentWind }} {{ currentRound }} 局
  </div>
  <!-- 현재 총 리치봉 -->
  <div class="riichi">
    <div class="riichi_stick_mini">
      <div class="circle" style="width:5px; height:5px;"></div>
    </div>
    <div>
      x {{ countRiichi }}
    </div>
  </div>
  <!-- 현재 연장봉 -->
  <div class="renjang">
    <div class="riichi_stick_mini">
      <div class="blackcircle" style="margin: auto 0px 5px 0px;visibility: hidden;"></div>
      <div class="blackcircle"></div>
      <div class="blackcircle" style="margin: auto 0px 3px 0px;"></div>
      <div class="blackcircle"></div>
      <div class="blackcircle" style="margin: auto 0px 3px 0px;"></div>
      <div class="blackcircle"></div>
      <div class="blackcircle" style="margin: auto 0px 3px 0px;"></div>
      <div class="blackcircle"></div>
      <div class="blackcircle" style="margin: auto 0px 3px 0px;"></div>
      <div class="blackcircle" style="margin: 5px 0px auto 0px; visibility: hidden;"></div>
    </div>
    <div>
      x {{ countRenchan }}
    </div>
  </div>
  <!-- 옵션 버튼 -->
  <div class="option"><!-- 화료함수 추가 -->
    옵션
  </div>
  <!-- 화료 버튼 -->
  <div class="win" @click="showModal('check_player_win')"><!-- 화료함수 추가 -->
    화료
  </div>
  <!-- 유국 버튼 -->
  <div class="draw" @click="showModal('choose_draw_kind')">
    유국
  </div>
</div>
</template>

<style scoped>
/* 정보창 위치*/
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
    "riichi renjang draw";
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
.renjang{
  grid-area: renjang;
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

/* 리치봉, 연장봉 그림 */
.riichi_stick_mini{
  border: 1px solid black;
  width: 50px;
  height: 10px;
  font-size: 0px;
  transform: rotate(-50deg) translate(-52px,-10px);
}
.circle{
  background-color:red;
  width:15px;
  height:15px;
  border-radius:50%;
  margin: 3px auto 3px auto;
}
.blackcircle{
  display: inline-block;
  background-color:black;
  width:3px;
  height:3px;
  border-radius:50%;
  margin: 3px 0px auto 0px;
}
</style>
