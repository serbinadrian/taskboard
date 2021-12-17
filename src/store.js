import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const jsonResponse = (response) => {
    return response.json();
}

const store = new Vuex.Store({
    state: {
        globalCardIdRegistry: -1,

        allCards: [],

        toDoCards: [],
        inProgressCards: [],
        doneCards: [],

        lastCard: {}
    },
    getters: {
        getToDoCards() {
            //from all cards get todos
            //copy with Object.assign
            console.log('got toDos');
        },
        getInProgressCards() {
            //from all cards get todos
            //copy with Object.assign
            console.log('got InProgress');
        },
        getDoneCards() {
            console.log('got Dones');
        }
    },
    mutations: {
        incrementGlobalCardId(state) {
            state.globalCardIdRegistry++;
        },
        addToDoCard(state, card) {
            let cardToPush = Object.assign({}, card);
            state.toDoCards.push(cardToPush);
        },
        addInProgressCard(state, card) {
            let cardToPush = Object.assign({}, card);
            state.inProgressCards.push(cardToPush)
        },
        addDoneCard(state, card) {
            let cardToPush = Object.assign({}, card);
            state.doneCards.push(cardToPush)
        },
        ejectToDoCardById(state, id) {
            for (let i = 0; i < state.toDoCards.length; i++) {
                if (state.toDoCards[i].id === id) {
                    state.lastCard = state.toDoCards[i];
                    state.toDoCards.splice(i, 1);
                }
            }
        },
        ejectInProgressCardById(state, id) {
            for (let i = 0; i < state.inProgressCards.length; i++) {
                if (state.inProgressCards[i].id === id) {
                    state.lastCard = state.inProgressCards[i];
                    state.inProgressCards.splice(i, 1);
                }
            }
        },
        ejectDoneCardById(state, id) {
            for (let i = 0; i < state.doneCards.length; i++) {
                if (state.doneCards[i].id === id) {
                    state.lastCard = state.doneCards[i];
                    state.doneCards.splice(i, 1);
                }
            }
        }
    },
    actions: {
        // id | name | content| imgcontent | list |
        createCard(state, card) {
            const cardToSend = Object.assign({}, card);

            fetch('http://localhost:4001/api/cards', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cardToSend)
            })
                .then(jsonResponse)
                .then(result => {
                    console.log('card with text' + cardToSend.text + 'created');
                    console.log(result);
                })
                .catch(console.error);
        },
        deleteCard(state, id) {
            fetch('http://localhost:4001/api/cards', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: id})
            })
                .then(jsonResponse)
                .then(result => {
                    console.log('card with id ' + id + ' deleted');
                    console.log(result);
                })
                .catch(console.error);
        },
        changeCardList(state, card) {
            fetch('http://localhost:4001/api/card/change-list', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(card)
            })
                .then(jsonResponse)
                .then(result => {
                    console.log('card with text ' + card.text + ' migrated');
                    console.log(result);
                })
                .catch(console.error);
        },
        loadAllCards() {
            fetch('http://localhost:4001/api/cards')
                .then(jsonResponse)
                .then(result => {
                    Array.from(result).forEach(card => {
                        switch (card.list) {
                            case 0: {
                                this.state.toDoCards.push(card);
                                break;
                            }

                            case 1: {
                                this.state.inProgressCards.push(card);
                                break;
                            }

                            case 2: {
                                this.state.doneCards.push(card);
                                break;
                            }
                        }

                        if (card.id > this.state.globalCardIdRegistry) this.state.globalCardIdRegistry = card.id;
                    });

                    console.log('allCards are loaded');
                })
                .catch(console.error)
        }
    }
});
export default store;
