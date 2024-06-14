/* eslint-disable @next/next/no-img-element */
import instance from "@/utils/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HotelDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [hotel, setHotel] = useState<any>([]);
  const [menu, setMenu] = useState<any>([]);

  useEffect(() => {
    if (id) {
      const fetchHotelDetails = async () => {
        try {
          const response: any = await instance.get(`/menuCards/${id}`);

          console.log(response);

          if (response.status === 200) {
            const fetchedResturants: any =
              response?.data?.data?.cards[0]?.card?.card;

            console.log(fetchedResturants, "fetched resturants here!");
            setHotel(fetchedResturants);

            const fetchedMenus: any = response?.data?.data?.cards[5];
            console.log(fetchedMenus, "fetchedMenus here!");

            if (Array.isArray(fetchedMenus)) {
              setMenu(fetchedMenus);
            }
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

  return (
    <>
      <div className="container mx-auto p-4 bg-black">
        <>
          <h1 className="text-3xl font-bold mb-4 text-red-600">
            {hotel?.text}
          </h1>
          <p className="text-red-600 mb-8 "></p>
          <h2 className="text-2xl font-semibold mb-4">Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border p-4 rounded-lg shadow-md">
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/`}
                alt="Food"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <>
                <div className="p-2">
                  <h3 className="text-lg font-bold">
                    
                  </h3>
                  <p className="text-gray-600">asdf</p>
                  <p className="text-xl font-semibold">asdf</p>
                </div>
              </>
              );
            </div>
          </div>
        </>
        );
      </div>
    </>
  );
};

export default HotelDetail;
