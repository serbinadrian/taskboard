import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        globalCardIdRegistry: 3,

        allCards: {},

        toDoCards: [{
            id: 1,
            text: "someText"
        }],
        inProgressCards: [{
            id: 2,
            text: "someText"
        }],
        doneCards: [{
            id: 3,
            text: "someText"
        }],

        lastCard: {}
    },
    getters: {
        getToDoCards(){
            //from all cards get todos
            //copy with Object.assign
            console.log('got toDos');
        },
        getInProgressCards(){
            //from all cards get todos
            //copy with Object.assign
            console.log('got InProgress');
        },
        getDoneCards(){
            console.log('got Dones');
        }
    },
    mutations: {
        incrementGlobalCardId(state){
          state.globalCardIdRegistry++;
        },
        addToDoCard(state, card) {
            let cardToPush = Object.assign({},card);
            state.toDoCards.push(cardToPush);
        },
        addInProgressCard(state, card){
            let cardToPush = Object.assign({},card);
            state.inProgressCards.push(cardToPush)
        },
        addDoneCard(state, card){
            let cardToPush = Object.assign({},card);
            state.doneCards.push(cardToPush)
        },
        ejectToDoCardById(state, id){
            for (let i = 0; i < state.toDoCards.length; i++) {
                if (state.toDoCards[i].id === id){
                    state.lastCard = state.toDoCards[i];
                    state.toDoCards.splice(i, 1);
                }
            }
        },
        ejectInProgressCardById(state, id){
            for (let i = 0; i < state.inProgressCards.length; i++) {
                if (state.inProgressCards[i].id === id){
                    state.lastCard = state.inProgressCards[i];
                    state.inProgressCards.splice(i, 1);
                }
            }
        },
        ejectDoneCardById(state, id){
            for (let i = 0; i < state.doneCards.length; i++) {
                if (state.doneCards[i].id === id){
                    state.lastCard = state.doneCards[i];
                    state.doneCards.splice(i, 1);
                }
            }
        }
    },
    actions: {
        // id | name | content| imgcontent | list |
        createCard(card){
            let cardToSend = Object.assign({}, card);
            console.log('card with text' + card.text + 'created');
        },
        deleteCard(id){
            console.log('card with id' + id + 'deleted');
        },
        changeCardList(card, list){
            console.log('card with text' + card.text + 'migrated to' + list);
        },
        loadAllCards(state){
            console.log('allCards are loaded');
            //load here 'state.allCards'
        }
    }
});
export default store;
