/* eslint-disable @next/next/no-img-element */
import instance from "@/utils/axios";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";

const ResturantCards: FC = () => {
  const [cards, setcards] = useState<any>([]);

  useEffect(() => {
    const city = "Banglore";
    const latitude = 28.6667;
    const longitude = 77.2167;

    axios
      .post(
        "https://super-colt-coveralls.cyclic.app/api/users/swiggy/restaurants",
        {
          city,
          latitude,
          longitude,
        }
      )
      .then((res) => {
        if (res?.status === 200) {
          const cards = res.data.data.cards[0].card.card;
          console.log(cards);

          setcards(cards);
        }
      });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-indigo-50 px-4">
      return (
      <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl">
        <img
          src="https://i.imgur.com/5dmBrx6.jpg"
          alt="plant"
          className="h-auto w-full"
        />
        <div className="p-5">
          <p className="text-medium mb-5 text-gray-700">
            {cards?.header?.title}
          </p>
          <button className="w-full rounded-md bg-indigo-600  py-2 text-indigo-100 hover:bg-indigo-500 hover:shadow-md duration-75">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResturantCards;
