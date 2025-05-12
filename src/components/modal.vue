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
  <div v-if="this.modal_contents==='choose_draw'" class="modal_content">
    <div class="modal_choose_draw" @click.stop><!-- 일반유국함수 추가 -->
      일반유국
    </div>
    <div class="modal_choose_draw" @click.stop="showModal('show_score', 'special_draw', [0, 0, 0, 0])"><!-- 특수유국함수 추가 -->
      특수유국
    </div>
  </div>
  <div v-else-if="this.modal_contents==='show_score'" class="modal_content">
    <div class="modal_content" style="border-radius:50%;">
      <div class="container_showscore" @click.stop>
        <div class="down_showscore">
          {{ scores_change[0] }}
        </div>
        <div class="right_showscore">
          {{ scores_change[1] }}
        </div>
        <div class="up_showscore">
          {{ scores_change[2] }}
        </div>
        <div class="left_showscore">
          {{ scores_change[3] }}
        </div>
        <div class="ok" @click.stop="saveRound()">
          OK
        </div>
      </div>
    </div>
  </div>
  <div v-else class="modal_content" @click.stop>
    <div class="modal_text">{{ modal_contents }}</div>
  </div>
</div>
</template>

<style scoped>
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
.modal_choose_draw{
  font-size: 40px;
  margin: 20px;
}
.modal_text{
  font-size: 20px;
  margin: 20px;
}

.container_showscore{
  display: grid;
  grid-template-rows: repeat(3, 100px);
  grid-template-columns: repeat(3, 100px);
  grid-template-areas:
    ". up_showscore ."
    "left_showscore ok right_showscore"
    ". down_showscore .";
  text-align: center;
  line-height: 100px;
  font-size: 30px;
}
.down_showscore{
  grid-area: down_showscore;
  transform: rotate(0deg);
}
.right_showscore{
  grid-area: right_showscore;
  transform: rotate(270deg);
}
.up_showscore{
  grid-area: up_showscore;
  transform: rotate(180deg);
}
.left_showscore{
  grid-area: left_showscore;
  transform: rotate(90deg);
}
.ok{
  grid-area: ok;
  font-size: 60px;
}
</style>
