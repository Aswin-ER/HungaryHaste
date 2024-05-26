import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HotelDetail = () => {
  const router = useRouter();
  // const { id } = router.query;
  const [hotel, setHotel] = useState(null);

  // useEffect(() => {
  //   if (id) {
  //     // Fetch the hotel details and menu items from an API or define them statically for this example
  //     const fetchHotelDetails = async () => {
  //       const response = await fetch(`/api/hotels/${id}`);
  //       const data = await response.json();
  //       setHotel(data);
  //     };

  //     fetchHotelDetails();
  //   }
  // }, [id]);

  // if (!hotel) return <div>Loading...</div>;

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">asdf</h1>
        <p className="text-gray-600 mb-8">asdf</p>
        <h2 className="text-2xl font-semibold mb-4">Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border p-4 rounded-lg shadow-md">
            {/* <img
              src={}
              alt={}
              className="w-full h-48 object-cover rounded-t-lg"
            /> */}
            <div className="p-2">
              <h3 className="text-lg font-bold">asdf</h3>
              <p className="text-gray-600">asdf</p>
              <p className="text-xl font-semibold">asdf</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelDetail;
