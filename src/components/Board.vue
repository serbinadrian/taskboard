<template>
  <div class="board">
    <BoardHeader/>
    <div class="board-content">
      <div class="task-cards">
        <ToDo :category="cardCategories[0]"></ToDo>
        <InProgress :category="cardCategories[1]"></InProgress>
        <Done :category="cardCategories[2]"></Done>
      </div>
    </div>
  </div>
</template>

<script>
import BoardHeader from './BoardHeader.vue';
import ToDo from './ToDo.vue';
import InProgress from './InProgress.vue';
import Done from './Done.vue';

export default {
  name: "Board",
  components: {
    BoardHeader,
    ToDo,
    InProgress,
    Done
  },
  data() {
    return {
      cardCategories: ['ToDo', 'Doing', 'Done']
    }
  }
}
</script>

<style>
.board {

  width: 100%;
  height: 100%;
}


.board-content {
  width: 100%;
  height: calc(100% - (var(--navbar-height) + var(--board-header-height)))
}


.task-cards {
  font-size: 1.875rem;
  color: var(--default-card-title-color);

  //width: var(--card-holder-width-default);
  margin: 0 auto;
  width: 100%;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

}
</style>