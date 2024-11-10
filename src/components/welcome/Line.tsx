import React from "react";

export const BaseLine = React.memo(() => {
  return <div className="mb-2 mt-2 h-0.5 w-16 bg-[#4ffc92]"></div>;
});

export const LineWithCircleLeftUp = React.memo(() => {
  return (
    <div className="flex">
      <div className="absolute left-[-30px] top-[0px] h-4 w-4 rounded-full border-4 border-[#4ffc92]"></div>
      <div className="flex">
        <div className="absolute left-[-19px] mb-0 mt-0 h-0.5 w-6 rotate-45 transform rounded-md bg-[#4ffc92]"></div>
        <div className="mb-2 mt-2 h-0.5 w-16 rounded-md bg-[#4ffc92]"></div>
      </div>
    </div>
  );
});

export const LineWithCircleLeftDown = React.memo(() => {
  return (
    <div className="flex">
      <div className="absolute bottom-[-2px] left-[-30px] h-4 w-4 rounded-full border-4 border-[#4ffc92]"></div>
      <div className="flex">
        <div className="absolute left-[-20px] top-[36px] mb-0 mt-0 h-0.5 w-6 -rotate-45 transform rounded-md bg-[#4ffc92]"></div>
        <div className="mb-2 mt-2 h-0.5 w-16 rounded-md bg-[#4ffc92]"></div>
      </div>
    </div>
  );
});

export const LineWithCircleRight = React.memo(() => {
  return (
    <div className="flex">
      <div className="mb-2 mt-2 h-0.5 w-16 bg-[#4ffc92]"></div>
      <div className="right-[30px] top-[2px] h-4 w-4 rounded-full border-4 border-[#4ffc92]"></div>
    </div>
  );
});
