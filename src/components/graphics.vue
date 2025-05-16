<script>
export default {
  props: {
    kind: String,
    value: Number,
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
<!--리치봉 -->
<div v-if="kind==='riichiStick'" class="stick">
  <div class="riichi_circle"></div>
</div>
<!--미니리치봉 -->
<div v-else-if="kind==='riichiStickMini'" class="stick_mini">
  <div class="riichi_circle_mini"></div>
</div>
<!--미니연장봉 -->
<div v-else-if="kind==='renchanStickMini'" class="stick_mini">
  <div class="renchan_circle_mini" style="margin: auto 0px 5px 0px;visibility: hidden;"></div>
  <div class="renchan_circle_mini"></div>
  <div class="renchan_circle_mini" style="margin: auto 0px 3px 0px;"></div>
  <div class="renchan_circle_mini"></div>
  <div class="renchan_circle_mini" style="margin: auto 0px 3px 0px;"></div>
  <div class="renchan_circle_mini"></div>
  <div class="renchan_circle_mini" style="margin: auto 0px 3px 0px;"></div>
  <div class="renchan_circle_mini"></div>
  <div class="renchan_circle_mini" style="margin: auto 0px 3px 0px;"></div>
  <div class="renchan_circle_mini" style="margin: 5px 0px auto 0px; visibility: hidden;"></div>
</div>
</template>

<style scoped>
/* 리치봉 */
.stick{
  visibility: hidden;
  border: 2px solid black;
  border-radius: 5px;
  transform: translate(0, 20px);
}
.riichi_circle{
  background-color:red;
  width:15px;
  height:15px;
  border-radius:50%;
  margin: 3px auto 3px auto;
}

/* 미니 리치봉, 연장봉 */
.stick_mini{
  width: 50px;
  height: 10px;
  font-size: 0px;
  border: 1px solid black;
  border-radius: 3px;
  transform: rotate(-50deg) translate(-52px,-10px);
}
.riichi_circle_mini{
  background-color:red;
  width:5px;
  height:5px;
  border-radius:50%;
  margin: 3px auto 3px auto;
}
.renchan_circle_mini{
  display: inline-block;
  background-color:black;
  width:3px;
  height:3px;
  border-radius:50%;
  margin: 3px 0px auto 0px;
}
</style>
