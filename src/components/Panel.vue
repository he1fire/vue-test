<script>
export default {
  props: {
    now_wind: String,
    now_round: Number,
    cnt_riichi: Number,
    cnt_renjang: Number,
  },
  data(){
    return {
    };
  },
  methods: {

  }
};
</script>

<template>
<div class="container_mid" id='Mid'>
    <div class="now">
      {{ now_wind }} {{ now_round }} 局
    </div>
    <div class="riichi">
      <div class="riichi_stick_mini">
        <div class="circle" style="width:5px; height:5px;"></div>
      </div>  
      <div>
        x {{ cnt_riichi }}
      </div>
    </div>
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
    <div class="ron" onclick="ron1();">
      론
    </div>
    <div class="tsumo" onclick="tsumo1();">
      쯔모
    </div>
    <div class="ryuukyoku" onclick="ryuukyoku1();">
      유국
    </div>
  </div>
</template>

<style scoped>
#Mid{
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
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
