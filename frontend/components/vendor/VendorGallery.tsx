"use client";

import { useState } from "react";

export default function VendorGallery({
  images,
}: {
  images: any[];
}) {
  const [selected, setSelected] = useState(
    images?.[0]?.imageUrl
  );

  if (!images?.length) {
    return null;
  }

  return (
    <div>
      <img
        src={selected}
        alt=""
        className="
          w-full
          h-[400px]
          object-cover
          rounded-xl
        "
      />

      <div className="grid grid-cols-5 gap-2 mt-3" >
        {images.map((image) => (
          <img
            key={image.id}
            src={image.imageUrl}
            alt=""
            onClick={() =>
              setSelected(
                image.imageUrl
              )
            }
           className="
w-full
h-24
object-cover
rounded-xl
cursor-pointer
  border
  hover:opacity-80
  transition
"
          />

          
        ))}
        <div
  className="
  absolute
  bottom-4
  right-4
  bg-white
  px-3
  py-2
  rounded-xl
  shadow
"
>
  📸 {images.length} Photos
</div>
      </div>
      
    </div>
  );
}