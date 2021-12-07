<template>
  <div class="board-header">
    <div class="board-header-icon-holder current-board-name">
      Board name
    </div>
    <div class="vertical-delimiter"></div>
    <div class="board-header-icon-holder workspace-owner">
      Whose workspace
    </div>
    <div class="vertical-delimiter"></div>
    <div class="board-header-icon-holder invite-to-workspace">
      Invite
    </div>
    <div class="enrolled-users-holder">
      <div class="enrolled-user">
        <img src="../../resources/img/render/logo.png" alt=""/>
      </div>
      <div class="enrolled-user">
        <img src="../../resources/img/render/logo-two.png" alt=""/>
      </div>
      <div class="enrolled-user">
        <img src="../../resources/img/render/logo.png" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardHeader"
}
</script>

<style>

.board-header {
  width: 100%;
  height: var(--board-header-height);
  margin-top: var(--navbar-height);
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  flex-wrap: nowrap;
  -ms-align-items: center;
  align-items: center;
  justify-content: flex-start;
}

.vertical-delimiter {
  background: var(--default-vertical-delimiter);
  width: 1px;
  height: 20px;
  margin: 10px;
}

.board-header-icon-holder {
  height: var(--default-board-header-elements-dimensions);
  background: var(--default-board-header-elements-color);
  font-size: 1.125rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
  border-radius: 5px;
  color: var(--default-upper-font-color);
  letter-spacing: 0.05em;
  overflow: hidden;
}

.current-board-name {
  margin-left: 70px;
  width: 250px;
  font-weight: bold;
}

.workspace-owner {
  width: 170px;
}

.invite-to-workspace {
  width: 70px;
}

.enrolled-users-holder {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  justify-content: center;
  max-width: 400px;
}

.enrolled-users-holder:hover .enrolled-user {
  margin-left: 10px;
  transition: .3s;
}

.enrolled-user {
  margin-left: -25px;
}

.enrolled-user:first-child {
  margin-right: 0;
  margin-left: 20px !important;
}
</style>