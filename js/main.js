/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements main entry point...">
 *
 * Student Name:
 * Student Number:
 *
 */
import {Util} from './util.js'
import {Model} from './model.js'
import {Views} from './views.js'


function redraw() { 
    let content = "<h2>API Test</h2><ul>";
    content += "<li><a href='/#'>Three Posts</a></li>";
    content += "<li><a href='/#'>Recent Posts</a></li>";
    content += "<li><a href='/#'>Popular Posts</a></li>";
    content += "<li><a href='/posts/1'>A Single Post</a></li>"; 
    content += "</ul>";

    // update the page
    document.getElementById("target").innerHTML = content;
     
}
window.addEventListener('modelUpdated', (e)=>{
    loadPage(); 
})
window.addEventListener('likeAdded', (e)=>{
    console.log('Post was liked')
    location.reload(); 
})
window.onload = function() {
    Model.updatePosts(); 
    redraw(); 
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
}

function loadSinglePostView(){
    let hash = Util.splitHash(window.location.hash);
    Views.singlePostView('single-post', Model.getPost(hash.id));
}

function bindings(){
    let likeButtons = document.getElementsByClassName('like-button');
    console.log(likeButtons)
    for(let i = 0; i<likeButtons.length;i++){
        likeButtons[i].onclick = updateLikes;
    }
}
function updateLikes(){
    console.log('Like was added')
    Model.addLike(this.dataset.id);
}