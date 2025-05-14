<script>
export default {
  props: {
    scores_change: Array,
    names: Array,
    winner: Number,
    score_fan: Number,
    score_bu: Number,
    win: Array,
    lose: Array,
    tenpai: Array,
    round_status: String,
    modal_type: String,
  },
  emits: ['showModal', 'hideModal', 'toggleCheckStatus', 'checkInvalidStatus', 'calculateWin', 'calculateDraw', 'saveRound'],
  data(){
    return {
      class_check: ["down_check", "right_check", "up_check", "left_check"],
      arrow_check: ["▼", "▶", "▲", "◀"],
      class_score_diff: ["down_score_diff", "right_score_diff", "up_score_diff", "left_score_diff"],
      fan: ["1", "2", "3", "4", "5", "6+", "8+", "11+", "13+", "1배역만", "2배역만", "3배역만", "4배역만", "5배역만","6배역만"],
      bu: [20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110],
    };
  },
  methods: {
    /**체크되었다면 붉은색으로 표시*/
    isChecked(x, status) {
      if (status==='win')
        return {color: this.win[x]===true ? 'red' : ''};
      else if (status==='lose'){
        if (this.win[x]===true)
          return {color: 'gray'};
        else
          return {color: this.lose[x]===true ? 'red' : ''};
      }
      else if (status==='tenpai')
        return {color: this.tenpai[x]===true ? 'red' : ''};
      else if (status==='fan')
        return {color: x===this.score_fan ? 'red' : ''};
      else if (status==='bu')
        return {color: x===this.score_bu ? 'red' : ''};
    },
    isYakuman(x){
      return {display: ((this.score_fan < 9 && x === 9) || x === this.score_fan) ? '' : 'none'};
    },
    /**점수 변동에 따른 글자색*/
    isDiff(x) {
      if (this.scores_change[x]>0)
        return {color: 'limegreen'};
      else if (this.scores_change[x]<0)
        return {color: 'red'};
      else
        return {color: ''};
    },
    /**모달 창 켜기*/
    showModal(type, status, changed=[]){
      this.$emit('showModal', type, status, changed);
    },
    /**모달 창 끄기*/
    hideModal(){
      this.$emit('hideModal');
    },
    /**화료, 방총, 텐파이 체크*/
    toggleCheckStatus(idx, status){
      this.$emit('toggleCheckStatus', idx, status);
    },
/**화료 및 방총 불가능한 경우 반환*/
    checkInvalidStatus(){
      this.$emit('checkInvalidStatus');
    },
    /**화료 점수계산*/
    calculateWin(){
      this.$emit('calculateWin');
    },
    /**유국 점수계산*/
    calculateDraw(){
      this.$emit('calculateDraw');
    },
    /**국 결과값 처리*/
    saveRound(){
      this.$emit('saveRound');
    },
  }
};
</script>

