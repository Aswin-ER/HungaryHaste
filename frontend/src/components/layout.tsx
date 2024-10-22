import instance from "@/utils/axios";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// type LayoutProps = {
//   children: ReactNode;
// };

const Layout = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userDetails: any = localStorage.getItem("userDet");

    console.log(userDetails, "userDetails");

    if (!userDetails) {
      console.log("No user details !!!!");
      setisLoggedIn(false);
      return;
    }
    // const { user_name } = JSON.parse(userDetails);

    setisLoggedIn(true);
    
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("userDet");

    instance
      .get("/logout")
      .then((res) => {
        if (res.status === 200) {
          toast.success(res?.data?.message);
          setisLoggedIn(false);
          setTimeout(() => {
            router.push("/");
          }, 3000);
        } else {
          console.log(`Error ${res?.data}`);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              <i className="fa-sharp fa-solid fa-bowl-food px-2"></i>Hungary
              Haste
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="/search"
                  className="block py-2 px-3 text-lg text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:px-8 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  <i className="fa-solid fa-magnifying-glass px-2"></i>Search
                </a>
              </li>
              <li>
                <a
                  href="/offers"
                  className="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:px-8 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <i className="fa-solid fa-percent px-2"></i>Offers
                </a>
              </li>
              <li>
                <a
                  href="/help"
                  className="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:px-8 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <i className="fa-solid fa-handshake-angle px-2"></i>Help
                </a>
              </li>
              <li>
                {isLoggedIn ? (
                  <a
                    onClick={handleLogout}
                    className="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:px-8 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    <i className="fa-solid fa-user px-2"></i>Log out
                  </a>
                ) : (
                  <a
                    href="/signin"
                    className="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:px-8 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    <i className="fa-solid fa-user px-2"></i>Sign In
                  </a>
                )}
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-lg text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:px-8 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <i className="fa-solid fa-cart-shopping px-2"></i>Cart
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <main>{children}</main> */}
    </>
  );
};

export default Layout;
