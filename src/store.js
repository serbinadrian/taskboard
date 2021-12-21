import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const jsonResponse = (response) => {
    return response.json();
}

const store = new Vuex.Store({
    state: {
        backendPort: 4001,
        domainName: 'http://localhost:',
        isSignedIn: false,

        globalCardIdRegistry: 0,
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
                    state.toDoCards = [];
                    state.inProgressCards = [];
                    state.doneCards = [];

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
        createCard(state, card) {
            const cardToSend = Object.assign({}, card);

            fetch(this.state.domainName + this.state.backendPort + '/api/cards', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({card: cardToSend, board: this.state.currentBoard})
            })
                .then(jsonResponse)
                .then(result => {
                    console.log('card with text' + cardToSend.text + 'created');
                    console.log(result);
                })
                .catch(console.error);
        },
        deleteCard(state, id) {
            fetch(this.state.domainName + this.state.backendPort + '/api/cards', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({cardId: id, board: this.state.currentBoard})
            })
                .then(jsonResponse)
                .then(result => {
                    console.log('card with id ' + id + ' deleted');
                    console.log(result);
                })
                .catch(console.error);
        },
        changeCardList(state, card) {
            fetch(this.state.domainName + this.state.backendPort + '/api/card/change-list', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({card: card, board: this.state.currentBoard})
            })
                .then(jsonResponse)
                .then(result => {
                    console.log('card with text ' + card.text + ' migrated');
                    console.log(result);
                })
                .catch(console.error);
        },
        loadAllCards(state) {
            fetch(this.state.domainName + this.state.backendPort + '/api/cards?id=' + this.state.currentBoard.id + '&owner=' + this.state.currentBoard.owner)
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
                            default: {
                                this.state.toDoCards.push(card);
                            }
                        }
                        if (card.id > this.state.globalCardIdRegistry) this.state.globalCardIdRegistry = card.id;
                    });

                    console.log('allCards are loaded');
                })
                .catch(console.error)
        },
        /*boards*/
        createBoard(state, board) {
            fetch(this.state.domainName + this.state.backendPort + '/api/boards', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(board)
            })
                .then(jsonResponse)
                .then(board => {
                    if (board) {
                        console.log(board);
                        console.log("Board created");
                    }
                })
                .catch(console.error);
        },
        deleteBoard(state, board) {
            fetch(this.state.domainName + this.state.backendPort + '/api/boards', {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(board)
            })
                .then(jsonResponse)
                .then(response => {
                    if (response) {
                        console.log(response);
                        console.log("Board deleted");
                    }
                })
                .catch(console.error);
        },
        /*auth*/
        signIn(state, credentials) {
            fetch(this.state.domainName + this.state.backendPort + '/api/user/signin', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
                .then(jsonResponse)
                .then(user => {
                    if (user) {
                        this.state.isSignedIn = true;
                        this.state.currentUser.username = user.login;
                        this.state.currentUser.email = user.email;
                        this.state.currentHomeComponent = 'Boards';

                        if (user.boards) {
                            this.state.boards = user.boards;
                        }

                        console.log("User loaded");
                    }
                })
                .catch(console.error);
        },
        signUp(state, credentials) {
            if (credentials.login || credentials.password) {
                fetch(this.state.domainName + this.state.backendPort + '/api/user/signup', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                })
                    .then(jsonResponse)
                    .then(user => {
                        if (user) {
                            location.reload();
                        } else {
                            alert('ERROR');
                        }
                    });
            } else {
                alert("Please, input username and password");
            }

            console.log(credentials);
        }
    }
});
export default store;
