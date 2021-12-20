<template>
  <div class="boards">
    <AddItem v-on:add="createLocalBoard($event)" v-on:close="isNewBoard = !isNewBoard" v-if="isNewBoard" :displayedTitle="'Add Board'"/>
    <div class="boards-title">
      Your boards
    </div>
    <div class="wrapper">
      <div class="message" v-if="!isBoards">
        <div class="message-content">
          You currently have no boards...
        </div>
        <div class="message-action" @click="isNewBoard = !isNewBoard">
          create one
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
    ...mapActions(['loadAllCards', 'createBoard', 'deleteBoard']),
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

  .boards-title{
    padding-top: 60px;
    width: 100%;
    height: 40px;
    font-size: 40px;
    padding-left: 50px;
  }
  
  .user-board{
    width: 200px;
    height: 150px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #c4c4c4;
    margin: 50px;
    position: relative;
  }

  .user-board img{
    width: 100%;
    height: 70%;
  }

  .user-board:hover {
    border: 1px solid red;
  }

  .user-board-name{
    padding: 10px 5px;
    text-align: center;
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
    fill: red;
  }
</style>