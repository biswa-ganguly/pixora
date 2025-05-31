"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Remove auth-related state since Clerk handles it
  // isLoggedIn: false,  // Remove
  // user: null,         // Remove
  
  // Keep only app-specific user preferences
  theme: 'light',
  preferences: {
    autoSave: true,
    defaultFilters: {},
    favoriteImages: [],
  },
  recentProjects: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Remove auth actions since Clerk handles them
    // toggleActiveAuthType: (state, action) => { ... }, // Remove
    // updateUser: (state, action) => { ... },           // Remove
    
    // Add app-specific actions
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    
    addRecentProject: (state, action) => {
      state.recentProjects.unshift(action.payload);
      // Keep only last 10 projects
      if (state.recentProjects.length > 10) {
        state.recentProjects.pop();
      }
    },
    
    addFavoriteImage: (state, action) => {
      state.preferences.favoriteImages.push(action.payload);
    },
    
    removeFavoriteImage: (state, action) => {
      state.preferences.favoriteImages = state.preferences.favoriteImages.filter(
        id => id !== action.payload
      );
    },
  },
});

export const { 
  setTheme, 
  updatePreferences, 
  addRecentProject, 
  addFavoriteImage, 
  removeFavoriteImage 
} = userSlice.actions;
export default userSlice.reducer;