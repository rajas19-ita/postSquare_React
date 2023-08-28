import React from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";
import { Buffer } from "buffer";

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
        console.log(croppedImg);

        const buffer = Buffer.from(croppedImg.substring(img.indexOf(",") + 1));
        console.log("Byte length: " + buffer.length);
        console.log("MB: " + buffer.length / 1e6);
        setCroppedImg(croppedImg);
        setLoading(false);
    };
    const handleAspect = (e) => {
        setAspect(Number(e.target.value));
    };
    return (
        <div
            className="self-center w-full max-w-[23rem] md:max-w-[25.625rem] aspect-[4/5] bg-[#34495e] 
 text-[#e6e6e6] rounded-md flex flex-col"
            aria-labelledby="cropper-heading"
        >
            <div className="flex justify-between p-4 border-b-[1px] border-b-slate-600">
                <button
                    className="active:scale-90 transition-all ease-out active:text-[#b8b8b8] "
                    onClick={() => {
                        setImg(null);
                        setPage("SELECT");
                    }}
                    aria-label="back"
                >
                    <HiArrowLeft size={25} />
                </button>

                <h2 className="text-[1rem] md:text-lg" id="cropper-heading">
                    Crop
                </h2>
                <button
                    className="active:scale-90 transition-all ease-out active:text-[#b8b8b8] "
                    onClick={handleCrop}
                    aria-label="next"
                >
                    <HiArrowRight size={25} />
                </button>
            </div>

            <div
                className="relative flex flex-grow bg-gray-400 rounded-b-md"
                id="cropper"
            >
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
                    className="w-20 absolute z-10 
                    focus:outline-none p-2 bottom-0 right-0 
                    rounded-md text-black tracking-wide cursor-pointer "
                    defaultValue={1}
                    onChange={handleAspect}
                    aria-label="select an aspect ratio"
                    aria-controls="cropper"
                >
                    <option value={1}>1</option>
                    <option value={16 / 9}>16/9</option>
                    <option value={4 / 5}>4/5</option>
                </select>
            </div>
        </div>
    );
}

export default ImageEditPage;
