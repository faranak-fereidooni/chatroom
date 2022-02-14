import {Chatroom} from "./chat.js"
//dom queries
const chatList = document.querySelector('.chat-list') ;
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-room')

// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message);
    newChatForm.reset();
});

// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    // show then hide the new username
    updateMssg.innerText = `your name was updated to ${newName}`;
    setTimeout (() => { updateMssg.innerText == '',3000});
});

rooms.addEventListener('click', e =>{
    if(e.target.tagName === 'BUTTON')
    chatUi.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => {chatUi.render(chat);})
});


 
// check localStorage for a name
const username = localStorage.username ? localStorage.username : 'anon';

// class instances
const chatUi = new ChatUi(chatList);
const chatroom = new Chatroom("general", username);

// get chats and render
chatroom.getChats(data => chatUi.render(data) );