/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements view functions...">
 *
 * Student Name:
 * Student Number:
 *
 */


export {Views} 

const Views = {
     // View function to show the first three posts 
   firstThreePostsView: function (targetId, posts){
      clean('single-post');
      applyTemplate(targetId, 'three-posts-template', {posts:posts});
   },
    // View function to show the ten most recent posts
   tenMostRecentPostsView: function (targetId, posts){
      applyTemplate(targetId, 'recent-posts-template', {posts:posts});
   
   }, 
    // View ten most popular posts based on number of likes 
   tenMostPopularPostsView: function (targetId, posts){
      applyTemplate(targetId, 'popular-posts-template', {posts:posts});
   }, 
   singlePostView: function(targetId, post){
      clean('recent-posts', 'popular-posts', 'three-posts');
      applyTemplate(targetId, 'single-post-template', post);
   },
   userLoggedInView: function(targetId, user){
      if(user){
         console.log({user:user})
      }
      applyTemplate(targetId, 'login-form-template', {user:user});
   }
}


function applyTemplate (targetId, templateId, data){
   let target = document.getElementById(targetId);
   let template = Handlebars.compile(document.getElementById(templateId).textContent);
   target.innerHTML = template(data);
}
function clean(...targetIds){
   targetIds.forEach(targetId=>{
      let target = document.getElementById(targetId);
      target.innerHTML = '';
   })
   
}
 

 