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
        globalBoardIdRegistry: -1,

        currentHomeComponent: 'SignIn',

        currentUser: {
            id: -1,
            username: 'test',
            email: 'test@mail.com'
        },
        currentBoard:{
          id: -1,
          name: '',
          owner: ''
        },

        boards: [],

        toDoCards: [],
        inProgressCards: [],
        doneCards: [],

        /*recycle*/
        lastBoard: {},
        lastCard: {}
    },
    mutations: {
        /*nav*/
        setCurrentHomeComponent(state, component) {
            state.currentHomeComponent = component;
        },
        /*board*/
        incrementGlobalBoardId(state) {
            state.globalBoardIdRegistry++;
        },
        addBoard(state, board) {
          let boardToPush = Object.assign({}, board);
          state.boards.push(boardToPush);
        },
        ejectBoardById(state, id) {
            for (let i = 0; i < state.boards.length; i++) {
                if (state.boards[i].id === id) {
                    state.lastBoard = state.boards[i];
                    state.boards.splice(i, 1);
                }
            }
        },
        openSelectedBoardById(state, id) {
            for (let i = 0; i < state.boards.length; i++) {
                if (state.boards[i].id === id) {
                    state.currentBoard = Object.assign({}, state.boards[i]);
                    break;
                }
            }
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
        },
        logout(state) {
            state.isSignedIn = false;
            state.currentUser = {};
            state.boards = [];
            state.toDoCards = [];
            state.inProgressCards = [];
            state.doneCards = [];
            state.globalBoardIdRegistry = -1;
            state.globalCardIdRegistry = -1;
            state.lastCard = {};
            state.lastBoard =  {};
        }
    },
    actions: {
        createCard(card) {
            const cardToSend = Object.assign({}, card);

            fetch('http://localhost:' + this.state.backendPort + '/api/cards', {
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
        deleteCard(id) {
            fetch('http://localhost:' + this.state.backendPort + '/api/cards', {
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
        changeCardList(card, list) {
            card.list = list;
            fetch('http://localhost:' + this.state.backendPort + '/api/card/change-list', {
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
        loadAllCards(boardId) { //TODO update method with board id
            fetch('http://localhost:' + this.state.backendPort + '/api/cards')
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
        },
        /*boards*/
        loadBoards(state){
            //use this.state.currentUser.id to load
        },
        createBoard(board) {

        },
        deleteBoard(id) {

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
            this.state.currentUser.username = 'test';
            this.state.currentUser.email = 'test@mail.com';
            this.state.currentHomeComponent = 'Boards';
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
