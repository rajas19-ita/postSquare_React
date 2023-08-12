import EmojiPicker from "../EmojiPicker";
import { useRef } from "react";

function CaptionInput({ setCaption, caption }) {
    const cursor = useRef(0);
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
                <EmojiPicker
                    handleText={setCaption}
                    maxLength={250}
                    position="top"
                    cursor={cursor}
                    text={caption}
                />
                <span className="text-inactive text-sm" id="caption-char-count">
                    {caption.length}/250
                </span>
            </div>
        </div>
    );
}
export default CaptionInput;
