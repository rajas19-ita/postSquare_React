import React from "react";
import picture from "../../assets/picture.png";
import { toast } from "react-toastify";

function SelectPage({ setPage, setImg }) {
    const handleFile = (e) => {
        if (e.target.files[0].size > 2097152) {
            toast.info("File should be less than 2  MB!", {
                position: toast.POSITION.TOP_CENTER,
            });

            e.target.value = "";
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener("load", () => {
            setImg(reader.result);
            setPage("IMAGE_EDIT");
            e.target.value = "";
        });
    };
    return (
        <div
            className="self-center w-full max-w-[23rem] md:max-w-[25.625rem] aspect-[4/5] bg-[#34495e] rounded-md
     flex flex-col"
            aria-labelledby="img-select-heading"
        >
            <h2
                className="self-center p-4 text-[1rem] md:text-lg"
                id="img-select-heading"
            >
                Choose an Image
            </h2>
            <div className="flex flex-col items-center flex-grow border-t-[1px] justify-center border-t-slate-600 ">
                <img src={picture} alt="" />
                <input
                    type="file"
                    accept=".jpg,.jpeg"
                    id="img-input"
                    onChange={handleFile}
                    hidden
                />
                <label
                    htmlFor="img-input"
                    className="bg-sidebar hover:bg-[#1f2a36]  active:bg-[#1f2a36] 
                    cursor-pointer active:scale-95 py-2 px-4 rounded-md 
                    text-sm font-medium tracking-wide transition-all ease-out active:text-[#b8b8b8]"
                >
                    Select Image
                </label>
            </div>
        </div>
    );
}

export default SelectPage;
