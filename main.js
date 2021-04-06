/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements main entry point...">
 *
 * Student Name:
 * Student Number:
 *
 */
import {firstThreePostsView, tenMostRecentPosts} from './views.js'
import {getRandomPosts, getTenRecentPosts} from './util.js'


function redraw() { 
    let content = "<h2>API Test</h2><ul>";
    content += "<li><a href='/#'>Three Posts</a></li>";
    content += "<li><a href='/#'>Recent Posts</a></li>";
    content += "<li><a href='/#'>Popular Posts</a></li>";
    content += "<li><a href='/posts/1'>A Single Post</a></li>"; 
    content += "</ul>";

    // update the page
    document.getElementById("target").innerHTML = content;
    listThreePosts(); 
    listTenRecentPosts();

}

window.onload = function() {
    redraw();
};


function listThreePosts(){
    fetch('/js/sample.json').then((response)=>{
        return response.json(); 
    }).then((data)=>{
        firstThreePostsView('three-posts', getRandomPosts(data, 3));
    })
}

function listTenRecentPosts(){
    fetch('/js/sample.json').then((response)=>{
        return response.json(); 
    }).then((data)=>{
        getTenRecentPosts(data)
    })
}
