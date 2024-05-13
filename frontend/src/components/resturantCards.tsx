/* eslint-disable @next/next/no-img-element */
import instance from "@/utils/axios";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";

const ResturantCards: FC = () => {
  const [cards, setcards] = useState<any>([]);

  const [city, setcity] = useState("");

  useEffect(() => {
    const city = "Banglore";
    const latitude = 28.6667;
    const longitude = 77.2167;

    axios
      .get(
        `https://www.swiggy.com/mapi/homepage/getCards?lat=${latitude}&lng=${longitude}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
          },
        }
      )
      .then((res) => {
        if (res?.status === 200) {
          console.log(res.data);

          const fetchedCards =
            res.data.data?.success?.cards[4]?.gridWidget?.gridElements
              ?.infoWithStyle?.restaurants;

          // Ensure fetchedCards is an array
          const updatedCards = Array.isArray(fetchedCards)
            ? fetchedCards
            : [fetchedCards];

          console.log(updatedCards, "UPDATED CARDS");

          setcards(updatedCards);
        }
      });
  }, []);

  return (
    <>
      <div className="container max-w-7xl mx-auto px-4 mt-20">
        <div className=" flex items-center">
          <h2 className="font-bold text-3xl mr-auto ">
            {`Top restaurant chains in ${city}`}
          </h2>
        </div>
      </div>
      {cards.map((item: any, key: any) => {
        return (
          <>
            {/* <div key={key} className=" flex flex-row flex-wrap items-center mt-5"> */}
              <div className="flex flex-row bg-white-50 px-4">
                <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl">
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/${item?.info?.cloudinaryImageId}`}
                    alt="plant"
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
                      <div className="h-1 w-1 bg-gray-700 rounded-full mr-2"></div>
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
            {/* </div> */}
          </>
        );
      })}
    </>
  );
};

export default ResturantCards;
