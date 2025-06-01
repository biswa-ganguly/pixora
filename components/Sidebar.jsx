"use client";
import { Toggle } from "@/components/ui/toggle";
import {
  resetImageFilters,
  resetImageOptions,
  toggleTextOverlay,
  updateImageFilters,
  updateTextOverlayOptions, 
} from "@/redux/slice/imageSlice";
import { FontBoldIcon, FontItalicIcon } from "@radix-ui/react-icons";
import FileSaver from "file-saver";
import { AnimatePresence, motion } from "framer-motion";
import * as htmlToImage from "html-to-image";
import { useEffect, useState } from "react";
import { LuSave, LuUndo } from "react-icons/lu";
import {
  MdOutlineRotate90DegreesCcw,
  MdOutlineRotate90DegreesCw,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.image);
  const filters = image.filters;
  const textOverlay = image.textOverlay;
  const textOverlayOptions = image.textOverlayOptions;

  const [color, setColor] = useState("#2563eb");
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        updateTextOverlayOptions({ 
          property: "color", 
          value: color,
        })
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [color, dispatch]);

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  const hasFilters = Object.keys(filters).some(
    (key) =>
      filters[key] !== undefined &&
      filters[key] !== 0 &&
      filters[key] !== 100
  );

  const getDefaultValue = (filter) => {
    return filter === "brightness" || filter === "contrast" ? 100 : 0;
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
        image.url === "" && "pointer-events-none opacity-50"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-5 font-medium">

          {/* Text Overlay Toggle Section */}
          <li className="bg-[#f9f7ec] mt-3 p-4 rounded-lg transition-all mx-auto">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => dispatch(toggleTextOverlay())}
                checked={textOverlay}
              />
              <div className="relative w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-600 after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 font-poppins">
                Show Text Overlay
              </span>
            </label>

            <AnimatePresence>
              {textOverlay && (
                <motion.div
                  className="w-full max-w-full p-1 mt-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex flex-col space-y-3">
                    {/* Font size, style, color */}
                    <div className="flex gap-2 items-center justify-between">
                      <input
                        type="number"
                        max={100}
                        min={1}
                        className="w-[44px] h-[38.6px] text-center border-2 rounded-md font-outfit"
                        value={textOverlayOptions?.fontSize || 16}
                        onChange={(e) =>
                          dispatch(
                            updateTextOverlayOptions({ 
                              property: "fontSize", 
                              value: Math.min(
                                Math.max(e.target.value, 1),
                                100
                              ),
                            })
                          )
                        }
                      />
                      <div
                        className={`w-[40px] h-[38.6px] flex items-center justify-center border-2 rounded-md cursor-pointer ${
                          textOverlayOptions?.bold
                            ? "bg-black text-white"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() =>
                          dispatch(
                            updateTextOverlayOptions({ 
                              property: "bold", 
                              value: !textOverlayOptions?.bold,
                            })
                          )
                        }
                      >
                        <FontBoldIcon />
                      </div>
                      <div
                        className={`w-[40px] h-[38.6px] flex items-center justify-center border-2 rounded-md cursor-pointer ${
                          textOverlayOptions?.italic
                            ? "bg-black text-white"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() =>
                          dispatch(
                            updateTextOverlayOptions({ 
                              property: "italic", 
                              value: !textOverlayOptions?.italic,
                            })
                          )
                        }
                      >
                        <FontItalicIcon />
                      </div>
                      <input
                        type="color"
                        className="w-[44px] h-[38.6px] p-1 border-2 rounded-md cursor-pointer"
                        value={textOverlayOptions?.color || "#000000"}
                        onChange={(e) =>
                          dispatch(
                            updateTextOverlayOptions({ 
                              property: "color", 
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    </div>

                    {/* Text Input */}
                    <input
                      type="text"
                      placeholder="Enter text..."
                      className="border-2 rounded-md px-2 h-9"
                      value={textOverlayOptions?.value || ""}
                      onChange={(e) =>
                        dispatch(
                          updateTextOverlayOptions({ 
                            property: "value", 
                            value: e.target.value,
                          })
                        )
                      }
                    />

                    {/* Vertical & Horizontal Position Sliders */}
                    {["top", "left"].map((pos) => (
                      <div key={pos} className="flex gap-2 items-center">
                        <span className="min-w-[60px] capitalize text-sm font-outfit">
                          {pos === "top" ? "Vertical" : "Horizontal"}
                        </span>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={1}
                          value={
                            textOverlayOptions?.[pos] !== undefined
                              ? textOverlayOptions[pos]
                              : 50
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          onChange={(e) =>
                            dispatch(
                              updateTextOverlayOptions({ 
                                property: pos, 
                                value: parseInt(e.target.value),
                              })
                            )
                          }
                        />
                        <span className="text-xs text-gray-500 min-w-[30px]">
                          {textOverlayOptions?.[pos] ?? 50}%
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Filters Section */}
          <li className="bg-[#f9f7ec] py-4 px-4 rounded-lg flex flex-wrap gap-2 items-center justify-between">
            {["brightness", "grayscale", "contrast", "saturate"].map((filter) => (
              <div
                key={filter}
                className={`w-[100px] h-[38.6px] flex items-center justify-center border-2 rounded-md cursor-pointer ${
                  activeFilter === filter
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() =>
                  setActiveFilter(activeFilter === filter ? "" : filter)
                }
              >
                <p className="text-[12px] text-center my-auto capitalize">
                  {filter}
                </p>
              </div>
            ))}

            {/* Slider for active filter */}
            <div className="w-full mt-4 flex items-center gap-2">
              <span className="text-xs text-gray-500 min-w-[20px]">0</span>
              <input
                type="range"
                min={0}
                max={200}
                step={1}
                value={
                  activeFilter
                    ? filters?.[activeFilter] ?? getDefaultValue(activeFilter)
                    : 0
                }
                disabled={!activeFilter}
                className={`flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${
                  !activeFilter && "opacity-50 pointer-events-none"
                }`}
                onChange={(e) => {
                  if (activeFilter) {
                    dispatch(
                      updateImageFilters({
                        filterName: activeFilter,
                        value: parseInt(e.target.value),
                      })
                    );
                  }
                }}
              />
              <span className="text-xs text-gray-500 min-w-[30px]">200</span>
            </div>

            {activeFilter && (
              <div className="w-full text-center mt-2 text-sm text-gray-600 capitalize">
                {activeFilter}: {filters?.[activeFilter] ?? getDefaultValue(activeFilter)}
              </div>
            )}
          </li>

          {/* Save & Reset Buttons */}
          {image.url && (
            <li
              className="bg-[#0079FF] text-white flex p-2 items-center justify-center gap-3 rounded-lg cursor-pointer hover:bg-[#0066CC] transition-colors"
              onClick={() => {
                const node = document.getElementById("my-node");
                if (node) {
                  htmlToImage
                    .toBlob(node)
                    .then((blob) => {
                      if (blob) FileSaver.saveAs(blob, "edited-image.png");
                    })
                    .catch((err) =>
                      console.error("Error generating image:", err)
                    );
                }
              }}
            >
              <LuSave className="text-[26px]" />
              Save Image
            </li>
          )}

          {hasFilters && (
            <li
              className="bg-[#FE0000] text-white flex p-2 items-center justify-center gap-3 rounded-lg cursor-pointer hover:bg-[#E60000] transition-colors"
              onClick={() => {
                dispatch(resetImageOptions());
                setActiveFilter("");
              }}
            >
              <LuUndo className="text-[26px]" />
              Reset Filters
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;