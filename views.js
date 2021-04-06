/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements view functions...">
 *
 * Student Name:
 * Student Number:
 *
 */


export {firstThreePostsView,tenMostRecentPosts} 

 // View function to show the first three posts 
 function firstThreePostsView(targetId, posts){
    let target = document.getElementById(targetId);
    let template = Handlebars.compile(document.getElementById('three-posts-template').textContent);
    let threePosts = template({posts:posts});
    target.innerHTML = threePosts; 
 }
 // View function to show the ten most recent posts

 function tenMostRecentPosts(targetId, posts){
    //
 }