import { ImgHTMLAttributes, useState } from "react";

const CoverImage = ({
  height,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { height?: string }) => {
  const [loadingContext, setLoadingContext] = useState<boolean>(true);

  const handleLoad = () => {
    setLoadingContext(false);
  };

  return (
    <>
      {loadingContext && (
        <div
          className={`skeleton absolute ${(height && `h-[${height}]`) || "h-48"}  w-full rounded-none`}
        ></div>
      )}
      <img
        src={props.src}
        alt={props.alt}
        className={`z-0 w-full object-cover ${(height && `h-[${height}]`) || "h-48"}`}
        loading="lazy"
        onLoad={handleLoad}
      />
    </>
  );
};

export default CoverImage;
