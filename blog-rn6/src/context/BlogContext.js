import jsonServer from "../apis/json-server";
import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_posts":
      return action.payload; //returned the data as received from the server
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
    } catch (err) {
      console.error(err);
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
const deleteBlogPost = (dispatch) => {

  return async (id) => {
    await jsonServer.delete(`/blogPosts/${id}`, )
    // dispatch({ type: "delete_blogpost", payload: id }); //though not necessary anymore but for tutorial purposes
  };
};
const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogPosts/${id}`, { title, content });

    dispatch({
      type: "edit_blogpost",
      payload: { id, title, content },
    });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
