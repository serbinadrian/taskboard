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
import ToDo from './cards/ToDo.vue';
import InProgress from './cards/InProgress.vue';
import Done from './cards/Done.vue';

import {mapActions} from 'vuex'

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
  },
  created(){
    //this.loadAllCards();
  },
  methods: {
    ...mapActions(['loadAllCards'])
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
  margin: 0 auto;
  width: 100%;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

}



</style>