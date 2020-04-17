export const LOGIN = '[User] Login';
export const LOAD_POSTS = '[User] Load Posts';
export const ADD_POST = '[User] Add Post';
export const LOGOUT = '[User] Logout';

export function login(user) {
    return {
        type: LOGIN,
        payload: user
    }    
};

export function addPost(post) {
    return {
        type: ADD_POST,
        payload: post
    }    
};

export function loadPosts(posts) {
    return {
        type: LOAD_POSTS,
        payload: posts
    }    
};