/* eslint-disable @next/next/no-img-element */
import instance from "@/utils/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HotelDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [hotel, setHotel] = useState<any>([]);
  const [menu, setMenu] = useState<any>([]);
  const [menu2, setMenu2] = useState<any>([]);
  const [menu3, setMenu3] = useState<any>([]);

  useEffect(() => {
    if (id) {
      const fetchHotelDetails = async () => {
        try {
          const response: any = await instance.get(`/menuCards/${id}`);

          if (response.status === 200) {
            const fetchedResturants: any =
              response?.data?.data?.cards[2]?.card?.card?.info;
            setHotel(fetchedResturants);

            // carousel menus
            const fetchedMenus: any =
              response?.data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR
                ?.cards;
            setMenu(fetchedMenus);

            // itemCards Menus
            const fetchedMenus2: any =
              response?.data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR
                ?.cards;
            setMenu2(fetchedMenus2);
            // setTitle2(
            //   response?.data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR
            //     ?.cards?.card?.card?.title
            // );

            // categories Menus
            const fetchedMenus3: any =
              response?.data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR
                ?.cards;
            console.log(fetchedMenus3, "categories menus");
            setMenu3(fetchedMenus3);
            // setTitle3(fetchedMenus3[3]?.card?.card?.title);
          } else {
            console.error("Unexpected response status:", response.status);
          }
        } catch (error) {
          console.error("Error fetching cards:", error);
        }
      };
      fetchHotelDetails();
    } else {
      console.log("Id not found!");
    }
  }, [id]);

  // Price setting
  const formatPrice = (price: number) => {
    if (!price) {
      return;
    }
    const priceStr = price.toString();
    const length = priceStr.length;

    if (length >= 2) {
      return priceStr.slice(0, length - 2) + "." + priceStr.slice(length - 2);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 bg-white">
        <h1 className="text-3xl font-bold mb-4">{hotel?.name}</h1>
        <p className=" mb-8 ">
          {hotel?.city}, {hotel?.locality}, {hotel?.areaName}
        </p>
        <h2 className="text-2xl font-bold mb-4">Menu</h2>

        {/*Menus */}
        {menu &&
          menu.map((item: any, index: number) => {
            return (
              <div key={index}>
                {item?.card?.card?.carousel?.length > 0 && (
                  <h3 className="text-2xl font-semibold mb-4 mt-6 text-red-600">
                    {item?.card?.card?.carousel[0]?.dish?.info?.imageId
                      ? item?.card?.card?.carousel[0]?.card?.info?.category
                      : ""}
                  </h3>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {item?.card?.card?.carousel
                    ?.filter((carousel: any) => carousel?.dish?.info?.imageId)
                    .map((carousel: any, cardIndex: number) => {
                      return (
                        <div
                          key={cardIndex}
                          className="border p-4 rounded-lg shadow-md"
                        >
                          <img
                            src={`https://media-assets.swiggy.com/swiggy/image/upload/${carousel?.dish?.info?.imageId}`}
                            alt="Food"
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="p-2">
                            <h3 className="text-lg text-red-600 font-bold">
                              {carousel?.dish?.info?.name}
                            </h3>
                            <p className="text-gray-600">
                              {carousel?.dish?.info?.category}
                            </p>
                            <p className="text-xl font-semibold">
                              {formatPrice(carousel?.dish?.info?.price)}₹
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}

        {/*Menus2 */}
        {menu2
          ? menu2.map((item: any, index: number) => {
              return (
                <div key={index}>
                  {item?.card?.card?.itemCards?.length > 0 && (
                    <h3 className="text-2xl font-semibold mb-4 mt-6 text-red-600">
                      {item?.card?.card?.itemCards[0]?.card?.info?.imageId
                        ? item?.card?.card?.itemCards[0]?.card?.info?.category
                        : ""}
                    </h3>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {item?.card?.card?.itemCards
                      ?.filter(
                        (itemCards: any) => itemCards?.card?.info?.imageId
                      )
                      .map((itemCards: any, cardIndex: number) => {
                        return (
                          <>
                            <div
                              key={cardIndex}
                              className="border p-4 rounded-lg shadow-md"
                            >
                              <img
                                src={`https://media-assets.swiggy.com/swiggy/image/upload/${itemCards?.card?.info?.imageId}`}
                                alt="Food"
                                className="w-full h-48 object-cover rounded-t-lg"
                              />
                              <div className="p-2">
                                <h3 className="text-lg text-red-600 font-bold">
                                  {itemCards?.card?.info?.name}
                                </h3>
                                <p className="text-gray-600">
                                  {itemCards?.card?.info?.category}
                                </p>
                                <p className="text-xl font-semibold">
                                  {formatPrice(itemCards?.card?.info?.price)}₹
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              );
            })
          : ""}

        {/*Menus3 */}
        {menu3
          ? menu3.map((item: any, index: number) => {
              return (
                <div key={index}>
                  {item?.card?.card?.categories?.itemCards?.length > 0 && (
                    <h3 className="text-2xl font-semibold mb-4 mt-6 text-red-600">
                      {item?.card?.card?.categories?.itemCards[0]?.card?.info
                        .imageId
                        ? item?.card?.card?.categories?.itemCards[0]?.card?.info
                            ?.category
                        : ""}
                    </h3>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {item?.card?.card?.categories?.itemCards?.map(
                      (itemCards: any, cardIndex: number) => {
                        return (
                          <>
                            <div
                              key={cardIndex}
                              className="border p-4 rounded-lg shadow-md"
                            >
                              <img
                                src={`https://media-assets.swiggy.com/swiggy/image/upload/${itemCards?.card?.info?.imageId}`}
                                alt="Food"
                                className="w-full h-48 object-cover rounded-t-lg"
                              />
                              <div className="p-2">
                                <h3 className="text-lg text-red-600 font-bold">
                                  {itemCards?.card?.info?.name}
                                </h3>
                                <p className="text-gray-600">
                                  {itemCards?.card?.info?.category}
                                </p>
                                <p className="text-xl font-semibold">
                                  {formatPrice(itemCards?.card?.info?.price)}₹
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      }
                    )}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </>
  );
};

export default HotelDetail;
