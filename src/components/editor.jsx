import React, { useEffect, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import close from "../image/close.png";
import pallete from "../image/pallete.png";

export default function Editor({ initialItem, elStage, initialOnChange, setSelected, selected, setModal }) {
  const [fileUpload, setFileUpload] = React.useState({});
  const [color, setColor] = useColor("hex", "#121212");
  const [PLToggle, setPLToggle] = useState(false);

  useEffect(() => {
    initialOnChange((initialItem) => ({
      ...initialItem,
      color: color.hex,
    }));
  }, [initialOnChange, color]);

  function _designLabel(fileName, labelId) {
    let setFileName = fileName;
    let main_picker = document.getElementById("main_picker");
    let setone_picker = document.getElementById("setone_picker");
    let settwo_picker = document.getElementById("settwo_picker");
    if (setFileName === null) {
      setFileName = "Front Design";
    }
    switch (labelId) {
      case "main_logo":
        main_picker.innerHTML = setFileName;
        break;
      case "setOne_logo":
        setone_picker.innerHTML = setFileName;
        break;
      case "setTwo_logo":
        settwo_picker.innerHTML = setFileName;
        break;
      default:
    }
  }

  function changeDesign(e) {
    const file = e.target.files[0];
    const labelId = e.target.id;
    const acceptedImageTypes = ["image/jpeg", "image/png", "image/jpg"];

    // check is file an image
    if (file && acceptedImageTypes.includes(file["type"])) {
      const design = URL.createObjectURL(file);
      // set label image
      _designLabel(file.name, labelId);

      // Get image width
      let img = new Image();
      img.src = design;
      img.onload = function () {
        // console.log(canvas_width)
        // console.log(this.width + " " + this.height);
        setFileUpload({
          stream: design,
          width: this.width,
          height: this.height,
          label: labelId,
        });
      };
    } else {
      // console.log('anajay bukan gambar')
      setModal({
        isOpen: true,
        message: "jpg, jpeg, png 유형의 파일만 업로드 가능합니다.",
      });
      e.target.value = null;
    }
  }

  useEffect(() => {
    function _calculate_image_size(type, originalWidth, originalHeight) {
      const canvas = Math.round((40 * elStage.current.clientWidth) / 100);

      if (originalWidth >= canvas) {
        const maxWidth = canvas;
        const maxHeight = Math.round((55 * elStage.current.clientWidth) / 100);
        var ratio = 0; // Used for aspect ratio
        var width = originalWidth; // Current image width
        var height = originalHeight; // Current image height

        let newWidth = maxWidth;
        let newHeight = maxWidth;

        if (width > maxWidth && width > height) {
          ratio = width / height;
          newHeight = maxWidth / ratio;
          newWidth = maxWidth;
        } else if (height > maxHeight && height > width) {
          ratio = height / width;
          newWidth = maxHeight / ratio;
          newHeight = maxHeight;
        }

        if (type === "width") {
          return newWidth;
        } else {
          return newHeight;
        }
      }
      return originalWidth;
    }

    if (Object.keys(fileUpload).length > 0) {
      initialOnChange({
        ...initialItem,
        designs: initialItem.designs.map((arg) => {
          return arg.label === fileUpload.label
            ? {
                ...arg,
                preview: fileUpload.stream,
                positions: {
                  ...arg.positions,
                  width: _calculate_image_size("width", fileUpload.width, fileUpload.width),
                  height: _calculate_image_size("height", fileUpload.width, fileUpload.height),
                },
              }
            : arg;
        }),
      });

      setFileUpload({});
    }
  }, [fileUpload, initialItem, initialOnChange, elStage]);

  const deleteLabel = (label) => {
    initialOnChange({
      ...initialItem,
      designs: initialItem.designs.map((item) => (item.label === label ? { ...item, preview: "" } : item)),
    });
  };

  const colorList = [
    { hax: "#f44336", name: "a" },
    { hax: "#e91e63", name: "b" },
    { hax: "#9c27b0", name: "c" },
    { hax: "#673ab7", name: "d" },
    { hax: "#3f51b5", name: "e" },
    { hax: "#2196f3", name: "f" },
    { hax: "#03a9f4", name: "g" },
    { hax: "#00bcd4", name: "h" },
    { hax: "#009688", name: "i" },
    { hax: "#4caf50", name: "j" },
    { hax: "#8bc34a", name: "k" },
    { hax: "#cddc39", name: "l" },
    { hax: "#ffeb3b", name: "m" },
    { hax: "#ffc107", name: "n" },
    { hax: "#ff9800", name: "o" },
    { hax: "#ff5722", name: "p" },
    { hax: "#795548", name: "q" },
    { hax: "#607d8b", name: "r" },
  ];

  return (
    <div onClick={() => setSelected(false)} className="w-full">
      {PLToggle ? (
        <div>
          <div className="fixed w-full h-full bg-black opacity-50 top-0 left-0 "></div>
          <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white px-7 rounded-md pb-9">
            <div className="flex justify-between pb-5 pt-9">
              <p>색상 선택</p>
              <img src={close} alt="close" onClick={() => setPLToggle(!PLToggle)} />
            </div>
            <ColorPicker width={window.innerWidth / 2} height={220} color={color} onChange={setColor} hideHSV dark />
            <div className="flex justify-end">
              <div
                className="bg-blue w-full md:w-1/2 mx-auto py-4 rounded-md flex justify-center mt-5"
                onClick={() => setPLToggle(!PLToggle)}
              >
                <p className="text-white">적 용 하 기</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="w-full">
        <div className="mb-10">
          <div className="flex flex-wrap ">
            <div className="bg-a bg-b bg-c bg-d bg-e bg-f bg-g bg-h bg-i bg-j bg-k bg-l bg-m bg-n bg-o bg-p bg-q bg-r"></div>
            {colorList.map(function (color) {
              return (
                <div
                  className={`w-8 h-8 bg-${color.name} cursor-pointer rounded-md m-2.5`}
                  onClick={() =>
                    initialOnChange((initialItem) => ({
                      ...initialItem,
                      color: color.hax,
                    }))
                  }
                ></div>
              );
            })}
            <img
              src={pallete}
              alt="pallete"
              className="w-8 h-8 m-2.5 cursor-pointer"
              onClick={() => setPLToggle(!PLToggle)}
            />
          </div>
        </div>
        <div className="mb-10">
          <label className="block mb-2 text-sm font-semibold">메인 로고</label>
          <label className="block cursor-pointer mb-3 bg-bggray  py-3 px-4 pr-8 rounded " htmlFor="main_logo">
            <div className="flex justify-between w-full">
              <span className="truncate block text-textgray" id="main_picker">
                클릭해서 이미지를 업로드 하세요.
              </span>
              <button className="pointer-events-auto" onClick={() => deleteLabel("main_logo")}>
                <img src={close} alt="close" />
              </button>
            </div>
            <input id="main_logo" onChange={changeDesign} className="w-full hidden" type="file" />
          </label>
        </div>
        <div className="mb-10">
          <label className="block mb-2 text-sm font-semibold">패턴 1</label>
          <label className="block cursor-pointer mb-3 bg-bggray  py-3 px-4 pr-8 rounded " htmlFor="setOne_logo">
            <div className="flex justify-between w-full">
              <span className="truncate block text-textgray" id="setone_picker">
                클릭해서 이미지를 업로드 하세요.
              </span>
              <button className="pointer-events-auto" onClick={() => deleteLabel("setOne_logo")}>
                <img src={close} alt="close" />
              </button>
            </div>
            <input id="setOne_logo" onChange={changeDesign} className="w-full hidden" type="file" />
          </label>
        </div>
        <div className="mb-10">
          <label className="block mb-2 text-sm font-semibold">패턴 2</label>
          <label className="block cursor-pointer mb-3 bg-bggray  py-3 px-4 pr-8 rounded " htmlFor="setTwo_logo">
            <div className="flex justify-between w-full">
              <span className="truncate block text-textgray" id="settwo_picker">
                클릭해서 이미지를 업로드 하세요.
              </span>
              <button className="pointer-events-auto" onClick={() => deleteLabel("setTwo_logo")}>
                <img src={close} alt="close" />
              </button>
            </div>
            <input id="setTwo_logo" onChange={changeDesign} className="w-full hidden" type="file" />
          </label>
        </div>
        <div></div>
      </div>
    </div>
  );
}
