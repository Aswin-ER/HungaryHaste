/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Inter } from "next/font/google";
import { Suspense, useEffect, useState } from "react";
import instance from "@/utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ResturantCards from "@/components/resturantCards";
import SliderCard from "@/components/sliderCard";
import userStoreInstance from "@/store/userStore";
import Layout from "@/components/layout";
import Loading from "@/utils/loading";

const inter = Inter({ subsets: ["latin"] });
// export interface tsUser {
//   user_name: string;
//   email: string;
//   phone_number: string;
// }

export default function Home() {

  return (
    <>
      <Layout />
      <SliderCard />
      <ResturantCards />
    </>
  );
}
