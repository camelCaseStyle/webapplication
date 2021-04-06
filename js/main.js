/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements main entry point...">
 *
 * Student Name:
 * Student Number:
 *
 */
import {firstThreePostsView, tenMostRecentPostsView, tenMostPopularPostsView} from './views.js'
import {getRandomPosts, getTenRecentPosts,getPopularPosts} from './util.js'


function redraw() { 
    let content = "<h2>API Test</h2><ul>";
    content += "<li><a href='/#'>Three Posts</a></li>";
    content += "<li><a href='/#'>Recent Posts</a></li>";
    content += "<li><a href='/#'>Popular Posts</a></li>";
    content += "<li><a href='/posts/1'>A Single Post</a></li>"; 
    content += "</ul>";

    // update the page
    document.getElementById("target").innerHTML = content;
    loadAllViews();
     
}

window.onload = function() {
    redraw();
};
// loads all  views
function loadAllViews(){
    fetch('/js/sample.json').then(response=>{
        return response.json();
    }).then(data=>{
        listThreePosts(data); 
        listTenRecentPosts(data);
        listPopularPosts(data);
    })
}

function listThreePosts(data){
    firstThreePostsView('three-posts', getRandomPosts(data, 3));
}

function listTenRecentPosts(data){
    tenMostRecentPostsView('recent-posts', getTenRecentPosts(data));
}

function listPopularPosts(data){
    tenMostPopularPostsView('popular-posts', getPopularPosts(data));
}
