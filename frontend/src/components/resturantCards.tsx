/* eslint-disable @next/next/no-img-element */
import instance from "@/utils/axios";
import React, { FC, useEffect, useState } from "react";

const ResturantCards: FC = () => {
  const [cards, setcards] = useState<any>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await instance.get("getCards");

        if (res?.status === 200) {
          console.log("Response data:", res.data);

          const fetchedCards = res.data.data.cards[2].card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // Ensure fetchedCards is an array
          const updatedCards = Array.isArray(fetchedCards)
            ? fetchedCards
            : fetchedCards
            ? [fetchedCards]
            : [];

          setcards(updatedCards);
        } else {
          console.error("Unexpected response status:", res.status);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <>
      <div className="container max-w-7xl mx-auto px-4 mt-20">
        <div className=" flex items-center">
          <h2 className="font-bold text-3xl mr-auto ">{`All Restaurants Nearby`}</h2>
        </div>
      </div>
      <div className="flex flex-wrap items-start mt-5 container max-w-7xl mx-auto px-4">
        {cards.map((item: any) => {
          return (
            <>
              <a href={item?.cta?.link}>
                <div
                  key={item?.id}
                  className="flex flex-row flex-wrap bg-white-50 px-4 mb-16"
                >
                  <div className="max-w-sm flex-shrink-0 m-2 overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl">
                    <img
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/${item?.info?.cloudinaryImageId}`}
                      alt="plant"j
                      className="h-60 w-80"
                    />
                    <div className="px-5 py-2">
                      <p className="text-medium mb-2 text-gray-700 font-bold">
                        {item?.info?.name}
                      </p>
                      <div className="flex items-center">
                        <p className="text-medium mr-2 text-gray-700 font-bold">
                          {item?.info?.avgRatingString}
                        </p>
                        <p className="text-medium text-gray-700 font-bold">
                          {item?.info?.sla?.slaString}
                        </p>
                      </div>
                      <p className="text-medium mt-2 text-gray-700 font-medium">
                        {item?.info?.cuisines && item.info.cuisines.join(", ")}
                      </p>
                      <p className="text-medium text-gray-700 font-medium">
                        {item?.info?.locality}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ResturantCards;
