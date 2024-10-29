import React, { memo, useState } from "react";

const AvatarImage = memo(
  ({
    img,
    ...props
  }: {
    img: string | React.ReactElement;
  } & React.HTMLAttributes<HTMLImageElement>) => {
    const [loadingContext, setLoadingContext] = useState<boolean>(true);

    const handleLoad = () => {
      setLoadingContext(false);
    };

    return (
      <React.Fragment>
        {loadingContext && (
          <div className="skeleton absolute h-24 w-24 rounded-full"></div>
        )}
        {typeof img === "string" ? (
          <img
            src={img}
            className="h-24 w-24 rounded-full object-contain ring-4 ring-base-100"
            onLoad={handleLoad}
            {...props}
          />
        ) : (
          React.cloneElement(img, {
            className:
              "h-24 w-24 rounded-full object-contain ring-4 ring-base-100",
            onLoad: handleLoad,
            ...props,
          })
        )}
      </React.Fragment>
    );
  },
);

export default AvatarImage;
