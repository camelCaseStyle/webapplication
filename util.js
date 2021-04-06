/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements the utility functions...">
 *
 * Student Name:
 * Student Number:
 *
 */

export {splitHash, getRandomPosts,getTenRecentPosts};

// splitHash - given a hash path like "#!/people/2" 
//   return an object with properties `path` ("people") and `id` (2)
function splitHash(hash) {

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
}

// getRandomint - given a max and min, like 0 and 3 
// returns a random integer including min but excluding max 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function getRandomPosts(totalPosts, numberOfposts){
    let i = 0;
    let posts = [];  
    while(i < numberOfposts){
        let selectedPost = totalPosts[getRandomInt(0, totalPosts.length)];
        if(!posts.includes(selectedPost)){
            posts.push(selectedPost);
            i++;
        }
    }
    return posts;
}

function getTenRecentPosts(posts){
    console.log('Before Sorting: '+ JSON.stringify(posts))
    posts.sort(compareDate);
    console.log('After Sorting: '+ JSON.stringify(posts))
}

function compareDate(a,b){
    if(a.published_at > b.published_at){
        return 1;
    }else if(a.published_at < b.published_at){
        return -1;
    }
    return 0; 
}