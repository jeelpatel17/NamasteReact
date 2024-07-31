export const RES_CITY_API = (city_name) =>
  `https://www.zomato.com/webroutes/getPage?page_url=%2F${city_name}&location=&isMobile=0`;

export const RES_MENU_API = (resInfo) =>
  `https://www.zomato.com/webroutes/getPage?page_url=${resInfo}`;
