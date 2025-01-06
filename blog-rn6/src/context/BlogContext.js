import { Alert } from "react-native";
import jsonServer from "../apis/json-server";
import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_posts":
      return action.payload; //returned the data as received in the action payload
    case "edit_blogpost": 
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
      case 'add_blogpost': //not used here anymore but retained for tutorial purposes
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content
        }
      ];
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    try {
      const response = await jsonServer.get("/blogPosts");
      dispatch({ type: "get_posts", payload: response.data });
    } catch (error) {
      Alert.alert("Error:", error.message)
    }
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post("/blogPosts", { title, content });
 //no need to fetch the latest state with dispatch as we 
 // already handled that with the listener in indexScreen
    if (callback) callback();
  };
};

//using Optimistic Update (Local First, API Later)
const deleteBlogPost = (dispatch) => {
  return async (id, state) => {
    const previousState = [...state]; // Make a copy of the current state fo error handling
    dispatch({ type: "delete_blogpost", payload: id }); // Immediate state update
    try {
      await jsonServer.delete(`/blogPosts/${id}`);
    } catch (error) {
      Alert.alert("Error:", error.message)
    dispatch({ type: "get_posts", payload: previousState }); // // rollback to the previous state

    }
  };
};

// using Synchronous (Wait for Server, Then Update State)
const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    try{
      await jsonServer.put(`/blogPosts/${id}`, { title, content });

      dispatch({
        type: "edit_blogpost",
        payload: { id, title, content },
      });
      if (callback) {
        callback();
      }
    }
    catch (error) {
      Alert.alert("Error:", error.message)
      //No need for rollback here since we are using synchronous approach
      }
    
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
