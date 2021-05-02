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
      clean('single-post', 'all-posts', 'my-posts', 'error');
      applyTemplate(targetId, 'three-posts-template', {posts:posts});
   },
    // View function to show the ten most recent posts
   tenMostRecentPostsView: function (targetId, posts){
      clean('single-post', 'all-posts', 'my-posts', 'error');
      applyTemplate(targetId, 'recent-posts-template', {posts:posts});
   
   }, 
    // View ten most popular posts based on number of likes 
   tenMostPopularPostsView: function (targetId, posts){
      clean('single-post', 'all-posts', 'my-posts', 'error');
      applyTemplate(targetId, 'popular-posts-template', {posts:posts});
   }, 
   singlePostView: function(targetId, post){
      clean('recent-posts', 'popular-posts', 'three-posts', 'all-posts', 'my-posts', 'error');
      applyTemplate(targetId, 'single-post-template', post);
   },
   userLoggedInView: function(targetId, user){
      applyTemplate(targetId, 'login-form-template', {user:user});
   },  
   allPostsView(targetId, posts){
      clean('recent-posts', 'popular-posts', 'three-posts', 'my-posts', 'error', 'single-post');
      applyTemplate(targetId, 'all-posts-template', {posts:posts});
   },
   myPostsView(targetId, posts){
      clean('recent-posts', 'popular-posts', 'three-posts', 'all-posts', 'error', 'single-post');
      applyTemplate(targetId, 'my-posts-template', {posts:posts});
   },
   showErrorView(targetId, error){
      if(error === 'userNotLoggedIn'){
         applyTemplate(targetId, 'error-form-template', {userLoginError:true});
      }else if(error === 'loginFailed'){
         applyTemplate(targetId, 'error-form-template', {loginFailed:true});
      }
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
 

 