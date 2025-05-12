<script>
export default {
  props: {
    modal_contents: String
  },
  emits: ['hideModal'],
  data(){
    return {
    };
  },
  methods: {
    hideModal(){
      this.$emit('hideModal');
    },
  }
};
</script>

<template>
<div class="modal" @click="hideModal">
  <div v-if="this.modal_contents==='Ryuukyoku'" class="modal_content" @click.stop>
    <div style="font-size: 40px; margin: 20px;"><!-- 일반유국함수 추가 -->
      일반유국
    </div>
    <div style="font-size: 40px; margin: 20px;"><!-- 특수유국함수 추가 -->
      특수유국
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
.modal_text{
  font-size: 20px;
  margin: 20px;
}
</style>
