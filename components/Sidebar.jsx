import React, { useState, useEffect } from 'react';
import { FontBoldIcon, FontItalicIcon } from '@radix-ui/react-icons';
import { 
  LuSave, 
  LuUndo, 
  LuPalette, 
  LuType, 
  LuSmile, 
  LuPaintBrush,
  LuRotateCw,
  LuRotateCcw,
  LuSettings,
  LuImage,
  LuMenu,
  LuX,
  LuPaintbrush
} from 'react-icons/lu';
import { RxCross1 } from 'react-icons/rx';

const Sidebar = () => {
  // Mock image state
  const [image, setImage] = useState({
    url: "https://via.placeholder.com/800x600/4f46e5/ffffff?text=Sample+Image",
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
      color: "#fff",
      fontSize: 18,
      bold: false,
      italic: false,
      value: "Hello World",
    }
  });

  const [activeFilter, setActiveFilter] = useState("");
  const [activeTab, setActiveTab] = useState("filters");
  const [drawingMode, setDrawingMode] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("#000000");

  // Popular emojis
  const popularEmojis = [
    "😀", "😂", "🥰", "😍", "🤔", "😎", "🔥", "❤️",
    "👍", "👏", "🎉", "✨", "🌟", "💯", "🚀", "🎨"
  ];

  const filters = ["brightness", "contrast", "saturate", "grayscale"];

  const hasFilters = Object.keys(image.filters).some(
    (key) => image.filters[key] !== undefined && 
    image.filters[key] !== 0 && 
    image.filters[key] !== 100
  );

  const getDefaultValue = (filter) => {
    return filter === "brightness" || filter === "contrast" ? 100 : 0;
  };

  const updateFilter = (filterName, value) => {
    setImage(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterName]: value
      }
    }));
  };

  const updateTextOverlay = (property, value) => {
    setImage(prev => ({
      ...prev,
      textOverlayOptions: {
        ...prev.textOverlayOptions,
        [property]: value
      }
    }));
  };

  const toggleTextOverlay = () => {
    setImage(prev => ({
      ...prev,
      textOverlay: !prev.textOverlay
    }));
  };

  const resetFilters = () => {
    setImage(prev => ({
      ...prev,
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
        color: "#fff",
        fontSize: 18,
        bold: false,
        italic: false,
        value: "Hello World",
      }
    }));
    setActiveFilter("");
  };

  const addEmoji = (emoji) => {
    updateTextOverlay("value", image.textOverlayOptions.value + emoji);
  };


  const TabButton = ({ id, icon: Icon, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        isActive 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon size={16} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  const Sidebar = () => (
    <div className={`bg-white border border-gray-200 shadow-xl lg:w-80 ${
      !image.url && "pointer-events-none opacity-50"
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <LuImage className="text-white" size={20} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">Image Editor</h2>
            <p className="text-xs text-gray-600">Professional tools</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="p-4 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-2">
          <TabButton
            id="filters"
            icon={LuSettings}
            label="Filters"
            isActive={activeTab === "filters"}
            onClick={() => setActiveTab("filters")}
          />
          <TabButton
            id="text"
            icon={LuType}
            label="Text & Draw"
            isActive={activeTab === "text"}
            onClick={() => setActiveTab("text")}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="max-h-96 lg:max-h-none overflow-y-auto p-4 space-y-4">
        
        {/* Filters Tab */}
        {activeTab === "filters" && (
          <div className="space-y-4">
            {/* Filter Buttons */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <LuPalette size={16} />
                Image Filters
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      activeFilter === filter
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveFilter(activeFilter === filter ? "" : filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>

              {/* Filter Slider */}
              {activeFilter && (
                <div className="mt-4 p-3 bg-white rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {activeFilter}
                    </span>
                    <span className="text-sm text-blue-600 font-semibold">
                      {image.filters[activeFilter] ?? getDefaultValue(activeFilter)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={200}
                    step={1}
                    value={image.filters[activeFilter] ?? getDefaultValue(activeFilter)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    onChange={(e) => updateFilter(activeFilter, parseInt(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>200</span>
                  </div>
                </div>
              )}
            </div>

            {/* Rotation Controls */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-3">Rotation</h3>
              <div className="flex gap-2">
                <button 
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors"
                  onClick={() => updateFilter('rotate', image.filters.rotate - 90)}
                >
                  <LuRotateCcw size={16} />
                  <span className="text-sm font-medium">Left</span>
                </button>
                <button 
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-white border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors"
                  onClick={() => updateFilter('rotate', image.filters.rotate + 90)}
                >
                  <LuRotateCw size={16} />
                  <span className="text-sm font-medium">Right</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Text & Draw Tab */}
        {activeTab === "text" && (
          <div className="space-y-4">
            {/* Text Overlay */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <LuType size={16} />
                  Text Overlay
                </h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={image.textOverlay}
                    onChange={toggleTextOverlay}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {image.textOverlay && (
                <div className="space-y-3 animate-fadeIn">
                  {/* Text Input */}
                  <input
                    type="text"
                    placeholder="Enter your text..."
                    className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={image.textOverlayOptions.value}
                    onChange={(e) => updateTextOverlay("value", e.target.value)}
                  />

                  {/* Font Controls */}
                  <div className="grid grid-cols-4 gap-2">
                    <input
                      type="number"
                      min={8}
                      max={100}
                      className="p-2 border border-purple-200 rounded-lg text-center"
                      value={image.textOverlayOptions.fontSize}
                      onChange={(e) => updateTextOverlay("fontSize", parseInt(e.target.value))}
                    />
                    <button
                      className={`p-2 border border-purple-200 rounded-lg transition-colors ${
                        image.textOverlayOptions.bold
                          ? "bg-purple-600 text-white"
                          : "bg-white hover:bg-purple-50"
                      }`}
                      onClick={() => updateTextOverlay("bold", !image.textOverlayOptions.bold)}
                    >
                      <FontBoldIcon />
                    </button>
                    <button
                      className={`p-2 border border-purple-200 rounded-lg transition-colors ${
                        image.textOverlayOptions.italic
                          ? "bg-purple-600 text-white"
                          : "bg-white hover:bg-purple-50"
                      }`}
                      onClick={() => updateTextOverlay("italic", !image.textOverlayOptions.italic)}
                    >
                      <FontItalicIcon />
                    </button>
                    <input
                      type="color"
                      className="p-1 border border-purple-200 rounded-lg cursor-pointer"
                      value={image.textOverlayOptions.color}
                      onChange={(e) => updateTextOverlay("color", e.target.value)}
                    />
                  </div>

                  {/* Position Controls */}
                  {["top", "left"].map((pos) => (
                    <div key={pos} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700 capitalize">
                          {pos === "top" ? "Vertical" : "Horizontal"}
                        </span>
                        <span className="text-purple-600 font-semibold">
                          {image.textOverlayOptions[pos]}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={image.textOverlayOptions[pos]}
                        className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                        onChange={(e) => updateTextOverlay(pos, parseInt(e.target.value))}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Emoji Section */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <LuSmile size={16} />
                Quick Emojis
              </h3>
              <div className="grid grid-cols-8 gap-2">
                {popularEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    className="p-2 text-lg hover:bg-yellow-100 rounded-lg transition-colors border border-yellow-200"
                    onClick={() => addEmoji(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Drawing Tools */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <LuPaintbrush size={16} />
                  Drawing Tools
                </h3>
                <button
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    drawingMode
                      ? "bg-green-600 text-white"
                      : "bg-white border border-green-200 text-green-700 hover:bg-green-50"
                  }`}
                  onClick={() => setDrawingMode(!drawingMode)}
                >
                  {drawingMode ? "Drawing" : "Draw"}
                </button>
              </div>

              <div className="space-y-3">
                {/* Brush Size */}
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Brush Size</span>
                    <span className="text-green-600 font-semibold">{brushSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={brushSize}
                    className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  />
                </div>

                {/* Brush Color */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Color:</span>
                  <input
                    type="color"
                    value={brushColor}
                    onChange={(e) => setBrushColor(e.target.value)}
                    className="flex-1 h-8 border border-green-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          <LuSave size={18} />
          Save Image
        </button>
        
        {hasFilters && (
          <button 
            onClick={resetFilters}
            className="w-full flex items-center justify-center gap-2 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            <LuUndo size={18} />
            Reset All
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <LuImage className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Image Editor Pro</h1>
              <p className="text-sm text-gray-600 hidden sm:block">Professional image editing tool</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Help
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 flex flex-col lg:flex-row min-h-screen">
        
        {/* Desktop Sidebar - Left side on large screens */}
        <div className="hidden lg:block lg:w-80 lg:fixed lg:left-0 lg:top-20 lg:bottom-0 lg:overflow-hidden">
          <Sidebar />
        </div>

        {/* Image Editor - Main content area */}
        {/* <div className="flex-1 lg:ml-80 p-4"> */}
          {/* <div className="border-2 border-gray-400 border-dashed dark:border-gray-700 h-[50vh] lg:h-[88vh] relative bg-white rounded-lg">
            {image.url !== "" && (
              // <RxCross1
              //   className="absolute -right-2 -top-2 bg-white rounded-full border-solid border-2 border-red-500 w-[25px] h-[25px] p-1 cursor-pointer z-20 hover:bg-red-50 transition-colors"
              //   onClick={clearImage}
              // />
            )}
            {image.url ? (
              <div id="my-node" className="relative h-full">
                <img
                  src={image.url}
                  alt="image"
                  className="w-full h-full object-contain rounded-lg"
                  style={{
                    filter: `brightness(${image.filters?.brightness}%) saturate(${image.filters?.saturate}%) contrast(${image.filters?.contrast}%) grayscale(${image.filters?.grayscale}%)`,
                    transform: `rotate(${image.filters?.rotate}deg)`,
                  }}
                />
                {image.textOverlay && (
                  <span
                    className="absolute font-outfit text-nowrap select-none pointer-events-none"
                    style={{
                      top: `${image.textOverlayOptions.top}%`,
                      left: `${image.textOverlayOptions.left}%`,
                      transform: "translate(-50%, -50%)",
                      color: image.textOverlayOptions.color,
                      fontSize: `${image.textOverlayOptions.fontSize}px`,
                      fontWeight: image.textOverlayOptions.bold ? "bold" : "normal",
                      fontStyle: image.textOverlayOptions.italic ? "italic" : "normal",
                    }}
                  >
                    {image.textOverlayOptions.value}
                  </span>
                )}
              </div>
            ) : (
              <label
                className="flex flex-col items-center justify-center h-full rounded-lg bg-gray-100 dark:bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
                htmlFor="choose"
              >
                <div className="text-4xl text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </div>
                <span className="font-normal text-xl text-gray-500 mb-2">
                  Choose Image
                </span>
                <span className="text-sm text-gray-400">
                  Click here or drag and drop
                </span>
                <input
                  type="file"
                  onChange={readImage}
                  id="choose"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            )}
          </div> */}
        {/* </div> */}

        {/* Mobile Sidebar - Below editor on mobile */}
        <div className="lg:hidden w-full">
          <Sidebar />
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        input[type="range"]::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
        }
        
        input[type="range"]::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;