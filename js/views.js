/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements view functions...">
 *
 * Student Name:
 * Student Number:
 *
 */


export {firstThreePostsView,tenMostRecentPostsView, tenMostPopularPostsView} 

 // View function to show the first three posts 
 function firstThreePostsView(targetId, posts){
    let target = document.getElementById(targetId);
    let template = Handlebars.compile(document.getElementById('three-posts-template').textContent);
    let threePosts = template({posts:posts});
    target.innerHTML = threePosts; 
 }
 // View function to show the ten most recent posts

 function tenMostRecentPostsView(targetId, posts){
    let target = document.getElementById(targetId);
    let template = Handlebars.compile(document.getElementById('recent-posts-template').textContent);
    let tenMostRecentPosts = template({posts:posts});
    console.log(posts)
    target.innerHTML = tenMostRecentPosts; 
 }
 function tenMostPopularPostsView(targetId, posts){
   let target = document.getElementById(targetId);
   let template = Handlebars.compile(document.getElementById('popular-posts-template').textContent);
   let popularPosts = template({posts:posts});
   target.innerHTML = popularPosts; 
 }