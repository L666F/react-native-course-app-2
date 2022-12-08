import React from 'react';

import createDataContext from './createDataContext';

export type BlogState = { blogPosts: BlogPost[] };

// Define the initial state of the blog posts
const initialState: BlogState = {
  blogPosts: [],
};

// Define the shape of a blog post
export interface BlogPost {
  id: number;
  title: string;
  content: string;
}

// Define a type of possible action payloads
type ActionPayloadTypes = { id?: number; title?: string; content?: string };

// Define an enumeration of possible action types
export enum ActionType {
  ADD_BLOG_POST = 'addBlogPost',
  EDIT_BLOG_POST = 'editBlogPost',
  DELETE_BLOG_POST = 'deleteBlogPost',
}

// Define a reducer function to update the state
const blogReducer = (
  state = initialState,
  action: { type: ActionType; payload?: ActionPayloadTypes }
) => {
  switch (action.type) {
    case ActionType.ADD_BLOG_POST:
      // When the ADD_BLOG_POST action is dispatched,
      // add a new blog post to the list
      return {
        ...state,
        blogPosts: [
          ...state.blogPosts,
          {
            id: Math.floor(Math.random() * 99999),
            title: action.payload?.title,
            content: action.payload?.content,
          },
        ],
      };

    case ActionType.EDIT_BLOG_POST:
      // When the EDIT_BLOG_POST action is dispatched,
      // edits and existing blog post in the list
      return {
        ...state,
        blogPosts: state.blogPosts.map((bp) =>
          bp.id === action.payload?.id
            ? {
                id: bp.id,
                title: action.payload.title,
                content: action.payload.content,
              }
            : bp
        ),
      };

    case ActionType.DELETE_BLOG_POST:
      return {
        ...state,
        blogPosts: [
          ...state.blogPosts.filter(
            (blogPost) => blogPost.id !== action.payload?.id
          ),
        ],
      };

    default:
      // For any other action types, return the state as-is
      return state;
  }
};

// Define a method to dispatch an action to add a new blog post
function addBlogPost(
  dispatch: React.Dispatch<{
    type: ActionType;
    payload: ActionPayloadTypes;
  }>
) {
  return (actionPayload: ActionPayloadTypes) => {
    dispatch({ type: ActionType.ADD_BLOG_POST, payload: actionPayload });
  };
}

function editBlogPost(
  dispatch: React.Dispatch<{
    type: ActionType;
    payload: ActionPayloadTypes;
  }>
) {
  return (actionPayload: ActionPayloadTypes) => {
    dispatch({ type: ActionType.EDIT_BLOG_POST, payload: actionPayload });
  };
}

function deleteBlogPost(
  dispatch: React.Dispatch<{
    type: ActionType;
    payload: ActionPayloadTypes;
  }>
) {
  return (actionPayload: ActionPayloadTypes) => {
    dispatch({ type: ActionType.DELETE_BLOG_POST, payload: actionPayload });
  };
}

export const { Context, Provider } = createDataContext<
  BlogState,
  ActionType,
  ActionPayloadTypes
>(blogReducer, { addBlogPost, editBlogPost, deleteBlogPost }, initialState);
