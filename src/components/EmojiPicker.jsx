import { BsEmojiSmile } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function EmojiPicker({
    handleText,
    maxLength,
    position,
    cursor,
    text,
    cb,
    color,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const emoji = useRef();

    useEffect(() => {
        if (emoji.current) {
            cursor.current += emoji.current;
            emoji.current = 0;
        }
    }, [text]);

    const handleEmojiSelect = (Emoji) => {
        if (maxLength) {
            handleText((text) => {
                if (text.length <= maxLength - Emoji.native.length) {
                    emoji.current = Emoji.native.length;
                    return (
                        text.slice(0, cursor.current) +
                        Emoji.native +
                        text.slice(cursor.current)
                    );
                } else return text;
            });
        } else {
            emoji.current = Emoji.native.length;
            handleText((text) => {
                return (
                    text.slice(0, cursor.current) +
                    Emoji.native +
                    text.slice(cursor.current)
                );
            });
            if (cb) cb();
        }
    };

    return (
        <div className="cursor-pointer relative h-5">
            <button
                className="active:scale-90 transition-all ease-out active:text-[#b8b8b8] text-white"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
                aria-label="Select Emoji"
                aria-expanded={isOpen}
                aria-controls="post-emoji-picker"
            >
                <BsEmojiSmile className="h-5 w-5" color={color} />
            </button>
            {isOpen ? (
                <div
                    className={`absolute ${
                        position === "top"
                            ? "bottom-[125%]"
                            : position === "bottom"
                            ? "top-full"
                            : "bottom-[125%] right-[5%]"
                    } `}
                    id="post-emoji-picker"
                >
                    <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        previewPosition="none"
                        skinTonePosition="none"
                        searchPosition="none"
                    />
                </div>
            ) : null}
        </div>
    );
}
export default EmojiPicker;
