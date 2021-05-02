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

window.addEventListener('postAdded', ()=>{
    loadMyPostsView();
})
window.addEventListener('userLoginSuccess', ()=>{
    let isNotLogin = false;
    showError('')
    loadUserLoggedInResultView(isNotLogin);
})

window.addEventListener('userLoginFailed', ()=>{
    let isNotLogin = true; 
    showError('loginFailed');
})
window.addEventListener('likeAdded', (e)=>{
    console.log('Post was liked')
    Model.updatePosts(); 
})
window.onload = function() {
    Model.updatePosts(); 
};

window.onhashchange = function(){
    loadPage(); 
}

function loadPage(){
    let hash = Util.splitHash(window.location.hash);
    showError('')
    switch(hash.path){
        case '':
            console.log('Loading main view')
            loadMainPage();
            break;
        case 'posts':
            console.log('Loading single view')
            loadSinglePostView();
            break;
        case 'all-posts':
            console.log('Loading all posts view');
            loadAllPostsView(); 
            break; 
        case 'my-posts':
            if(Auth.getUser()){
                loadMyPostsView(); 
            }else{
                showError('userNotLoggedIn');
            }
            break;
    }
    bindings();
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

function loadUserLoggedInResultView(isNotLogin){
    loadUserLoggedInView();
}

function bindings(){
    let likeButtons = document.getElementsByClassName('like-button');
    for(let i = 0; i<likeButtons.length;i++){
        likeButtons[i].onclick = updateLikes;
    }
    let form = document.getElementById('login-form');
    let newPostForm = document.getElementById('postform');
    if(newPostForm) postform.addEventListener('submit', newPostFormSubmitted);
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

function loadAllPostsView(){
    Views.allPostsView('all-posts', Model.getRecentPosts(Model.getPosts().length));
}

function loadMyPostsView(){
    Views.myPostsView('my-posts', Model.getUserPosts(Auth.getUser().id))
}
function showError(error){
    Views.showErrorView('error',error);
}

function newPostFormSubmitted(event){
    event.preventDefault();
    let postData = {
        'p_url': this.elements['p_url'].value, 
        'p_caption': this.elements['p_caption'].value,
        'p_user': Auth.getUser()
    }
    Model.addPost(postData);
}