import PropTypes from "prop-types";
import { useState } from "react";

export const Addtags = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" ||
      (event.key === "Tab" && inputValue.trim() !== "")
    ) {
      event.preventDefault();

      setTags([...tags, inputValue.trim()]);

      setInputValue("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="border border-gray-300 p-2 rounded-lg bg-gray-50">
      <div>
        <div className="flex gap-1 flex-wrap">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="mb-1 border text-xs p-2 border-gray-300 rounded-lg "
            >
              <span>{tag}</span>
              <button
                className="border ml-1 p-1 text-xs hover:border-indigo-500 hover:text-indigo-500"
                onClick={() => handleRemoveTag(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="rounded-lg text-xs border-gray-300  bg-gray-50"
        placeholder="Type a tag and press Enter"
      />
    </div>
  );
};

Addtags.propTypes = {
  tags: PropTypes.array,
  setTags: PropTypes.func.isRequired,
};
