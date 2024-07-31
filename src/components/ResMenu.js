import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RES_CITY_API, RES_MENU_API } from "./Constants";
import Shimmer from "./Shimmer";
import ItemList from "./ItemList";
import ItemCategory from "./ItemCategory";

const ResMenu = () => {
  const [resDetails, setResDetails] = useState([]);
  const [dishSections, setDishSections] = useState([]);
  const [showIndex, setShowIndex] = useState(null);
  let { resCity, resName, entity } = useParams();
  let restoLink = `${resCity}/${resName}/${entity}`;
  // console.log(useParams());
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RES_MENU_API(restoLink));
    const json = await data.json();
    // console.log(json.page_data.sections.SECTION_RES_DETAILS);
    setResDetails(json.page_data.sections);
    setDishSections(json.page_data?.order?.menuList?.menus);
    // console.log(json.page_data);
  };

  if (resDetails.length == 0) return <Shimmer />;

  let { name, cuisine_string, timing, res_thumb, rating } =
    resDetails.SECTION_BASIC_INFO;
  let { address } = resDetails.SECTION_RES_CONTACT;

  return (
    <div className={`flex items-center flex-col gap-5 w-3/5 mx-auto`}>
      <h1 className="font-bold text-3xl">{name}</h1>
      <h3 className="text-xl">
        {cuisine_string} | {timing.timing_desc} | {rating.aggregate_rating} ★
      </h3>
      <h3 className="text-center">{address}</h3>
      <img src={res_thumb} />

      {dishSections != undefined ? (
        dishSections.map((elem, index) => (
          <ItemCategory
            key={index}
            name={elem.menu.name}
            categories={elem.menu.categories}
            items={elem.menu.categories[0].category.items}
            showItems={showIndex === index ? true : false}
            setShowIndex={() => {
              setShowIndex(index);
            }}
          />
        ))
      ) : (
        <h1 className="text-xl my-6">"Sorry! Menu Not Available."</h1>
      )}
    </div>
  );
};

export default ResMenu;
