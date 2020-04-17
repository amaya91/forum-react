import { LOAD_POSTS, ADD_POST, LOGIN } from './userActions';

const initialState = {
    email: "",
    password: "",
    userId: 0,
    posts: [],
    isAuthenticated: false
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                email: action.payload.email,
                userId: action.payload.userId,
                isAuthenticated: true,
            }
        }
        case LOAD_POSTS: {
            return {
                ...state,
                posts: action.payload
            }
        }
        case ADD_POST: {
            // let oldList = state.todoList
            // let newList = [...oldList, action.payload];
            return {
                ...state,
                post: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default user;