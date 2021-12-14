import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        globalCardIdRegistry: 3,

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
    actions: {}
});
export default store;
