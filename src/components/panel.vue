<script>
export default {
  props: {
    now_wind: String,
    now_round: Number,
    cnt_riichi: Number,
    cnt_renjang: Number,
  },
  emits: ['showModal'],
  data(){
    return {
    };
  },
  methods: {
    showModal(x, status, change=[]){
      this.$emit('showModal', x, status, change);
    },
  }
};
</script>

<template>
<div class="container_mid" id='Mid'>
  <!-- 현재 라운드 -->
  <div class="now">
    {{ now_wind }} {{ now_round }} 局
  </div>
  <!-- 현재 총 리치봉 -->
  <div class="riichi">
    <div class="riichi_stick_mini">
      <div class="circle" style="width:5px; height:5px;"></div>
    </div>
    <div>
      x {{ cnt_riichi }}
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
      x {{ cnt_renjang }}
    </div>
  </div>
  <!-- 론 버튼 -->
  <div class="ron"><!-- 론함수 추가 -->
    론
  </div>
  <!-- 쯔모 버튼 -->
  <div class="tsumo"><!-- 쯔모함수 추가 -->
    쯔모
  </div>
  <!-- 유국 버튼 -->
  <div class="ryuukyoku" @click="showModal('choose_draw')"><!-- 유국함수 추가 -->
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
    "now now ron"
    "now now tsumo"
    "riichi renjang ryuukyoku";
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
.ron{
  grid-area: ron;
}
.tsumo{
  grid-area: tsumo;
}
.ryuukyoku{
  grid-area: ryuukyoku;
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
