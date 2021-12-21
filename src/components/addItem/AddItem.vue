<template>
  <div class="add-item">
    <div class="add-item-header">
      <div class="add-item-title">
        {{displayedTitle}}
      </div>
      <div class="add-item-cancel" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg">
          <line x1="10" y1="10" x2="30" y2="30"  stroke-width="2"/>
          <line x1="10" y1="30" x2="30" y2="10"  stroke-width="2"/>
        </svg>
      </div>
    </div>
    <div class="line"></div>
    <input type="text" v-model="textData" :placeholder="displayedPlaceholder">
    <button @click="transferDataToParentComponent(); $emit('close') ">Add</button>
  </div>
</template>

<script>
export default {
  name: "AddItem",
  props: {
    displayedTitle: String,
    displayedPlaceholder: String
  },
  data(){
    return{
      textData: ''
    }
  },
  methods: {
    transferDataToParentComponent() {
      this.$emit('add', this.textData);
    }
  }
}
</script>

<style scoped>
  .add-item{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    z-index: 50;
    color: #5B5B5B;
    width: 350px;
    padding: 15px;
    background: #F1F1F1;
    border-radius: 5px;
    border: 1px solid darkgray;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  }

  .add-item-header{
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
  }

  .add-item-title{
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.05em;
  }

  .add-item-cancel{
    position: absolute;
    right: 0;
    width: 40px;
    height: 40px;
  }

  .add-item-cancel svg {
    width: 100%;
    height: 100%;
    stroke: black;
  }

  .add-item-cancel:hover svg{
    stroke: #00aaee;
  }

  .line{
    margin-bottom: 15px;
    height: 1px;
    width: 100%;
    background: #5b5b5b;
  }

  .add-item input{
    padding-left: 20px;
    margin-bottom: 35px;
  }

  .add-item input, .add-item button{
    border: none;
    width: 100%;
    height: 50px;
    background: #FFFFFF;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }

  .add-item input:focus{
    outline: 2px solid #6B9ED5;
  }

  .add-item button:hover{
    background: #6B9ED5;
    color: white;
  }
</style>