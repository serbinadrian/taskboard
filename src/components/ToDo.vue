<template>
  <div class="task-cards-holder">
    <div class="task-cards-header">
      {{ category }}
    </div>
    <div class="task-cards-list">

      <div v-for="card in testCards" class="card">
        <Card :id="card.id" :text="card.text"/>
      </div>

    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import {mapState} from 'vuex';
export default {
  name: "ToDo",
  props: {
    category: String
  },
  computed: {
    ...mapState(['testCards'])
  },
  data() {
    return {
      loadedCards: {}
    }
  },
  components: {
    Card
  }

}
</script>

<style>

.task-cards-holder {
  width: 100%;
  height: 100%;
}

.task-cards-header {
  width: var(--default-card-width);
  margin: 20px auto 0;
}

.task-card-control {

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

</style>