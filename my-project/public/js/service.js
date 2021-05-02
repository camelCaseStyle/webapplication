/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements user authentication ...">
 *
 * Student Name:
 * Student Number:
 *
 */ 

export {Auth}

const Auth = {
    userData: null,

    // login - handle user login  
    //      by submitting a POST request to the server API
    //      username - is the input username
    //      password - is the input password
    // when the request is resolved, creates a "userLogin" event
    login: function(username, password) {
        const authInfo = {
            identifier: username, 
            password: password
        }
        fetch('/auth/local',{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(authInfo)
        }).then(response =>{
            return response.json();
        }).then(data=>{
            let event = null; 
            if(data.user){
                event = new CustomEvent('userLoginSuccess');
                this.userData = data; 
            }else{
                event = new CustomEvent('userLoginFailed');
            }
            window.dispatchEvent(event);
        }) 

    }, 

    //getUser - return the user object from userData
    getUser: function() {
        if (this.userData) {
            console.log(this.userData.user);
            return this.userData.user;
        } else {
            return null;
        }
    },

    //getJWT - get the JWT from userData
    getJWT: function() {
        if (this.userData) {
            return this.userData.jwt;
        } else {
            return null;
        } 
    }
    
}