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

 function applyTemplates(targetId, templateId, data){
   let target = document.getElementById(targetId);
   let template = Handlebars.compile(document.getElementById(templateId).textContent);
   target.innerHTML = template(data);
 }
 function firstThreePostsView(targetId, posts){
    applyTemplates(targetId, 'three-posts-template', {posts:posts})
 }
 // View function to show the ten most recent posts
 function tenMostRecentPostsView(targetId, posts){
    applyTemplates(targetId, 'recent-posts-template', {posts:posts})

 }
 function tenMostPopularPostsView(targetId, posts){
   applyTemplates(targetId, 'popular-posts-template', {posts:posts})

 }