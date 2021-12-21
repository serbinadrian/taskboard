<template>
  <div class="boards">
    <AddItem v-on:add="createLocalBoard($event)"
             v-on:close="isNewBoard = !isNewBoard"
             v-if="isNewBoard"
             :displayedTitle="'Add Board'"
             :displayed-placeholder="'Type board name'"
    />
    <div class="boards-title" :class="{'focused' : isNewBoard}">
      Your boards
    </div>
    <div class="wrapper" :class="{'focused' : isNewBoard}">
      <div class="user-board-add" @click="isNewBoard = !isNewBoard">
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="35" fill="none" stroke-width="3px"/>
          <line x1="20" y1="40" x2="60" y2="40" stroke-width="3px"/>
          <line x1="40" y1="60" x2="40" y2="20" stroke-width="3px"/>
        </svg>
        <div class="user-board-name">
          Add new board
        </div>
      </div>
      <div class="user-board" v-for="board in boards" @click="openBoard(board.id)">
        <div class="board-control-item delete" @click.stop="deleteBoard(board.id); ejectBoardById(board.id)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M 10 2 L 9 3 L 5 3 C 4.448 3 4 3.448 4 4 C 4 4.552 4.448 5 5 5 L 7 5 L 17 5 L 19
              5 C 19.552 5 20 4.552 20 4 C 20 3.448 19.552 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C
              5 21.105 5.895 22 7 22 L 17 22 C 18.105 22 19 21.105 19 20 L 19 7 L 5 7 z"/>
          </svg>
        </div>
        <img src="" alt="">
        <div class="user-board-name">
          {{board.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from "vuex";
import AddItem from './../addItem/AddItem';

export default {
  name: "Boards",
  data() {
    return {
      isBoards: false,
      isNewBoard: false,
      newBoard: {
        id: Number,
        name: String,
        owner: String
      }
    }
  },
  created(){
    //this.loadBoards();
  },
  computed: {
    ...mapState(['boards', 'currentUser', 'globalBoardIdRegistry'])
  },
  watch: {
    boards: function(){
      this.isBoards = this.boards.length > 0;
    }
  },
  methods: {
    gay(data){
      alert(data)
    },
    ...mapMutations(['setCurrentHomeComponent', 'openSelectedBoardById', 'incrementGlobalBoardId', 'addBoard', 'ejectBoardById']),
    ...mapActions(['loadAllCards', 'createBoard', 'deleteBoard', 'loadBoards']),
    createLocalBoard(boardName){
      this.incrementGlobalBoardId();
      this.newBoard.id = this.globalBoardIdRegistry;
      this.newBoard.name = boardName;
      this.newBoard.owner = this.currentUser.username;
      this.addBoard(this.newBoard);
      this.createBoard(this.newBoard);
      this.isBoards = true;
    },
    openBoard(id){
      this.setCurrentHomeComponent('Board');
      this.openSelectedBoardById(id);
      this.loadAllCards(id);
    }
  },
  components:{
    AddItem
  }
}
</script>

<style scoped>
  .boards{
    width: 100%;
    height: calc(100% - var(--navbar-height) - 50px);
    margin-top: var(--navbar-height);
    align-items: baseline;
  }

  .wrapper{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: calc(100% - 100px);
  }
/*
  .message{
    display: flex;
    flex-wrap: nowrap;
    padding: 20px;
    background: #ff9094;
    height: 40px;
    width: 100%;
    margin-top: 20px;
  }

  .message-content, .message-action{
    font-size: 35px;
    margin-left: 50px;
  }

  .message-content{
    font-weight: bold;
  }

  .message-action{
    cursor: pointer;
  }
*/
  .boards-title{
    padding-top: 60px;
    width: 100%;
    height: 40px;
    font-size: 40px;
    padding-left: 50px;
  }
  
  .user-board, .user-board-add{
    text-align: center;
    width: 200px;
    height: 150px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #c4c4c4;
    margin: 50px;
    position: relative;
  }

  .user-board{
    background: rgba(255, 255, 255, 0.3);
  }

  .user-board-add{
    border: 1px solid black;
  }

  .user-board img{
    width: 100%;
    height: 70%;
  }

  .user-board-add svg{
    padding: 12px;
    stroke: #353535;
    width: 80px;
    height: 80px;
  }

  .user-board-add:hover{
    color: white;
    border: 1px solid white;
  }

  .user-board-add:hover svg{
    stroke: white;
  }

  .user-board:hover {
    border: 1px solid white;
  }

  .user-board-name{
    padding: 15px 10px;
    text-align: center;
    font-size: 18px;
  }

  .board-control-item{
    transform: translateX(40px);
    padding: 10px;
    position: absolute;
    z-index: 5;
    top: 0;
    right: 0;
    width: 25px;
    height: 25px;
  }

  .board-control-item svg {
    fill: #000000;
    width: 100%;
    height: 100%;
  }

  .board-control-item:hover svg {
    fill: white;
  }
</style>