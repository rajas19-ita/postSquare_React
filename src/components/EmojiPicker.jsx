import { FaRegSmile } from 'react-icons/fa';
import { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function EmojiPicker({ handleText, maxLength, position }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleEmojiSelect = (Emoji) => {
        if (maxLength) {
            handleText((text) => {
                if (text.length <= maxLength - Emoji.native.length)
                    return text + Emoji.native;
                else return text;
            });
        } else {
            handleText((text) => text + Emoji.native);
        }
    };

    return (
        <div className='cursor-pointer relative'>
            <button
                className='active:scale-95 my-4'
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <FaRegSmile size={20} />
            </button>
            {isOpen ? (
                <div
                    className={`absolute ${
                        position === 'top' ? 'bottom-full' : 'top-full'
                    } `}
                >
                    <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        previewPosition='none'
                        skinTonePosition='none'
                        searchPosition='none'
                    />
                </div>
            ) : null}
        </div>
    );
}
export default EmojiPicker;
