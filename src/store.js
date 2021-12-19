import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const jsonResponse = (response) => {
    return response.json();
}

const store = new Vuex.Store({
    state: {
        backendPort: 4001,
        isSignedIn: false,
        globalCardIdRegistry: -1,
        currentHomeComponent: 'SignIn',
        currentUser: {
            username: '',
            email: ''
        },
        boards: [
            {
                id: -1,
                name: 'default',
                owner: 'none'
            }
        ],

        toDoCards: [],
        inProgressCards: [],
        doneCards: [],

        lastCard: {}
    },
    mutations: {
        /*nav*/
        setCurrentHomeComponent(state, component) {
            state.currentHomeComponent = component;
        },
        /*card*/
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
        createCard(state, card) {
            const cardToSend = Object.assign({}, card);

            fetch('http://localhost:' + state.backendPort + '/api/cards', {
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
            fetch('http://localhost:' + state.backendPort + '/api/cards', {
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
        changeCardList(state, card, list) {
            card.list = list;
            fetch('http://localhost:' + state.backendPort + '/api/card/change-list', {
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
        loadAllCards(state) {
            fetch('http://localhost:' + state.backendPort + '/api/cards')
                .then(jsonResponse)
                .then(result => {
                    Array.from(result).forEach(card => {
                        switch (card.list) {
                            case 0: {
                                state.toDoCards.push(card);
                                break;
                            }
                            case 1: {
                                state.inProgressCards.push(card);
                                break;
                            }
                            case 2: {
                                state.doneCards.push(card);
                                break;
                            }
                        }
                        if (card.id > state.globalCardIdRegistry) state.globalCardIdRegistry = card.id;
                    });

                    console.log('allCards are loaded');
                })
                .catch(console.error)
        },
        /*auth*/
        signIn(credentials) {
            /*TODO sign in
            * credentials: {
            *   login: 'some login',
            *   password 'some password'
            * }
            * */
            /*TODO update store.currentUser on sign in */
            this.state.isSignedIn = true;
            this.state.currentHomeComponent = 'Board';
        },
        signUp(credentials) {
            /*TODO sign up
            * credentials: {
            *   login: '',
            *   email: '',
            *   password: '',
            *   rpassword: ''
            * }
            * */
        }
    }
});
export default store;
