import { NextSeo } from 'next-seo';

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Cycle from "../components/Cycle";

import hero from "./lotti/hero.json";
import Lottie from "lottie-react";
const inter = Inter({ subsets: ["latin"] });
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const reviews = [
  { id: 1, title: "Card 1", image: "path/to/image1.jpg" },
  { id: 2, title: "Card 2", image: "path/to/image2.jpg" },
  { id: 3, title: "Card 3", image: "path/to/image3.jpg" },
];

export default function Home({ courses, handleEnrollment }) {
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  const router = useRouter();
  const [team,setTeam]=useState("");
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      setTimeout(function () {
        localStorage.removeItem("token");
      }, 24 * 60 * 60 * 1000);
    }
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/team/get-teams`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setTeam(data);
      } catch (error) {
        console.error(error);
         }
    }
    fetchData();
  }, []);
  const items = [
    {
      title: "Item 1",
      description: "Description 1",
      img: "/images/s1.png",
    },
    { title: "Item 2", description: "Description 2", img: "/images/ebay.png" },
    {
      title: "Item 3",
      description: "Description 3",
      img: "/images/shopy.png",
    },
    {
      title: "Item 4",
      description: "Description 4",
      img: "/images/walmat.png",
    },
    {
      title: "Item 5",
      description: "Description 5",
      img: "/images/w.png",
    },
  ];

  const services = [
    {
      name: "𝐀𝐦𝐚𝐳𝐨𝐧",
      description: `Boost Amazon sales.
        Register and protect your brand on Amazon.
        Manage Amazon inventory efficiently.
        Streamline Amazon order management.
        Optimize Amazon seller metrics.
        Conduct competitor and market analysis.
        Perform Amazon FBA product research.
        Utilize Amazon tools like Helium 10 and Jungle Scout.
        Manage FBA and logistics.
        Optimize Amazon listings and PPC campaigns`,
      svg: (
        <svg
          viewBox="2.167 .438 251.038 259.969"
          width="40"
          height="40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <path
              d="m221.503 210.324c-105.235 50.083-170.545 8.18-212.352-17.271-2.587-1.604-6.984.375-3.169 4.757 13.928 16.888 59.573 57.593 119.153 57.593 59.621 0 95.09-32.532 99.527-38.207 4.407-5.627 1.294-8.731-3.16-6.872zm29.555-16.322c-2.826-3.68-17.184-4.366-26.22-3.256-9.05 1.078-22.634 6.609-21.453 9.93.606 1.244 1.843.686 8.06.127 6.234-.622 23.698-2.826 27.337 1.931 3.656 4.79-5.57 27.608-7.255 31.288-1.628 3.68.622 4.629 3.68 2.178 3.016-2.45 8.476-8.795 12.14-17.774 3.639-9.028 5.858-21.622 3.71-24.424z"
              fill="#FFA000"
              fillRule="nonzero"
            />
            <path
              d="m150.744 108.13c0 13.141.332 24.1-6.31 35.77-5.361 9.489-13.853 15.324-23.341 15.324-12.952 0-20.495-9.868-20.495-24.432 0-28.75 25.76-33.968 50.146-33.968zm34.015 82.216c-2.23 1.992-5.456 2.135-7.97.806-11.196-9.298-13.189-13.615-19.356-22.487-18.502 18.882-31.596 24.527-55.601 24.527-28.37 0-50.478-17.506-50.478-52.565 0-27.373 14.85-46.018 35.96-55.126 18.313-8.066 43.884-9.489 63.43-11.718v-4.365c0-8.018.616-17.506-4.08-24.432-4.128-6.215-12.003-8.777-18.93-8.777-12.856 0-24.337 6.594-27.136 20.257-.57 3.037-2.799 6.026-5.835 6.168l-32.735-3.51c-2.751-.618-5.787-2.847-5.028-7.07 7.543-39.66 43.36-51.616 75.43-51.616 16.415 0 37.858 4.365 50.81 16.795 16.415 15.323 14.849 35.77 14.849 58.02v52.565c0 15.798 6.547 22.724 12.714 31.264 2.182 3.036 2.657 6.69-.095 8.966-6.879 5.74-19.119 16.415-25.855 22.393l-.095-.095"
              fill="#FFA000"
            />
            <path
              d="m221.503 210.324c-105.235 50.083-170.545 8.18-212.352-17.271-2.587-1.604-6.984.375-3.169 4.757 13.928 16.888 59.573 57.593 119.153 57.593 59.621 0 95.09-32.532 99.527-38.207 4.407-5.627 1.294-8.731-3.16-6.872zm29.555-16.322c-2.826-3.68-17.184-4.366-26.22-3.256-9.05 1.078-22.634 6.609-21.453 9.93.606 1.244 1.843.686 8.06.127 6.234-.622 23.698-2.826 27.337 1.931 3.656 4.79-5.57 27.608-7.255 31.288-1.628 3.68.622 4.629 3.68 2.178 3.016-2.45 8.476-8.795 12.14-17.774 3.639-9.028 5.858-21.622 3.71-24.424z"
              fill="#FFA000"
              fillRule="nonzero"
            />
            <path
              d="m150.744 108.13c0 13.141.332 24.1-6.31 35.77-5.361 9.489-13.853 15.324-23.341 15.324-12.952 0-20.495-9.868-20.495-24.432 0-28.75 25.76-33.968 50.146-33.968zm34.015 82.216c-2.23 1.992-5.456 2.135-7.97.806-11.196-9.298-13.189-13.615-19.356-22.487-18.502 18.882-31.596 24.527-55.601 24.527-28.37 0-50.478-17.506-50.478-52.565 0-27.373 14.85-46.018 35.96-55.126 18.313-8.066 43.884-9.489 63.43-11.718v-4.365c0-8.018.616-17.506-4.08-24.432-4.128-6.215-12.003-8.777-18.93-8.777-12.856 0-24.337 6.594-27.136 20.257-.57 3.037-2.799 6.026-5.835 6.168l-32.735-3.51c-2.751-.618-5.787-2.847-5.028-7.07 7.543-39.66 43.36-51.616 75.43-51.616 16.415 0 37.858 4.365 50.81 16.795 16.415 15.323 14.849 35.77 14.849 58.02v52.565c0 15.798 6.547 22.724 12.714 31.264 2.182 3.036 2.657 6.69-.095 8.966-6.879 5.74-19.119 16.415-25.855 22.393l-.095-.095"
              fill="#FFA000"
            />
          </g>
        </svg>
      ),
    },
    {
      name: "𝐞𝐁𝐚𝐲 ",
      description: `Data Entry.
      Sales Increase.
      Customer Service.
      Store Management.
      Store Categorization.
      Expert in eBay Inventory.
      Listings Page Optimization
      Listing with Multiple Variations.
      Listing Rank and Traffic Improvement.
      Create New Listings Single / Variation Style`,
      svg: (
        <svg
          enableBackground="new 704.081 796 200 200"
          width="40"
          height="40"
          viewBox="704.081 796 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m891.876 977.909-6.938-125.811h-34.661v-10.157c0-25.333-20.608-45.941-45.94-45.941s-45.94 20.609-45.94 45.941v10.157h-36.161l-5.969 126.355-.006.219c-.049 4.547 1.758 9.01 4.955 12.239 3.198 3.233 7.641 5.089 12.19 5.089h141.351c4.688 0 9.228-1.953 12.453-5.36 3.224-3.407 4.925-8.047 4.666-12.731zm-121.497-135.968c0-18.725 15.233-33.959 33.958-33.959 18.724 0 33.958 15.234 33.958 33.959v10.157h-67.917v-10.157zm108.128 140.461c-.973 1.026-2.339 1.615-3.751 1.615h-141.351c-1.37 0-2.707-.558-3.672-1.534-.942-.95-1.483-2.257-1.492-3.597l5.423-114.806h24.731v15.173c0 3.309 2.682 5.991 5.991 5.991s5.991-2.682 5.991-5.991v-15.173h67.917v15.173c0 3.309 2.682 5.991 5.991 5.991s5.99-2.682 5.99-5.991v-15.173h23.321l6.313 114.49c.081 1.41-.431 2.807-1.402 3.832z"
            fill="#FFA000"
          />
        </svg>
      ),
    },
    {
      name: "𝐖𝐚𝐥𝐦𝐚𝐫𝐭",
      description: `Setup Walmart products for online sales.
      Write effective content for Walmart product listings.
      Optimize Walmart sales to maximize revenue.
      Manage Walmart orders to ensure timely delivery.
      Provide Walmart fulfillment services to meet customer needs.
      Manage Walmart inventory effectively to prevent stockouts.
      Bulk upload Walmart listings to save time and effort.
      Create compelling Walmart product listings to attract customers.
      Conduct Walmart SEO keyword research to improve product visibility.
      Optimize Walmart listing pages to improve customer engagement and sales`,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          id="loading"
        >
          <path
            d="M14 0h4v8h-4zM25.9 3.272l2.828 2.829-5.657 5.656-2.828-2.828zM32 14v4h-8v-4zM28.728 25.9l-2.829 2.828-5.656-5.657 2.828-2.828zM18 32h-4v-8h4zM6.1 28.728l-2.828-2.829 5.657-5.656 2.828 2.828zM0 18v-4h8v4zM3.272 6.1l2.829-2.828 5.656 5.657-2.828 2.828z"
            fill="#FFA000"
          ></path>
        </svg>
      ),
    },
    {
      name: "𝐄𝐓𝐒𝐘, 𝐒𝐇𝐎𝐏𝐈𝐅𝐘, 𝐖𝐎𝐑𝐃𝐏𝐑𝐄𝐒𝐒 ",
      description: `Efficient data entry and listings creation for Etsy and Shopify.
      Boost sales and increase traffic for both platforms.
      Utilize effective SEO techniques for both platforms.
      Write engaging and informative content for both platforms.
      Provide excellent customer service for Shopify.
      Optimize product titles, features, and descriptions for Shopify.
      Manage PPC advertising campaigns and promotions for Shopify.
      Perform Etsy sales boosting and traffic increase strategies.
      Create visually appealing listings for both Etsy and Shopify.
      Optimize both platforms for maximum effectiveness`,
      svg: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 256 292"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
        >
          <path
            d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805-.19.056-3.388 1.043-8.678 2.68-5.18-14.906-14.322-28.604-30.405-28.604-.444 0-.901.018-1.358.044C129.31 3.407 123.644.779 118.75.779c-37.465 0-55.364 46.835-60.976 70.635-14.558 4.511-24.9 7.718-26.221 8.133-8.126 2.549-8.383 2.805-9.45 10.462C21.3 95.806.038 260.235.038 260.235l165.678 31.042 89.77-19.42S223.973 58.8 223.775 57.34zM156.49 40.848l-14.019 4.339c.005-.988.01-1.96.01-3.023 0-9.264-1.286-16.723-3.349-22.636 8.287 1.04 13.806 10.469 17.358 21.32zm-27.638-19.483c2.304 5.773 3.802 14.058 3.802 25.238 0 .572-.005 1.095-.01 1.624-9.117 2.824-19.024 5.89-28.953 8.966 5.575-21.516 16.025-31.908 25.161-35.828zm-11.131-10.537c1.617 0 3.246.549 4.805 1.622-12.007 5.65-24.877 19.88-30.312 48.297l-22.886 7.088C75.694 46.16 90.81 10.828 117.72 10.828z"
            fill="#FFA000"
          />
          <path
            d="M221.237 54.983c-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-.637-.634-1.496-.959-2.394-1.099l-12.527 256.233 89.762-19.418S223.972 58.8 223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357"
            fill="#FFA000"
          />
          <path
            d="M135.242 104.585l-11.069 32.926s-9.698-5.176-21.586-5.176c-17.428 0-18.305 10.937-18.305 13.693 0 15.038 39.2 20.8 39.2 56.024 0 27.713-17.577 45.558-41.277 45.558-28.44 0-42.984-17.7-42.984-17.7l7.615-25.16s14.95 12.835 27.565 12.835c8.243 0 11.596-6.49 11.596-11.232 0-19.616-32.16-20.491-32.16-52.724 0-27.129 19.472-53.382 58.778-53.382 15.145 0 22.627 4.338 22.627 4.338"
            fill="#FFA000"
          />
        </svg>
      ),
    },
    {
      name: " 𝐖eb Development",
      description: `Develop custom web applications using (MongoDB, Express, React, NodeJs).
      Utilize MERN Stack to build responsive and user-friendly web interfaces.
      Develop RESTful APIs using NodeJs and Express for efficient data transfer.
      Implement authentication and authorization features using MERN Stack.
      Design and develop secure and scalable database solutions using MongoDB.
      Implement server-side rendering to improve website performance and SEO.
      Develop cross-platform mobile applications using React Native.
      Integrate third-party APIs and services into MERN Stack applications.
      Provide comprehensive testing, debugging, and maintenance services`,

      svg: (
        <svg
          height="40"
          viewBox="175.7 78 490.6 436.9"
          width="40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="#FFA000">
            <path d="m666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9v-22.3c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6v-22.3c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zm-101.4 106.7c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24s9.5 15.8 14.4 23.4zm73.9-208.1c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6s22.9-35.6 58.3-50.6c8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zm53.8 142.9c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6z" />
            <circle cx="420.9" cy="296.5" r="45.7" />
          </g>
        </svg>
      ),
    },
  ];

  const [selectedService, setSelectedService] = useState(services[0]);

  const handleClick = (service) => {
    setSelectedService(service);
  };

  return (
    <>
     <NextSeo
        title="The Aims Tech | theaimstech | aimstech | Amazon Services | Ecommerce Services | Boost Your Online Business"
        description="Unlock the full potential of e-commerce with The Aims Tech Ecommerce Services. Join us to succeed in the fast-paced world of online retail. Contact us today!"
        viewport="width=device-width, initial-scale=1"
        canonical="https://theaimstech.com"
        openGraph={{
          url: 'https://theaimstech.com',
          title: 'The Aims Tech',
          description: 'Unlock the full potential of e-commerce with The Aims Tech Ecommerce Services.',
         
        }}
      />
      <main>
        <div className=" bg-gray-100">
          <div className="py-5 md:pt-24  bg-gray-100 ">
            <div className="container px-4 md:px-12  mx-auto grid grid-row-2 md:grid-cols-2   pt-20 sm:pt-8 ">
              <div className="text-center md:text-left ">
                <h1 className=" relative text-3xl md:text-5xl  leading-tight my-4">
                  <span className="text-amber-500 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    The Aims Tech
                  </span>{" "}
                 <span className={`${styles.fontRaleway}`}>Ecommerce Services</span> 
                </h1>
                <p className="text-lg  leading-normal mb-8 relative ">
                  Discover the principles and practices behind successful online
                  businesses with top-rated e-commerce services. At{" "}
                  <span className="text-amber-500 font-bold">
                   The Aims Tech Ecommerce Services
                  </span>
                  , you'll unlock the full potential of e-commerce and unleash
                  your entrepreneurial spirit in the digital realm. Join us
                  today and gain a solid understanding of what it takes to
                  succeed in the fast-paced world of online retail.
                </p>
                <button
                  onClick={() => router.push("/contact")}
                  className="bg-amber-500 text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg hover:underline focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                >
                  Contact Us
                </button>
              </div>
              <div className="text-right w-full  md:order-last">
                <Lottie
                  animationData={hero}
                  loop={true}
                  className="w-full  "
                />
              </div>
            </div>
          </div>

          <div className={`bg-amber-500 py-8 ${styles.background} `}>
            <Cycle items={items} />
          </div>

          <section className="bg-gray-100 py-8">
            <div className="container mx-auto px-10 -mt-24">
              <div className="bg-gradient-to-r from-amber-500 via-red-500 to-black rounded-lg shadow-lg px-9 py-9 mx-auto w-full lg:w-auto text-center">
                <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  OUR WORKING PROCESS
                </h2>
                <p className="mb-8 text-white">
                  We offer comprehensive e-commerce solutions to help businesses
                  succeed in the digital marketplace. Our process involves
                  managing and optimizing online sales channels, including
                  popular marketplaces. We provide customized support to ensure
                  seamless integration and a hassle-free experience for your
                  business. Our goal is to help you achieve your e-commerce
                  objectives and maximize your online potential.
                </p>
              </div>
            </div>
          </section>

          <div className="h-full">
            <div className="container mx-auto lg:px-20">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 h-full pb-40 ">
                <div className="border-r border-gray-300 mx-3 lg:pl-20">
                  <div className="py-10 pb-3 mt-5 sm:mt-5 h-auto sm:h-4/6 relative bg-pink-100 group hover:bg-pink-200 cursor-pointer transition ease-out duration-300 overflow-hidden">
                    <div className="px-7 mt-5 sm:mt-5">
                      <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-red-500 text-6xl font-bold group-hover:text-pink-400 transition ease-out duration-300">
                        01.
                      </h1>
                      <h2 className="text-1xl mt-4 font-bold">
                        Discovering Your Business Needs
                      </h2>
                      <p className="mt-2 opacity-60 group-hover:opacity-70">
                        We start by conducting an in-depth analysis of your
                        business, identifying key opportunities for growth and
                        optimization. This enables us to develop a tailored
                        e-commerce strategy that is fully aligned with your
                        business goals.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-r border-gray-300 mx-3 lg:pl-20">
                  <div className="py-10 pb-3 mt-5 sm:mt-32 h-auto sm:h-4/6 relative bg-indigo-100 group hover:bg-indigo-200 cursor-pointer transition ease-out duration-300 overflow-hidden">
                    <div className="px-7 mt-5 sm:mt-20">
                      <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-red-500  text-6xl font-bold group-hover:text-indigo-300 transition ease-out duration-300">
                        02.
                      </h1>
                      <h2 className="text-1xl mt-4 font-bold">
                        Crafting a Winning Strategy
                      </h2>
                      <p className="mt-2 opacity-60 group-hover:opacity-70">
                        We work closely with you to develop a detailed
                        implementation plan, outlining the steps required to
                        build your online presence and achieve success. Our
                        approach is grounded in data and insights, ensuring that
                        we deliver measurable, meaningful results for your
                        business.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-r border-gray-300 mx-3 lg:pl-20">
                  <div className="py-10 pb-3 mt-5 sm:mt-72 h-autso sm:h-4/6 relative bg-purple-100 group hover:bg-purple-200 cursor-pointer transition ease-out duration-300 overflow-hidden">
                    <div className="px-7 mt-5 sm:mt-20">
                      <h1 className=" bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-red-500 text-6xl  font-bold group-hover:text-purple-300 transition ease-out duration-300">
                        03.
                      </h1>
                      <h2 className="text-1xl mt-4 font-bold">
                        Delivering Ongoing Value
                      </h2>
                      <p className="mt-2 opacity-60 group-hover:opacity-70">
                        We are committed to delivering ongoing value for our
                        clients, leveraging the latest tools and technologies to
                        help you stay ahead of the competition. We provide
                        ongoing support and optimization, constantly refining
                        your e-commerce strategy to ensure that you maximize
                        your ROI and achieve your.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="bg-gray-100 text-lg text-white ">
            <div className="relative   " id="service_id">
              <div
                className="absolute inset-0 bg-cover bg-no-repeat z-0 "
                style={{
                  backgroundImage: 'url("/images/service.jpg")',
                }}
              ></div>
              <div className="container   flex flex-col md:flex-row mx-auto justify-center items-center px-4 py-8 relative z-10">
                <div className="flex flex-col flex-grow md:pl-24">
                  <h2 className={`${styles.fontRaleway} text-4xl font-bold   mb-8 pb-16 pt-4 pl-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]`}>
                    Expertise <span className="text-amber-500">&</span> Services
                  </h2>
                  {services.map((service) => (
                    <div
                      key={service.name}
                      className={`cursor-pointer p-4  rounded-xl   ${
                        selectedService && service.name === selectedService.name
                          ? "bg-amber-500 drop-filter backdrop-blur-lg bg-opacity-30"
                          : ""
                      }`}
                      onClick={() => handleClick(service)}
                    >
                      <div className="flex items-center ">
                        <h3 className="flex items-center font-medium">
                          <span className="pr-4 ">{service.svg}</span>

                          <span>{service.name}</span>
                        </h3>
                        <div className="flex-grow border-r-2 border-gray-300 h-4"></div>
                      </div>
                      {selectedService && (
                        <div className="md:hidden mt-2">
                          {service.name === selectedService.name && (
                            <ul>
                              {selectedService.description
                                .split(".")
                                .map((sentence, index) => (
                                  <li
                                    key={index}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="24"
                                      height="24"
                                    >
                                      <path
                                        fill="#ff9800"
                                        d="M9 16.2v-8.4c0-.4.2-.8.6-1l6-4c.4-.2.9-.2 1.3 0 .4.2.6.6.6 1v16c0 .4-.2.8-.6 1-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-6-4c-.4-.3-.6-.7-.6-1z"
                                      />
                                    </svg>
                                    <span
                                      className="p-4"
                                      style={{ marginLeft: "0.5rem" }}
                                    >
                                      {sentence}
                                    </span>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {selectedService && (
                  <div className="md:w-2/3 hidden md:block">
                    <div className="flex items-center md:pl-4">
                      <div className="md:pl-20 ">
                        <h3 className="font-medium mb-4 pt-4">
                          {selectedService.name}
                        </h3>
                        <ul>
                          {selectedService.description
                            .split(".")
                            .map((sentence, index) => (
                              <li
                                key={index}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                >
                                  <path
                                    fill="#ff9800"
                                    d="M9 16.2v-8.4c0-.4.2-.8.6-1l6-4c.4-.2.9-.2 1.3 0 .4.2.6.6.6 1v16c0 .4-.2.8-.6 1-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-6-4c-.4-.3-.6-.7-.6-1z"
                                  />
                                </svg>
                                <span
                                  className="p-2"
                                  style={{ marginLeft: "0.5rem" }}
                                >
                                  {sentence}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="bg-gray-100">
            <div className="container mx-auto pt-8 px-4 md:px-12">
              <h2 className={`${styles.fontRaleway} leading-tight text-5xl text-center  mb-8 drop-shadow-[0_1px_1px_rgba(0, 0, 0, 0.2)] `}>
                What makes us successful
              </h2>
              <div className="grid md:grid-cols-2 gap-8 pt-6">
                <div className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                  <div className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8 mb-9">
                    <div className="mt-4">
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Years of Experience and Expertise in E-commerce
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        We have a team of experienced professionals who excel in
                        providing top-notch e-commerce services. We have
                        extensive knowledge and understanding of the latest
                        trends and technologies in the industry. We leverage our
                        expertise to deliver exceptional results that meet our
                        clients' needs and exceed their expectations.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                  <div className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8 mb-9">
                    <div className="mt-4">
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Innovative and Customized E-commerce Solutions
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        We believe in providing tailored solutions that are
                        customized to our clients' specific requirements. We
                        take the time to understand our clients' business and
                        goals, and then create a customized strategy to achieve
                        them. Our approach ensures that our clients receive the
                        best possible outcome for their e-commerce business.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                  <div className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8 mb-9">
                    <div className="mt-4">
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Customer Satisfaction is Our Top Priority
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        We understand the importance of clear and effective
                        communication in achieving success. We maintain open and
                        transparent communication with our clients throughout
                        the entire process. Our team is always available to
                        answer any questions and address any concerns our
                        clients may have.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 shadow-xl">
                  <div className="block rounded-xl bg-white p-4 sm:p-6 lg:p-8 mb-9">
                    <div className="mt-4">
                      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Collaborative Approach to E-commerce Services
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        We are results-driven and focused on achieving tangible
                        outcomes for our clients. We measure our success by our
                        clients' success, and work tirelessly to help them
                        achieve their goals. Our track record of success is a
                        testament to our commitment to delivering exceptional
                        results for our clients.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-gradient-to-r from-amber-500 via-red-500 to-black mt-24">
            <div className="container mx-auto py-12 px-4">
              <div className="px-4 md:px-12  mx-auto grid grid-row-2 md:grid-cols-2">
                <div className=" text-center md:text-left mb-6 md:mb-0">
                  <h2 className="text-3xl font-bold text-white  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    About <br />
                    The Aims Tech
                  </h2>
                  <p className="mt-4 text-lg text-white  leading-relaxed">
                    We focus on delivering value to our clients and believe that
                    staying ahead of the curve is crucial for success in the
                    ever-changing online marketplace. Our suite of e-commerce
                    solutions helps businesses achieve their goals, from
                    increasing sales to building brand awareness and improving
                    customer loyalty. Our team of experts is dedicated to
                    helping businesses of all sizes thrive online with our deep
                    expertise in e-commerce. We are committed to excellence and
                    delivering results that exceed our clients' expectations.
                  </p>
                </div>
                <div className="pt-12">
                <div className=" flex flex-wrap justify-center">
                  <div className="bg-gray-100 rounded-lg shadow-md p-6 m-4 w-64 md:w-56 ">
                    <h3 className="text-lg font-medium text-black-900">
                      Total Clients
                    </h3>
                    <p className="text-black-900 mt-2 text-xl font-bold">110</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg shadow-md p-6 m-4 w-64 md:w-56">
                    <h3 className="text-lg font-medium text-black-900">
                      Year Experience
                    </h3>
                    <p className="text-black-900 mt-2 text-xl font-bold">5</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg shadow-md p-6 m-4 w-64 md:w-56">
                    <h3 className="text-lg font-medium text-black-900">
                      Total Projects
                    </h3>
                    <p className="text-black-900 mt-2 text-xl font-bold">200</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg shadow-md p-6 m-4 w-64 md:w-56">
                    <h3 className="text-lg font-medium text-black-900">
                      Total Working Hours
                    </h3>
                    <p className="text-black-900 mt-2 text-xl font-bold">
                      20,000
                    </p>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>

          <section className=" container  mx-auto grid grid-cols-1 md:grid-cols-2 items-center py-16">
            <div className="px-10 md:pl-20 text-center md:text-justify">
              <h2 className={`${styles.fontRaleway} text-4xl font-bold mb-4`}>
                Tell us about your project
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Let us help you get your business online and grow it with
                passion
              </p>
              <Link
                href="/contact"
                className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors duration-300 ease-in-out"
              >
                Get free estimate
              </Link>
            </div>
            <div className="flex justify-center">
              <img
                className=""
                src="images/getastimate.png"
                alt="Course photo"
              />
            </div>
          </section>

          <section className="bg-gray-100 py-8">
            <div className="bg-gradient-to-r  from-red-500 to-yellow-500 p-1 shadow-xl container mx-auto px-10 -mt-14 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <div className="  flex flex-col mr-4 justify-between items-center">
                  <h2 className="text-2xl font-bold text-white mb-4 p-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    Practical skills development
                  </h2>
                  <p className="mb-8 text-1xl text-white text-center">
                    Our courses are not just about acquiring new skills, but
                    also about personal growth and development, helping students
                    to become the best version of themselves.{" "}
                  </p>
                </div>
                <div className="flex items-center border-l pl-4">
                  <button
                    onClick={() => router.push("/course")}
                    className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Enroll Course
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="chevron-right w-6 h-6 ml-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 15.707a1 1 0 001.414 0l5.707-5.707a2 2 0 000-2.828L8.707 4.293a1 1 0 00-1.414 1.414L11.586 10l-4.293 4.293a1 1 0 000 1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="">
            <div
              className="flex items-center justify-center bg-gray-100"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              <div className=" max-w-screen-lg w-full swiper-container">
                <Swiper
                  pagination={{ clickable: true, dynamicBullets: true }}
                  
                  loop={true}
                  centeredSlides={true}
                  grabCursor={true}
                  navigation
                  slidesPerView={3}
                  
                  breakpoints={{
                    0: { slidesPerView: 1 },
                    520: { slidesPerView: 2 },
                    950: { slidesPerView: 3 },
                  }}
                  
                >
                  {courses.map((course) => (
                    <SwiperSlide key={course._id}>
                      <div
                        className="bg-white rounded-lg shadow-md px-6 py-4 mx-10 "
                       
                      >
                        <img
                          className="w-full h-48 object-cover rounded-md mb-4"
                          src={course.photo}
                          alt="Course photo"
                        />
                        <h3 className="text-lg font-semibold mb-2">
                          {course.name}
                        </h3>
                        <p className="text-gray-700 text-sm mb-2">
                          price: {course.price}
                        </p>
                        <p className="text-gray-700 text-sm mb-2">
                          Duration: {course.duration}
                        </p>
                        <p className="text-gray-700 text-sm mb-2">
                          Enrollment: {course.enrollment}
                        </p>
                        <div className="flex justify-between">
                          <button
                            onClick={() => handleEnrollment(course._id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                          >
                            Enroll
                          </button>
                          <button
                            onClick={() =>
                              router.push(
                                `/course-outline?courseId=${course._id}`
                              )
                            }
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full"
                          >
                            Outline
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </section>
          <h2 class={`text-5xl mb-12 text-center pt-8 ${styles.fontRaleway}`}>
          What Our <span class="text-amber-500">Customers</span> Are Saying 
    </h2>
          <section className="py-8 mx-2">
           

            <div
              className=" py-6 flex items-center justify-center bg-gray-100"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              <div className="max-w-screen-lg w-full swiper-container">
                <Swiper
                  pagination={{ clickable: true, dynamicBullets: true }}
                  spaceBetween={16}
                  loop={true}
                  
                  slidesPerView={1}
                  autoplay={{
                    delay: 5000,

                  }}
                >
                  {reviews.map((card) => (
                    <SwiperSlide key={card.id}>
                      <div className="mb-2 border border-gray-300 shadow-lg rounded-lg rounded-t-8xl rounded-b-5xl overflow-hidden">
                        <div className="pt-3  pb-3 md:pb-1 px-4 md:px-16 bg-gray-300 bg-opacity-40">
                          <div className="flex flex-wrap items-center">
                            <img
                              className="mr-6 rounded-lg"
                              width={50}
                              height={50}
                              src="images/user.png"
                              alt=""
                            />
                            <h4 className="w-full md:w-auto text-xl font-heading font-medium">
                              Faustina H. Fawn
                            </h4>
                            <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200"></div>
                            <span className="mr-4 text-xl font-heading font-medium">
                              5.0
                            </span>
                            <div className="inline-flex">
                              <a className="inline-block mr-1" href="#">
                                <svg
                                  width="20"
                                  height="20"
                                  viewbox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z"
                                    fill="#FFCB00"
                                  ></path>
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 overflow-hidden md:px-16 pt-8  bg-white">
                          <div className="flex flex-wrap ">
                            <div className="w-full md:w-2/3 mb-6 md:mb-0">
                              <p className="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose ">
                                I haretra neque non mi aliquam, finibus hart
                                bibendum molestie. Vestibulum suscipit sagittis
                                dignissim mauris.
                              </p>
                            </div>
                            <div className="w-full md:w-1/3 text-right">
                              <p className="mb-8 text-sm text-gray-300">
                                Added 2 months ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </section>

          
          
<div class="container py-24 px-4 md:px-12 mx-auto">
  <section class="pb-32 text-center lg:text-left">
    <h2 class={`text-5xl mb-12 text-center ${styles.fontRaleway}`}>
      Meet The <span class="text-amber-500">Team</span>
    </h2>
    {team.length > 0 ? (
  <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-6 xl:gap-x-12">
    {team.map((Team) => (
      <div key={Team._id} className="mb-6 lg:mb-0">
        <div className="relative block rounded-lg shadow-lg bg-white p-6">
          <div className="lg:flex flex-row items-center">
            <div className="w-full lg:w-5/12 lg:pr-6">
              <img
                src={Team.photo}
                alt={Team.name}
                className="w-full rounded-md mb-6 lg:mb-0"
              />
            </div>
            <div className="w-full lg:w-7/12">
              <h5 className="text-lg font-bold mb-2">{Team.name}</h5>
              <p className="text-gray-500 mb-4">{Team.description}</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <p>Not found.</p>
)}

   
  </section>


</div>

          
        </div>
      </main>
    </>
  );
}
