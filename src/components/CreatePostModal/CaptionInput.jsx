import EmojiPicker from "../EmojiPicker";
import { useState, useRef } from "react";
import { BsEmojiSmile } from "react-icons/bs";

function CaptionInput({ setCaption, caption }) {
    const cursor = useRef(0);
    const emojiSectionRef = useRef();
    const [emIsOpen, setEmIsOpen] = useState(false);

    const handleChange = (e) => {
        let value = e.target.value;
        if (value.length <= 250) {
            setCaption(value);
            setTimeout(() => (cursor.current = e.target.selectionStart), 10);
        }
    };

    return (
        <div className="flex flex-col h-1/2 border-b-[1px] border-b-slate-600 px-4 py-3">
            <label htmlFor="caption-textarea" className="sr-only">
                Write a Caption
            </label>
            <textarea
                className="text-[0.875rem] font-normal flex-grow focus:outline-none resize-none bg-[#34495e]"
                placeholder="Write a caption..."
                onChange={handleChange}
                value={caption}
                aria-describedby="caption-char-count"
                id="caption-textarea"
                onClick={(e) => {
                    cursor.current = e.target.selectionStart;
                }}
            ></textarea>

            <div className="flex justify-between ">
                <div
                    className="cursor-pointer relative h-5"
                    ref={emojiSectionRef}
                >
                    <button
                        className="active:scale-90 transition-all ease-out active:text-[#b8b8b8] text-white"
                        onClick={() => {
                            setEmIsOpen(!emIsOpen);
                        }}
                        aria-label="Select Emoji"
                        aria-expanded={emIsOpen}
                        aria-controls="post-emoji-picker"
                    >
                        <BsEmojiSmile className=" w-5 h-5" />
                    </button>
                    {emIsOpen ? (
                        <EmojiPicker
                            handleText={setCaption}
                            maxLength={250}
                            position="bottom"
                            cursor={cursor}
                            emojiSectionRef={emojiSectionRef}
                            setEmIsOpen={setEmIsOpen}
                            text={caption}
                        />
                    ) : null}
                </div>

                <span className="text-inactive text-sm" id="caption-char-count">
                    {caption.length}/250
                </span>
            </div>
        </div>
    );
}
export default CaptionInput;
