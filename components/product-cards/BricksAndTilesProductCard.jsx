import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const BricksAndBlocksProductCard = ({
  product: {
    imagePath = "https://images.l1supply.com/products/Cement/PPC/PC2C01AAZ1000.webp",
    productName = "Premium PPC HDPE",
    price = "Rs10 / Bag",
    // bagTypes = ["HDPE", "Lamination"],
    quantity = 500,
  } = {},
}) => {
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleIncrement = () => setCurrentQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setCurrentQuantity((prev) => Math.max(prev - 1, 500));

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div
        className="inline-block shadow-sm w-[270px] h-[380px] cursor-pointer"
        onClick={handleFlip}
      >
        <div className="bg-[#f5f5f5]">
          <img
            src={imagePath}
            alt="this is product image"
            className="w-full h-full"
          ></img>
        </div>
        <div className="py-5">
          <div className="flex justify-between items-center mb-4">
            <div className=" w-[70%] rounded-r-full p-1 text-center bg-primary text-primary-foreground">
              Rs {price} / piece
            </div>
            <img
              src="\construction-material-pages\rotate.png"
              alt="this is rotate image"
              className="pr-3 w-12"
            />
          </div>
          <div className="font-bold text-lg text-center ">{productName}</div>
        </div>
      </div>
      <div className="border inline-block shadow-sm w-[270px] h-[380px] justify-between relative">
        <div
          className="mt-3 font-bold text-lg text-center pb-5 cursor-pointer"
          onClick={handleFlip}
        >
          {productName}
        </div>
        <div className="fixed left-5 top-20">
          {/* <div className="flex justify-between mb-6">
            <label className="text-md">Bag</label>
            <select className="w-[10rem] border text-sm">
              {bagTypes.map((bagType, index) => (
                <option value={bagType} key = {index}>{bagType}</option>
              ))}
            </select>
          </div> */}
          <div className="mt-4">
            <div className="text-md">Quantity</div>
            <div className="font-light mt-5">
              <Button
                variant="secondary"
                onClick={handleDecrement}
                className="w-5 mx-4"
              >
                -
              </Button>
              <span className="inline-block w-4">
                  <Input
                    type="number"
                    className="w-16 input-no-spinner"
                    value={currentQuantity}
                    onChange={(e) => setCurrentQuantity(+e.target.value)}
                  >
                  </Input>
              </span>
              <Button
                variant="secondary"
                className="w-5 ml-16 mr-4"
                onClick={handleIncrement}
              >
                +
              </Button>
              Pieces
            </div>
          </div>
        </div>

        <Button className="w-[90%] absolute bottom-4 left-3">
          Add To Cart
        </Button>
      </div>
    </ReactCardFlip>
  );
};

export default BricksAndBlocksProductCard;
