/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements view functions...">
 *
 * Student Name:
 * Student Number:
 *
 */

 // View function to show the first three posts 
 function firstThreePostsView(targetId, posts){
    let target = document.getElementById(targetId);
    let template = Handlebars.compile(document.getElementById('three-posts').innerText);
    let posts = template({posts:posts});
    target.innerHTML = posts; 
 }