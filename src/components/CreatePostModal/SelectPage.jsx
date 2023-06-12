import React from "react";
import picture from "../../assets/picture.png";
import { toast } from "react-toastify";

function SelectPage({ setPage, setImg }) {
  const handleFile = (e) => {
    if (e.target.files[0].size > 2097152) {
      toast.info("File should be less than 2MB!", {
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
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 xl:w-[32%] 
      aspect-[4/5] sm:w-[22rem] w-80 bg-[#34495e]  text-[#e6e6e6] rounded-md flex flex-col"
    >
      <h2 className="self-center p-4 text-lg ">Create New Post</h2>
      <div className="flex flex-col items-center flex-grow border-t-[1px] justify-center border-t-slate-600 ">
        <img src={picture} />
        <input
          type="file"
          accept=".jpg,.jpeg"
          id="img-input"
          onChange={handleFile}
          hidden
        />
        <label
          htmlFor="img-input"
          className="bg-[#273544] cursor-pointer active:scale-95 py-2 px-4 rounded-md text-sm  font-medium tracking-wide"
        >
          Select from Computer
        </label>
      </div>
    </div>
  );
}

export default SelectPage;
