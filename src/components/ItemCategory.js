import { useState } from "react";
import ItemList from "./ItemList";

const ItemCategory = ({ name, categories, items, showItems, setShowIndex }) => {
  //   const [showItems, setShowItems] = useState(false);
  //   function handleClick() {
  //     setShowIndex();
  //   }
  return (
    <ul
      className="self-start w-full"
      data-testid="menuCategory"
      onClick={() => {
        setShowIndex(!showItems);
      }}
    >
      <li className="shadow-md rounded-md p-4">
        <h1 className="text-lg font-semibold flex justify-between cursor-pointer">
          {name} ({categories[0].category.items.length})<span>⬇️</span>
        </h1>
        {showItems && (
          <ul className="mt-8">
            {items.map((elem) => {
              return (
                <ItemList key={elem.item.id} item={elem.item} btn={"add"} />
              );
            })}
          </ul>
        )}
      </li>
    </ul>
  );
};

export default ItemCategory;
