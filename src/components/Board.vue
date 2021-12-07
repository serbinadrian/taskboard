<template>
  <div class="board">
    <BoardHeader/>
    <div class="board-content">
      <div class="task-cards todo-task-card">
        <div class="task-cards-header">
          To Do
        </div>
        <div class="task-cards-list">
          <div class="card"></div>
        </div>
        <div class="task-card-control add"></div>
      </div>
      <div class="task-cards doing-task-card">
        <div class="task-cards-header">
          Doing
        </div>
        <div class="task-cards-list">
          <div class="card"></div>
        </div>
        <div class="task-card-control add"></div>
      </div>
      <div class="task-cards done-task-card">
        <div class="task-cards-header">
          Done
        </div>
        <div class="task-cards-list">
          <div class="card"></div>
        </div>
        <div class="task-card-control add"></div>
      </div>
    </div>
  </div>
</template>

<script>
import BoardHeader from './BoardHeader.vue'
export default {
  name: "Board",
  components: {
    BoardHeader
  }
}
</script>

<style scoped>
.board {

  width: 100%;
  height: 100%;
}


.board-content {
  width: 100%;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: calc(100% - (var(--navbar-height) + var(--board-header-height)))
}

.task-cards {
  font-size: 1.875rem;
  color: var(--default-card-title-color);

  width: var(--card-holder-width-default);
  margin: 0 auto;
}

.todo-task-card {
  min-height: fit-content;

}

.doing-task-card {
  min-height: 300px;

}

.done-task-card {
  min-height: 300px;

}


.task-cards-header {
  width: var(--default-card-width);
  margin: 20px auto 0;
}

.task-cards-list {
  width: 100%;
  overflow: auto;
  max-height: 80%;
}

.card {
  background: var(--default-background-card-color);
  min-height: 50px;
  width: var(--default-card-width);
  margin: 20px auto 0;
  border-radius: 5px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
}

.task-card-control {

}
</style>