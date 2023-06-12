import EmojiPicker from "../EmojiPicker";

function CaptionInput({ setCaption, caption }) {
  const handleChange = (e) => {
    let value = e.target.value;
    if (value.length <= 250) {
      setCaption(value);
    }
  };

  return (
    <div className="flex flex-col h-1/2 border-b-[1px] border-b-slate-600">
      <div className="h-full mt-2 px-4">
        <textarea
          className="text-base w-full h-full focus:outline-none resize-none bg-[#34495e]"
          placeholder="Write a caption..."
          onChange={handleChange}
          value={caption}
        ></textarea>
      </div>
      <div className="flex justify-between items-center  px-4 py-1 ">
        <EmojiPicker
          handleText={setCaption}
          maxLength={250}
          position="bottom"
        />
        <span className="text-inactive text-sm">{caption.length}/250</span>
      </div>
    </div>
  );
}
export default CaptionInput;
