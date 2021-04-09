/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements the utility functions...">
 *
 * Student Name:
 * Student Number:
 *
 */

export {Util}

// splitHash - given a hash path like "#!/people/2" 
//   return an object with properties `path` ("people") and `id` (2)


const Util = {
    splitHash: function (hash) {

        const regex = "#!/([^/]*)/?(.*)?";
        const match = hash.match(regex);
        if (match) {
            return {
                path: match[1],
                id: match[2]
            }
        } else {
            return { path: "" }
        }
    },
    
    // getRandomint - given a max and min, like 0 and 3 
    // returns a random integer including min but excluding max 

    getRecentPosts: function (posts, N){
        posts.sort(compareDate);
        posts.forEach(element => {
            element.published_at = new Date(element.published_at).toDateString();
        });
        return posts.slice(0, N);
    },
    
    getPopularPosts: function(posts){   
        posts.sort((a,b)=>a-b);
        return posts; 
    },

}


// Helper funtions for Util 

