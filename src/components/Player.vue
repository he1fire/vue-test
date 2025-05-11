<script>
export default {
  props:["who", "wind", "score", "score_low", "score_change", "riichi"],
  data(){
    return {
    };
  },
};
</script>

<template>
<div class="container" :id=who>
  <div class="riichi_stick" id="DownPerson_Riichi">
    <div class="circle"></div>
  </div>
  <div class="wind" :style="{ color: who === 'DownPerson' ? 'red' : '' }">
    <span>{{wind}}</span>
  </div>
  <div class="score">
    <span style="font-size: 80px;">{{score}}</span>
    <span style="font-size: 50px;">{{score_low}}</span>
  </div>
  <div class="change">
    <span>{{score_change}}</span>
  </div>
</div>
</template>

<style scoped>
#DownPerson{
  position: fixed;
  text-align: center;
  vertical-align: bottom;
  bottom: 0;
  right: 50%;
  margin: 0 -140px 0 0;
  transform: translate(0px,5px);
}
#RightPerson{
  position: fixed;
  text-align: center;
  vertical-align: bottom;
  top: 50%;
  right: 0;
  margin: -70px 0 0 0;
  -ms-transform: rotate(270deg);
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg) translate(0,78px);
}
#UpPerson{
  position: fixed;
  text-align: center;
  vertical-align: bottom;
  top: 0;
  right: 50%;
  margin: 0 -140px 0 0;
  -ms-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg) translate(0px,5px);
}
#LeftPerson{
  position: fixed;
  text-align: center;
  vertical-align: bottom;
  top: 50%;
  left: 0;
  margin: -70px 0 0 0;
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg) translate(0,78px);
}
.container{
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(3, auto);
  grid-template-areas: 
    "stick stick ."
    "wind score change";
  vertical-align: middle;
  text-align: center;
}
.riichi_stick{
  visibility: hidden;
  border: 1px solid black;
  grid-area: stick;
  transform: translate(0,20px);
}
.circle{
  background-color:red;
  width:15px;
  height:15px;
  border-radius:50%;
  margin: 3px auto 3px auto;
}
.wind{
  grid-area: wind;
  margin: auto;
  font-size: 80px;
}
.score{
  grid-area: score;
  width: 200px;
  margin: auto;
  white-space: nowrap;
}
.change{
  grid-area: change;
  width: 0px;
  visibility: hidden;
  font-size: 30px;
  padding-top: 30px;
  text-align: left;
  transform: translate(-30px,-15px);
}
</style>
