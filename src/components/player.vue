<script>
export default {
  props: {
    seat: String,
    wind: String,
    score: Number,
    score_low: String,
    score_change: Number,
    riichi: Boolean
  },
  emits: ['toggleActiveRiichi'],
  data(){
    return {
    };
  },
  methods: {
    /**본인 바람이 동이라면 붉은색으로 표시*/
    isEast() {
      return {color: this.wind==='東' ? 'red' : ''};
    },
    /**리치봉 표시*/
    isRiichi() {
      return {visibility: this.riichi===true ? 'visible' : 'hidden'};
    },
    toggleActiveRiichi(){
      this.$emit('toggleActiveRiichi', this.seat);
    },
  }
};
</script>

<template>
<div class="container" :id=seat>
  <div class="stick" :style="isRiichi()">
    <div class="circle"></div>
  </div>
  <div class="wind" :style="isEast()"><!-- 점수비교함수 추가 -->
    {{ wind }}
  </div>
  <div class="score" @click="toggleActiveRiichi">
    {{ score }}<span style="font-size: 50px;">{{ score_low }}</span>
  </div>
  <div class="change">
    {{ score_change }}
  </div>
</div>
</template>

<style scoped>
#Down{
  bottom: 0;
  right: 50%;
  margin: 0 -140px 0 0;
  transform: translate(0px,5px);
}
#Right{
  top: 50%;
  right: 0;
  margin: -70px 0 0 0;
  -ms-transform: rotate(270deg);
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg) translate(0,78px);
}
#Up{
  top: 0;
  right: 50%;
  margin: 0 -140px 0 0;
  -ms-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg) translate(0px,5px);
}
#Left{
  top: 50%;
  left: 0;
  margin: -70px 0 0 0;
  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg) translate(0,78px);
}
.container{
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(3, auto);
  grid-template-areas: 
    "stick stick ."
    "wind score change";
  position: fixed;
  text-align: center;
  font-size: 80px;
}
.stick{
  grid-area: stick;
  visibility: hidden;
  border: 1px solid black;
  transform: translate(0,20px);
}
.wind{
  grid-area: wind;
  margin: auto;
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
.circle{
  background-color:red;
  width:15px;
  height:15px;
  border-radius:50%;
  margin: 3px auto 3px auto;
}
</style>
