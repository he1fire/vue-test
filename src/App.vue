<script>
export default {
  data(){
    return {
      seats: ["Down", "Right", "Up", "Left"],
      winds: ["東", "南", "西", "北"],
      scores: [250, 250, 250, 250],
      scores_low: ["00", "00", "00", "00"],
      scores_change: [0, 0, 0, 0],
      scores_gap: [0, 0, 0, 0],
      riichi: [false, false, false, false],
    };
  },
  methods: {
    activeRiichi(x){
      if (this.riichi[x]===false){
        this.scores[x]-=10;
        this.riichi[x]=true;
      }
      else{
        this.scores[x]+=10;
        this.riichi[x]=false;
      }
    },
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
  @click="activeRiichi(i)"
/>
</template>

<style>
*{
  margin: 0;
  -webkit-text-size-adjust:none  ;
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
