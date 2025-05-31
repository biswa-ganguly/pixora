import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "",
  filters: {
    brightness: 100,
    grayscale: 0,
    saturate: 100,
    contrast: 100,
    rotate: 0,
  },
  textOverlay: false,
  textOverlayOptions: {
    top: 50,
    left: 50,
    transform: "translate(-50%, -50%)",
    color: "#ffffff",
    fontSize: 18,
    bold: false,
    italic: false,
    value: "Hello",
    fontFamily: "Arial, sans-serif",
    textShadow: false,
    shadowColor: "#000000",
    shadowBlur: 2,
  },
  drawing: {
    enabled: false,
    brushSize: 5,
    brushColor: "#000000",
    brushOpacity: 100,
    brushType: "pen", // pen, marker, highlighter
    paths: [], // Store drawing paths
  },
  canvas: {
    history: [], // For undo/redo functionality
    currentStep: -1,
  },
  ui: {
    activeTab: "filters", // filters, text, drawing
    isMobileOpen: false,
    activeFilter: "",
  },
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    // Image URL
    updateImageUrl: (state, action) => {
      state.url = action.payload;
    },

    // Filter Management
    updateImageFilters: (state, action) => {
      const { filterName, value } = action.payload;
      state.filters[filterName] = value;
    },

    setActiveFilter: (state, action) => {
      state.ui.activeFilter = action.payload;
    },

    // Text Overlay
    toggleTextOverlay: (state) => {
      state.textOverlay = !state.textOverlay;
    },

    updateTextOverlayOptions: (state, action) => {
      const { property, value } = action.payload;
      state.textOverlayOptions[property] = value;
    },

    addEmojiToText: (state, action) => {
      state.textOverlayOptions.value += action.payload;
    },

    // Drawing Functions
    toggleDrawing: (state) => {
      state.drawing.enabled = !state.drawing.enabled;
    },

    updateDrawingSettings: (state, action) => {
      const { property, value } = action.payload;
      state.drawing[property] = value;
    },

    addDrawingPath: (state, action) => {
      state.drawing.paths.push(action.payload);
    },

    clearDrawing: (state) => {
      state.drawing.paths = [];
    },

    removeLastPath: (state) => {
      state.drawing.paths.pop();
    },

    // Canvas History (for undo/redo)
    addToHistory: (state, action) => {
      // Remove any history after current step (when user makes new action after undo)
      state.canvas.history = state.canvas.history.slice(0, state.canvas.currentStep + 1);
      
      // Add new state to history
      state.canvas.history.push(action.payload);
      state.canvas.currentStep += 1;
      
      // Limit history to 20 steps
      if (state.canvas.history.length > 20) {
        state.canvas.history.shift();
        state.canvas.currentStep -= 1;
      }
    },

    undo: (state) => {
      if (state.canvas.currentStep > 0) {
        state.canvas.currentStep -= 1;
        const previousState = state.canvas.history[state.canvas.currentStep];
        
        // Restore previous state
        state.filters = { ...previousState.filters };
        state.textOverlay = previousState.textOverlay;
        state.textOverlayOptions = { ...previousState.textOverlayOptions };
        state.drawing.paths = [...previousState.drawingPaths];
      }
    },

    redo: (state) => {
      if (state.canvas.currentStep < state.canvas.history.length - 1) {
        state.canvas.currentStep += 1;
        const nextState = state.canvas.history[state.canvas.currentStep];
        
        // Restore next state
        state.filters = { ...nextState.filters };
        state.textOverlay = nextState.textOverlay;
        state.textOverlayOptions = { ...nextState.textOverlayOptions };
        state.drawing.paths = [...nextState.drawingPaths];
      }
    },

    // UI Management
    setActiveTab: (state, action) => {
      state.ui.activeTab = action.payload;
    },

    toggleMobileSidebar: (state) => {
      state.ui.isMobileOpen = !state.ui.isMobileOpen;
    },

    closeMobileSidebar: (state) => {
      state.ui.isMobileOpen = false;
    },

    // Reset Functions
    resetImageFilters: (state) => {
      state.filters = { ...initialState.filters };
    },

    resetTextOverlay: (state) => {
      state.textOverlay = initialState.textOverlay;
      state.textOverlayOptions = { ...initialState.textOverlayOptions };
    },

    resetDrawing: (state) => {
      state.drawing = { ...initialState.drawing };
    },

    resetImageOptions: (state) => {
      state.filters = { ...initialState.filters };
      state.textOverlay = initialState.textOverlay;
      state.textOverlayOptions = { ...initialState.textOverlayOptions };
      state.drawing = { ...initialState.drawing };
      state.ui.activeFilter = "";
    },

    resetAll: (state) => {
      return { ...initialState, url: state.url };
    },

    // Preset Filters
    applyPresetFilter: (state, action) => {
      const presets = {
        vintage: {
          brightness: 110,
          contrast: 120,
          saturate: 80,
          grayscale: 20,
        },
        dramatic: {
          brightness: 90,
          contrast: 150,
          saturate: 130,
          grayscale: 0,
        },
        soft: {
          brightness: 120,
          contrast: 90,
          saturate: 70,
          grayscale: 0,
        },
        blackWhite: {
          brightness: 100,
          contrast: 110,
          saturate: 0,
          grayscale: 100,
        },
      };

      const preset = presets[action.payload];
      if (preset) {
        state.filters = { ...state.filters, ...preset };
      }
    },
  },
});

export const {
  // Image
  updateImageUrl,
  
  // Filters
  updateImageFilters,
  setActiveFilter,
  resetImageFilters,
  applyPresetFilter,
  
  // Text
  toggleTextOverlay,
  updateTextOverlayOptions,
  addEmojiToText,
  resetTextOverlay,
  
  // Drawing
  toggleDrawing,
  updateDrawingSettings,
  addDrawingPath,
  clearDrawing,
  removeLastPath,
  resetDrawing,
  
  // History
  addToHistory,
  undo,
  redo,
  
  // UI
  setActiveTab,
  toggleMobileSidebar,
  closeMobileSidebar,
  
  // Reset
  resetImageOptions,
  resetAll,
} = imageSlice.actions;

export default imageSlice.reducer;

// Selectors for easier state access
export const selectImage = (state) => state.image;
export const selectFilters = (state) => state.image.filters;
export const selectTextOverlay = (state) => state.image.textOverlay;
export const selectTextOverlayOptions = (state) => state.image.textOverlayOptions;
export const selectDrawing = (state) => state.image.drawing;
export const selectUI = (state) => state.image.ui;
export const selectCanUndo = (state) => state.image.canvas.currentStep > 0;
export const selectCanRedo = (state) => state.image.canvas.currentStep < state.image.canvas.history.length - 1;