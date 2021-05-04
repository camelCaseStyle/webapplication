export {Model};
/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements ...">
 *
 * Student Name:
 * Student Number:
 *
 */

/* 
 * Model class to support the FlowTow application
 * this object provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates different events:
 *   "modelUpdated" event when new data has been retrieved from the API
 *   "postAdded" event when a request to add a new post returns
 *   "likeAdded" event when a request to add a new like returns
 *   "commentAdded" event when a request to add a new comment returns 
*/
import {Auth} from './service.js';
const Model = {
    postsUrl: '/posts', 
    uploadUrl: '/upload',  
    commentsUrl: '/comments',
    serverUrl: 'http://localhost:1337',
    
    //this will hold the post data stored in the model
    data: {
        posts: []
    },
    // updatePosts - retrieve the latest list of posts from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    updatePosts: function() {
        fetch(this.serverUrl+this.postsUrl).then(response =>{
            return response.json();
        }).then((data)=>{
            this.data.posts = data;
            console.log(this.data.posts) 
            let event = new CustomEvent('modelUpdated');
            window.dispatchEvent(event);
        })
    },

    // getPosts - return an array of post objects
    getPosts: function() {
        //before that you may need to sort the posts by their timestamp
        return this.data.posts;
    },

    // getPost - return a single post given its id
    getPost: function(postid) {
        let i = 0;
        while(this.data.posts[i].id != postid){
            i++; 
        }
        return this.data.posts[i]; 
    },

    setPosts: function(posts) {
        this.data.posts = posts;
    },

    // addPost - add a new post by submitting a POST request to the server API
    // postData is an object containing all fields in the post object (e.g., p_caption)
    // when the request is resolved, creates an "postAdded" event
    addPost: function(postData) {
        console.log(postData);
        fetch(this.postsUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${Auth.getJWT()}`
            }, 
            body: JSON.stringify(postData)
        }).then(response =>{
            return response.json()
        }).then(data =>{
            this.data.posts.push(data);
            let event = new CustomEvent('postAdded');
            window.dispatchEvent(event);
        })
    },

    // getUserPosts - return just the posts for one user as an array
    getUserPosts: function(userid) {
        return this.data.posts.filter(post => post.p_user.id === userid).sort(compareDate);
    },

    // addLike - increase the number of likes by 1 
    //      by submitting a PUT request to the server API
    //      postId - is the id of the post
    // when the request is resolved, creates an "likeAdded" event
    addLike: function (postId) {
        let likes = Number(this.getPost(postId).p_likes);
        likes += 1; 
        let updatedLikes = {
            p_likes: likes
        }
        let url = this.serverUrl+this.postsUrl+'/'+postId;
        fetch(url,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${Auth.getJWT()}`
            },
            body: JSON.stringify(updatedLikes)
        }).then(()=>{
            let event = new CustomEvent('likeAdded');
            window.dispatchEvent(event);
        })
    },

    // addComment - add a comment to a post 
    //      by submitting a POST request to the server API
    //      commentData is an object containing the content of the comment, the author and the postid
    // when the request is resolved, creates an "commentAdded" event
    // TO DO
    addComment: function (commentData) {
        fetch(this.commentsUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${Auth.getJWT()}`
            },
            body: JSON.stringify(commentData)
        }).then(response =>{
            return response.json()
        }).then(data=>{
            console.log(data);
            let event = new CustomEvent('commentAdded');
            window.dispatchEvent(event);
        })
    },

    //getRandomPosts - return N random posts as an array
    getRandomPosts: function(N){
        let i = 0;
        let posts = []; 
        while(i != N){
            let selectedPost = this.data.posts[getRandomInt(0, this.data.posts.length)];
            if(!posts.includes(selectedPost)){
                posts.push(selectedPost);
                i++;
            }
        }
        return posts;
    },

    // getRecentPosts - return the N most recent as an array
    //  posts, ordered by timestamp, most recent first
    getRecentPosts: function(N) {
        let posts = this.data.posts.slice(0,N);
        posts.sort(compareDate);
        posts.forEach(post => post.published_at = new Date(post.published_at).toDateString())
        return posts;
    },

    // getPopularPosts - return the N most popular as an array
    // posts, ordered by the number of likes
    getPopularPosts: function(N) {
        this.data.posts.sort((a,b)=>b.p_likes-a.p_likes);
        return this.data.posts.slice(0,N); 
    },

}


/**
 * 
 * @param {post} a One post element used to compare
 * @param {post} b One post element used to compare agaisnt a 
 */

function compareDate (a,b){
    a.published_at = new Date(a.published_at);
    b.published_at = new Date(b.published_at);
    return b.published_at - a.published_at;
}

/**
 * 
 * @param {number} inclusive min minimum bound to generate a random number 
 * @param {number} exclusive maximum bound for random number 
 * @returns number between min but not including max
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}