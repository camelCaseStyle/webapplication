/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements main entry point...">
 *
 * Student Name:
 * Student Number:
 *
 */
import {Util} from './util.js';
import {Model} from './model.js';
import {Views} from './views.js';
import {Auth} from './service.js';

window.addEventListener('modelUpdated', (e)=>{
    loadPage(); 
})

window.addEventListener('userLogin', ()=>{
    loadUserLoggedInView();
})
window.addEventListener('likeAdded', (e)=>{
    console.log('Post was liked')
    location.reload(); 
})
window.onload = function() {
    Model.updatePosts(); 
};

window.onhashchange = function(){
    loadPage(); 
}

function loadPage(){
    let hash = Util.splitHash(window.location.hash);
    if(hash.path ===''){
        console.log('Loading main view')
        loadMainPage();
        bindings();
    }else {
        console.log('Loading single view')
        loadSinglePostView();
        bindings();
    }
}

// loads all  views
function loadMainPage(){
    Views.firstThreePostsView('three-posts', Model.getRandomPosts(3));
    Views.tenMostRecentPostsView('recent-posts', Model.getRecentPosts(10));
    Views.tenMostPopularPostsView('popular-posts', Model.getPopularPosts(10));
    Views.userLoggedInView('login', Auth.getUser());
}

function loadSinglePostView(){
    let hash = Util.splitHash(window.location.hash);
    Views.userLoggedInView('login', Auth.getUser());
    Views.singlePostView('single-post', Model.getPost(hash.id));
}

function loadUserLoggedInView(){
    Views.userLoggedInView('login', Auth.getUser());
}

function bindings(){
    let likeButtons = document.getElementsByClassName('like-button');
    for(let i = 0; i<likeButtons.length;i++){
        likeButtons[i].onclick = updateLikes;
    }
    let form = document.getElementById('login-form');
    if(form)form.addEventListener('submit', formSubmitted);
}
function updateLikes(){
    Model.addLike(this.dataset.id);
}
function formSubmitted(event){
    event.preventDefault(); 
    const userName = this.elements['username'].value; 
    const password = this.elements['password'].value; 
    Auth.login(userName, password);
}