<template>
<div class="modal" @click="hideModal">
  <!-- 화료 인원 선택창 -->
  <div v-if="modal_type==='check_player_win'" class="modal_content" @click.stop>
    <div class="container_check">
      <div class="guide_message">
        화료한 사람을 선택해 주세요.
      </div>
      <div v-for="(_, i) in class_check"
        :key="i"
        :class="class_check[i]"
        :style="isChecked(i, 'win')"
        @click.stop="toggleCheckStatus(i, 'win')"
      >
        {{ arrow_check[i] }}
      </div>
      <div class="ok" @click.stop="showModal('check_player_lose')">
        OK
      </div>
    </div>
  </div>
  <!--방총 인원 선택창 -->
  <div v-else-if="modal_type==='check_player_lose'" class="modal_content" @click.stop>
    <div class="container_check">
      <div class="guide_message">
        방총당한 사람을 선택해 주세요.
      </div>
      <div v-for="(_, i) in class_check"
        :key="i"
        :class="class_check[i]"
        :style="isChecked(i, 'lose')"
        @click.stop="toggleCheckStatus(i, 'lose')"
      >
        {{ arrow_check[i] }}
      </div>
      <div class="ok" @click.stop="checkInvalidStatus()"><!-- 화료 함수 연결 -->
        OK
      </div>
    </div>
  </div>
  <!-- 판/부 선택창 -->
  <div v-else-if="modal_type==='check_score'" class="modal_content" @click.stop>
    <div>
      {{ names[winner] }}의 점수를 입력해주세요.
    </div>
    <div class="container_check_fanbu">
      <div class="fan">
        판:
      </div>
      <div class="fan_check">
        <span v-for="(_, i) in fan.slice(0, 9)"
        :key="i"
        :style="isChecked(i, 'fan')"
        @click.stop="toggleCheckStatus(i, 'fan')"
        >
          {{ fan[i] }}
        </span>
        <div></div>
        <span v-for="(_, i) in fan.slice(9)"
        :key="i"
        :style="[isChecked(i+9, 'fan'), isYakuman(i+9)]"
        @click.stop="toggleCheckStatus(i+9, 'fan')"
        >
          {{ fan[i+9] }}
        </span>
        <!-- <span>(책임지불<span>X</span>)</span> -->
      </div>
      <div class="bu">
        부:
      </div>
      <div class="bu_check">
        <span v-for="(_, i) in bu.slice(0, 6)"
        :key="i"
        :style="isChecked(i, 'bu')"
        @click.stop="toggleCheckStatus(i, 'bu')"
        >
          {{ bu[i] }}
        </span>
        <div></div>
        <span v-for="(_, i) in bu.slice(6)"
        :key="i"
        :style="isChecked(i+6, 'bu')"
        @click.stop="toggleCheckStatus(i+6, 'bu')"
        >
          {{ bu[i+6] }}
        </span>
      </div>
    </div>
    <div style="font-size: 30px;" @click.stop="calculateWin()">
      OK
    </div>
  </div>
  <!-- 유국 종류 선택창 -->
  <div v-else-if="modal_type==='choose_draw_kind'" class="modal_content" @click.stop>
    <div class="modal_choose_draw" @click.stop="showModal('check_player_tenpai')">
      일반유국
    </div>
    <div class="modal_choose_draw" @click.stop="showModal('show_score', 'special_draw', [0, 0, 0, 0])">
      도중유국
    </div>
  </div>
  <!-- 텐파이 인원 선택창 -->
  <div v-else-if="modal_type==='check_player_tenpai'" class="modal_content" @click.stop>
    <div class="container_check">
      <div class="guide_message">
        텐파이한 사람을 선택해 주세요.
      </div>
      <div v-for="(_, i) in class_check"
        :key="i"
        :class="class_check[i]"
        :style="isChecked(i, 'tenpai')"
        @click.stop="toggleCheckStatus(i, 'tenpai')"
      >
        {{ arrow_check[i] }}
      </div>
      <div class="ok" @click.stop="calculateDraw()">
        OK
      </div>
    </div>
  </div>
  <!-- 점수 확인창 -->
  <div v-else-if="modal_type==='show_score'" class="modal_content" style="border-radius:50%;" @click.stop>
    <div class="container_show_score_diff">
      <div v-for="(_, i) in class_score_diff"
        :key="i"
        :class="class_score_diff[i]"
        :style="isDiff(i)"
      >
        <span v-show="scores_change[i]>0">+</span>{{ scores_change[i] }}
      </div>
      <div class="ok" @click.stop="saveRound()">
        OK
      </div>
    </div>
  </div>
  <!-- 메시지 팝업창 -->
  <div v-else class="modal_content" @click.stop>
    <div class="modal_text">{{ modal_type }}</div>
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
  white-space: nowrap;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
  padding: 5px;
  z-index: 2;
  font-size: 20px;
}

/* 유국 선택창 */
.modal_choose_draw{
  font-size: 40px;
  margin: 20px;
}

/* 메시지 팝업창 */
.modal_text{
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
  align-items: center;
  justify-items: center;
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

/* 부/판 체크창*/
.container_check_fanbu{
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: 60px auto;
  grid-template-areas:
  "fan fan_check"
  "bu bu_check";
  text-align: center;
  font-size: 30px;
  align-items: center;
  justify-items: center;
}
.fan{
  grid-area: fan;
}
.bu{
  grid-area: bu;
}
.fan_check{
  grid-area: fan_check;
}
.bu_check{
  grid-area: bu_check;
}
.fan_check span,
.bu_check span {
  padding-right: 5px;
  padding-left: 5px;
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
  align-items: center;
  justify-items: center;
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
