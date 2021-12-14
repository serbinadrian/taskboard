<template>
  <div class="card-holder">
    <div class="task-card-control" v-if="cardCategory === 'ToDo'">
      1
    </div>
    <div class="card-content">
      {{text}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    id: Number,
    text: String
  }
}
</script>

<style scoped>
  .card-content{
    width: 100%;
  }
</style>