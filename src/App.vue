<script>
export default {
  data(){
    return {
      who: ["DownPerson", "RightPerson", "UpPerson", "LeftPerson"],
      winds: ["東", "南", "西", "北"],
      scores: [250, 250, 250, 250],
      scores_low: ["00", "00", "00", "00"],
      scores_change: [0, 0, 0, 0],
      scores_gap: [0, 0, 0, 0],
      riichi: [false, false, false, false],
    };
  },
};
</script>

<template>
<Player div v-for="(a,i) in who" :key="i" :who=who[i] :wind=winds[i] :score=scores[i] :score_low=scores_low[i] :score_change=scores_change[i] :riichi=riichi[i] />
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
