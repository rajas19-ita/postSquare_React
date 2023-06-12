import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";

function ImageEditPage({
  img,
  setCroppedImg,
  setImg,
  setAspect,
  aspect,
  setPage,
  setLoading,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCrop = async () => {
    setLoading(true);
    setPage("POST_EDIT");

    const croppedImg = await getCroppedImg(img, croppedAreaPixels);

    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setCroppedImg(croppedImg);
    setLoading(false);
  };
  const handleAspect = (e) => {
    setAspect(Number(e.target.value));
  };
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 xl:w-[32%] 
  aspect-[4/5] sm:w-[22rem] w-80 bg-[#34495e]  text-[#e6e6e6] rounded-md flex flex-col"
    >
      <div className="flex justify-between p-4 border-b-[1px] border-b-slate-600">
        <button
          className="active:scale-90"
          onClick={() => {
            setImg(null);
            setPage("SELECT");
          }}
        >
          <FaArrowLeft size={17} />
        </button>

        <h2 className="self-center  text-lg ">Crop</h2>
        <button className="active:scale-95" onClick={handleCrop}>
          <FaArrowRight size={17} />
        </button>
      </div>

      <div className="relative flex flex-grow bg-gray-400 rounded-b-md">
        <Cropper
          image={img}
          crop={crop}
          zoom={zoom}
          maxZoom={3}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          classes={{ containerClassName: "rounded-b-md" }}
        />
        <select
          className="w-20 absolute z-10 focus:outline-none p-2 pl-4 bottom-0 right-0 text-black rounded-md"
          defaultValue={1}
          onChange={handleAspect}
        >
          <option value={1}>1:1</option>
          <option value={16 / 9}>16/9</option>
          <option value={4 / 5}>4/5</option>
        </select>
      </div>
    </div>
  );
}

export default ImageEditPage;
