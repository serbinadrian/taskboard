<template>
  <div class="task-cards-holder">
    <div class="task-cards-header">
      {{ category }}
      <div class="add-new-card" @click="isAddNewCard = !isAddNewCard">
        <svg viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg" :class="{'cancel': isAddNewCard}">
          <circle cx="40" cy="40" r="35" fill="none" stroke-width="3px"/>
          <line x1="20" y1="40" x2="60" y2="40" stroke-width="3px"/>
          <line x1="40" y1="60" x2="40" y2="20" stroke-width="3px"/>
        </svg>
      </div>
    </div>
    <div class="task-cards-list">

      <div class="add-new-card-edit-panel" v-show="isAddNewCard">
        <input type="text" v-model="currentCard.text">
        <button @click="isAddNewCard = !isAddNewCard; addCard()">submit</button>
      </div>

      <div v-for="card in toDoCards" class="card">
        <div class="task-card-control">
          <div class="task-card-control-item delete" @click="ejectToDoCardById(card.id)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M 10 2 L 9 3 L 5 3 C 4.448 3 4 3.448 4 4 C 4 4.552 4.448 5 5 5 L 7 5 L 17 5 L 19
              5 C 19.552 5 20 4.552 20 4 C 20 3.448 19.552 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C
              5 21.105 5.895 22 7 22 L 17 22 C 18.105 22 19 21.105 19 20 L 19 7 L 5 7 z"/>
            </svg>
          </div>
          <div class="task-card-control-item toInProgress" @click="transferCardToInProgress(card.id)">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 330 330" xml:space="preserve">
              <path id="XMLID_27_" d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255
              s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0
              c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"/>
            </svg>
          </div>
        </div>
        <Card :id="card.id" :text="card.text"/>
      </div>


    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import {mapState, mapMutations} from 'vuex';

export default {
  name: "ToDo",
  props: {
    category: String
  },
  computed: {
    ...mapState(['toDoCards', 'globalCardIdRegistry', 'lastCard'])
  },
  data() {
    return {
      isAddNewCard: false,
      currentCard: {
        id: 0,
        text: ''
      }
    }
  },
  methods: {
    ...mapMutations(['addToDoCard', 'incrementGlobalCardId', 'ejectToDoCardById', 'addInProgressCard']),
    addCard() {
      this.incrementGlobalCardId();
      console.log(this.globalCardIdRegistry);
      this.currentCard.id = this.globalCardIdRegistry;
      this.addToDoCard(this.currentCard);
      this.clearCurrentCard();
    },
    clearCurrentCard() {
      this.currentCard.id = 0;
      this.currentCard.text = '';
    },
    transferCardToInProgress(id) {
      this.ejectToDoCardById(id);
      this.addInProgressCard(this.lastCard);
    }
  },
  components: {
    Card
  }

}
</script>

<style>

.task-cards-holder {
  width: 400px;
  height: 100%;
}

.task-cards-header {
  padding-left: 20px;
  width: 100%;
  height: 40px;
  align-items: center;
  margin: 20px auto 0;
  display: flex;
  flex-wrap: nowrap;
}

.add-new-card-edit-panel {
  width: 100%;
  min-height: 50px;
}

.add-new-card {
  margin-left: 25px;
  cursor: pointer;
  width: 30px;
  height: 30px;
}

.add-new-card svg {
  stroke: black;
  width: 100%;
  height: 100%;
}

.add-new-card:hover svg {
  stroke: red;
  transform: rotate(180deg);
  transition: .5s;
}

.task-card-control {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 25px;
  justify-content: end;
}


.task-card-control-item {
  width: 25px;
  height: 25px;
  margin-left: 5px;
  margin-right: 5px;
}

.task-card-control-item svg {
  fill: #000000;
  width: 100%;
  height: 100%;
}

.task-card-control-item:hover svg {
  fill: red;
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

.cancel {
  transform: rotate(45deg);
}

.cancel:hover {
  transform: rotate(45deg) !important;
  transition: 0s !important;
}

</style>