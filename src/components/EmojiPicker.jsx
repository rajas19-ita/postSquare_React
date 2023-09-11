import { useEffect, useRef } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useClickOutside from "../hooks/useClickOutside";

function EmojiPicker({
    handleText,
    maxLength,
    position,
    cursor,
    text,
    cb,
    setEmIsOpen,
    emojiSectionRef,
}) {
    const emoji = useRef();

    useClickOutside(() => {
        setEmIsOpen(false);
    }, emojiSectionRef);

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
    );
}
export default EmojiPicker;
