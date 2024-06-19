/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import instance from "@/utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ResturantCards from "@/components/resturantCards";
import SliderCard from "@/components/sliderCard";

const inter = Inter({ subsets: ["latin"] });
export interface tsUser {
  user_name: string;
  email: string;
  phone_number: string;
}

export default function Home() {
  return (
    <>
      <SliderCard />
      <ResturantCards />
    </>
  );
}
