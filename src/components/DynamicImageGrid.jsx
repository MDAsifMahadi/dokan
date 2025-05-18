import Image from "./Image";
const DynamicImageGrid = ({ images }) => {
  const count = images?.length;

  return (
    <div className="md:w-[600px] md:h-[600px] overflow-auto rounded-lg">
      {count === 1 && (
        <div className="w-full h-full overflow-hidden">
          <Image src={images[0]} className="w-full h-full object-cover rounded-xl" />
        </div>
      )}

      {count === 2 && (
        <div className="w-full h-full grid grid-rows-2 gap-2">
          {images.map((img, i) => (
            <Image key={i} src={img} className="w-full h-full object-cover rounded-xl" />
          ))}
        </div>
      )}

      {count === 3 && (
        <div className="w-full h-full grid grid-rows-2 gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Image src={images[0]} className="w-full h-full object-cover rounded-xl" />
            <Image src={images[1]} className="w-full h-full object-cover rounded-xl" />
          </div>
          <Image src={images[2]} className="w-full h-full object-cover rounded-xl" />
        </div>
      )}

      {count === 4 && (
        <div className="w-full h-full grid grid-rows-2 gap-2">
          <div className="grid grid-cols-2 gap-2">
            <Image src={images[0]} className="w-full h-full object-cover rounded-xl" />
            <Image src={images[1]} className="w-full h-full object-cover rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Image src={images[2]} className="w-full h-full object-cover rounded-xl" />
            <Image src={images[3]} className="w-full h-full object-cover rounded-xl" />
          </div>
        </div>
      )}

      {count === 5 && (
        <div className="w-full h-full grid grid-rows-3 gap-2 ">
          <div className="grid grid-cols-2 gap-2">
            <Image src={images[0]} className="w-full h-full object-cover rounded-xl" />
            <Image src={images[1]} className="w-full h-full object-cover rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Image src={images[2]} className="w-full h-full object-cover rounded-xl" />
            <Image src={images[3]} className="w-full h-full object-cover rounded-xl" />
          </div>
          <Image src={images[4]} className="w-full h-full object-cover rounded-xl" />
        </div>
      )}

      {count >= 6 && (
        <div className="grid grid-cols-2 p-1 gap-2">
          {images.map((img, i) => (
            <Image key={i} src={img} className="w-full h-40 object-cover rounded-xl" />
          ))}
        </div>
      )}
    </div>
  );
};


export default DynamicImageGrid;
