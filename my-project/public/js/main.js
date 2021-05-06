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
    Model.updatePosts(); 
})
window.addEventListener('userLoginSuccess', ()=>{
    let isNotLogin = false;
    showError('')
    loadPage(); 
})

window.addEventListener('userLoginFailed', ()=>{
    loadPage(); 
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
window.addEventListener('postDeleted', (e)=>{
    Model.updatePosts();  
})

window.addEventListener('commentAdded', ()=>{
    Model.updatePosts(); 
})

window.addEventListener('logOut', ()=>{
    if(Util.splitHash(window.location.hash).path === ''){
        location.reload(); 
    }else{
        location.assign('/#')
    }
    
})
function loadPage(){
    let hash = Util.splitHash(window.location.hash);
    showError('')
    Views.userLoggedInView('login', Auth.getUser());
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
            console.log('Loading my posts view');
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
}

function loadSinglePostView(){
    let hash = Util.splitHash(window.location.hash);
    let post = Model.getPost(hash.id);
    post.isLogged = Auth.getUser(); 
    Views.singlePostView('single-post', post);
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
    let commentForm = document.getElementById('commentform');
    if(commentForm)commentForm.addEventListener('submit', addComment);
    let deleteButtons = document.getElementsByClassName('delete-button');
    if(deleteButtons){
        for(let i = 0; i < deleteButtons.length; i++){
            deleteButtons[i].addEventListener('click', deletePost);
        }
    }
    let logoutButton = document.getElementById('logout-button');
    if(logoutButton) logoutButton.addEventListener('click', logoutUser);
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
        'p_user': Auth.getUser(), 
        'p_author': Auth.getUser().username
    }
    Model.addPost(postData);
}

// Function to submit the new comment form 
function addComment(event){
    event.preventDefault(); 
    let commentData ={
        c_content: this.elements['c_content'].value, 
        c_author: Auth.getUser(), 
        c_post: Model.getPost(this.dataset.id)
    }
    Model.addComment(commentData);
}

function deletePost(){
    let post = Model.getPost(this.dataset.id); 
    Model.deletePost(post);
}
function logoutUser(){
    Auth.destroyJWT();
}