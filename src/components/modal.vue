<script>
export default {
  props: {
    modal_contents: String,
    scores_change: Array,
  },
  emits: ['showModal', 'hideModal', 'saveRound'],
  data(){
    return {
    };
  },
  methods: {
    showModal(x, status, change=[]){
      this.$emit('showModal', x, status, change);
    },
    hideModal(){
      this.$emit('hideModal');
    },
    saveRound(){
      this.$emit('saveRound');
    },
  }
};
</script>

<template>
<div class="modal" @click="hideModal">
  <!-- 유국 종류 선택창 -->
  <div v-if="this.modal_contents==='choose_draw'" class="modal_content">
    <div class="modal_choose_draw" @click.stop="showModal('check_player')">
      일반유국
    </div>
    <div class="modal_choose_draw" @click.stop="showModal('show_score', 'special_draw', [0, 0, 0, 0])">
      특수유국
    </div>
  </div>
  <!-- 일반유국 텐파이 선택창 -->
  <div v-else-if="this.modal_contents==='check_player'" class="modal_content">
    <div class="container_check" @click.stop>
      <div class="guide_message">
        텐파이인 사람을 선택해주세요.
      </div>
      <div class="down_check"><!-- 셀프 클릭 체크 함수 설정-->
        ▼
      </div>
      <div class="right_check"><!-- 셀프 클릭 체크 함수 설정-->
        ▶
      </div>
      <div class="up_check"><!-- 셀프 클릭 체크 함수 설정-->
        ▲
      </div>
      <div class="left_check"><!-- 셀프 클릭 체크 함수 설정-->
        ◀
      </div>
      <div class="ok"><!-- 텐파이 계산 함수 설정-->
        OK
      </div>
    </div>
  </div>
  <!-- 점수 확인창 -->
  <div v-else-if="this.modal_contents==='show_score'" class="modal_content" style="border-radius:50%;">
    <div class="container_show_score_diff" @click.stop>
      <div class="down_score_diff">
        {{ scores_change[0] }}
      </div>
      <div class="right_score_diff">
        {{ scores_change[1] }}
      </div>
      <div class="up_score_diff">
        {{ scores_change[2] }}
      </div>
      <div class="left_score_diff">
        {{ scores_change[3] }}
      </div>
      <div class="ok" @click.stop="saveRound()">
        OK
      </div>
    </div>
  </div>
  <!-- 메시지 팝업창 -->
  <div v-else class="modal_content" @click.stop>
    <div class="modal_text">{{ modal_contents }}</div>
  </div>
</div>
</template>

<style scoped>
/* 기본 모달창 */
.modal {
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}
.modal_content {
  background-color: #ffffff;
  position: fixed;
  text-align: center;
  vertical-align: bottom;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
  padding: 5px;
  z-index: 2;
}

/* 유국 선택창 */
.modal_choose_draw{
  font-size: 40px;
  margin: 20px;
}

/* 메시지 팝업창 */
.modal_text{
  font-size: 20px;
  margin: 20px;
}

/* 체크창 */
.container_check{
  display: grid;
  grid-template-rows: auto repeat(3, 100px);
  grid-template-columns: repeat(3, 100px);
  grid-template-areas: 
    "guide_message guide_message guide_message"
    ". up_check ."
    "left_check ok right_check"
    ". down_check .";
  text-align: center;
  font-size: 70px;
}
.guide_message{
  grid-area: guide_message;
  font-size: 20px;
}
.down_check{
  grid-area: down_check;
}
.right_check{
  grid-area: right_check;
}
.up_check{
  grid-area: up_check;
}
.left_check{
  grid-area: left_check;
}

/* 점수 확인창 */
.container_show_score_diff{
  display: grid;
  grid-template-rows: repeat(3, 100px);
  grid-template-columns: repeat(3, 100px);
  grid-template-areas:
    ". up_score_diff ."
    "left_score_diff ok right_score_diff"
    ". down_score_diff .";
  text-align: center;
  line-height: 100px;
  font-size: 30px;
}
.down_score_diff{
  grid-area: down_score_diff;
  transform: rotate(0deg);
}
.right_score_diff{
  grid-area: right_score_diff;
  transform: rotate(270deg);
}
.up_score_diff{
  grid-area: up_score_diff;
  transform: rotate(180deg);
}
.left_score_diff{
  grid-area: left_score_diff;
  transform: rotate(90deg);
}
.ok{
  grid-area: ok;
  font-size: 60px;
}
</style>
