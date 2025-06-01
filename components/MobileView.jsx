"use client";

import { updateImageUrl } from "@/redux/slice/imageSlice";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import {
  resetImageOptions,
  toggleTextOverlay,
  updateImageFilters,
  updateTextOverlayOptions,
} from "@/redux/slice/imageSlice";
import { FontBoldIcon, FontItalicIcon } from "@radix-ui/react-icons";
import FileSaver from "file-saver";
import { AnimatePresence, motion } from "framer-motion";
import * as htmlToImage from "html-to-image";
import { LuSave, LuUndo } from "react-icons/lu";
import Navbar from "./Navbar";

function MobileView() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  const image = useSelector((state) => state.image);
  const textOverlay = useSelector((state) => state.image.textOverlay);
  const textOverlayOptions = useSelector((state) => state.image.textOverlayOptions);
  const filters = useSelector((state) => state.image.filters);

  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

  const readImage = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(updateImageUrl(reader.result));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
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

  if (!isSignedIn) {
    return null;
  }

  return (
    <div>
        <Navbar/>
    <div className="min-h-screen pt-22 bg-gradient-to-tr from-[#22073d] via-[#005e99] to-[#b85a0a]  dark:bg-gray-900">
      {/* Image Editor Section */}
      <div className="p-4">
        <div className="border-2 border-gray-400 border-dashed dark:border-gray-700 h-[50vh] relative rounded-lg">
          {image.url !== "" && (
            <RxCross1
              className="absolute -right-2 -top-2 bg-white rounded-full border-solid border-2 border-red-500 w-[25px] h-[25px] p-1 cursor-pointer z-20"
              onClick={() => {
                dispatch(updateImageUrl(""));
              }}
            />
          )}
          {image.url ? (
            <div id="my-node" className="relative h-full">
              <img
                src={image.url}
                alt="image"
                className="w-full h-full object-contain rounded-lg"
                style={{
                  filter: `brightness(${filters?.brightness}%) saturate(${filters?.saturate}%) contrast(${filters?.contrast}%) grayscale(${filters?.grayscale}%)`,
                  transform: `rotate(${filters?.rotate}deg)`,
                }}
              />
              {textOverlay && (
                <span
                  className="absolute font-outfit text-nowrap"
                  style={{
                    top: `${textOverlayOptions.top}%`,
                    left: `${textOverlayOptions.left}%`,
                    transform: "translate(-50%, -50%)",
                    color: textOverlayOptions.color,
                    fontSize: `${textOverlayOptions.fontSize}px`,
                    fontWeight: textOverlayOptions.bold ? "bold" : "normal",
                    fontStyle: textOverlayOptions.italic ? "italic" : "normal",
                  }}
                >
                  {textOverlayOptions.value}
                </span>
              )}
            </div>
          ) : (
            <label
              className="flex flex-col items-center justify-center h-full rounded-lg bg-gray-100 dark:bg-gray-100 cursor-pointer"
              htmlFor="choose"
            >
              <div className="text-2xl text-gray-600 dark:text-gray-500">
                <svg
                  className="w-8 h-8 mb-2"
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
              <span className="font-normal text-lg font-outfit text-gray-500">
                Choose Image
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
        </div>
      </div>

      {/* Editing Options Section */}
      <div className={`px-4 pb-4 ${image.url === "" && "pointer-events-none opacity-50"}`}>
        
        {/* Text Overlay Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Text Overlay</h3>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => dispatch(toggleTextOverlay())}
                checked={textOverlay}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-600 after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"></div>
            </label>
          </div>

          <AnimatePresence>
            {textOverlay && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Text Input */}
                <input
                  type="text"
                  placeholder="Enter text..."
                  className="w-full border-2 rounded-md px-3 py-2 text-base"
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

                {/* Font Controls */}
                <div className="grid grid-cols-4 gap-2">
                  <input
                    type="number"
                    max={100}
                    min={1}
                    placeholder="Size"
                    className="text-center border-2 rounded-md py-2 font-outfit"
                    value={textOverlayOptions?.fontSize || 16}
                    onChange={(e) =>
                      dispatch(
                        updateTextOverlayOptions({
                          property: "fontSize",
                          value: Math.min(Math.max(e.target.value, 1), 100),
                        })
                      )
                    }
                  />
                  <button
                    className={`border-2 rounded-md py-2 flex items-center justify-center ${
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
                  </button>
                  <button
                    className={`border-2 rounded-md py-2 flex items-center justify-center ${
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
                  </button>
                  <input
                    type="color"
                    className="border-2 rounded-md cursor-pointer h-10"
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

                {/* Position Controls */}
                {["top", "left"].map((pos) => (
                  <div key={pos} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize">
                        {pos === "top" ? "Vertical Position" : "Horizontal Position"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {textOverlayOptions?.[pos] ?? 50}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={textOverlayOptions?.[pos] ?? 50}
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
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Filters</h3>
          
          {/* Filter Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {["brightness", "grayscale", "contrast", "saturate"].map((filter) => (
              <button
                key={filter}
                className={`py-3 px-4 border-2 rounded-md text-sm font-medium capitalize transition-colors ${
                  activeFilter === filter
                    ? "bg-black text-white border-black"
                    : "hover:bg-gray-100 border-gray-300"
                }`}
                onClick={() =>
                  setActiveFilter(activeFilter === filter ? "" : filter)
                }
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Filter Slider */}
          {activeFilter && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium capitalize">{activeFilter}</span>
                <span className="text-sm text-gray-500">
                  {filters?.[activeFilter] ?? getDefaultValue(activeFilter)}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={200}
                step={1}
                value={filters?.[activeFilter] ?? getDefaultValue(activeFilter)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                onChange={(e) => {
                  dispatch(
                    updateImageFilters({
                      filterName: activeFilter,
                      value: parseInt(e.target.value),
                    })
                  );
                }}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {image.url && (
          <div className="space-y-3">
            <button
              className="w-full bg-blue-600 text-white flex items-center justify-center gap-3 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
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
              <LuSave className="text-xl" />
              Save Image
            </button>

            {hasFilters && (
              <button
                className="w-full bg-red-600 text-white flex items-center justify-center gap-3 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                onClick={() => {
                  dispatch(resetImageOptions());
                  setActiveFilter("");
                }}
              >
                <LuUndo className="text-xl" />
                Reset Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default MobileView;