import React, { Component } from "react";
import hero from "./lotti/portfolio.json";
import eye from "./lotti/eye.json";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
export default function portfolio() {
  
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/project/get-projects`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
        // You can set an error state here to display a message to the user
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div className=" bg-gray-100">
        <div className="pt-[25px] bg-gray-100 pb-24">
          <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left pt-4">
            <h1 className="relative my-6 text-4xl  text-black leading-tight" >

              BY EMPOWERING OUR CLIENTS WITH <span className="font-bold text-amber-500">INNOVATIVE TECHNOLOGIES</span>, WE ENABLE THEIR SUCCESS AND GROWTH. </h1>
              <p className=" relative leading-normal text-2xl mb-8">
              We provide cutting-edge e-commerce solutions to drive business success, exceeding client expectations and empowering online growth.
       
              </p>
            </div>
            <div className="  w-full md:w-3/5 py-6 text-center md:order-last ">
              <img src="images/portfolio.png"  className=" md:w-5/6 md:ml-auto" alt="" />
            </div>
          </div>
        </div>

        <div className="container  mx-auto text-gray-800 ">
          <div
            className="block rounded-lg shadow-lg py-10 md:py-12 px-2 md:px-6"
            style={{
              marginTop: "-100px",
              background: "hsla(0, 0%, 100%, 0.8)",
              backdropFilter: "blur(50px)",
            }}
          >
            <div className="container mx-auto py-4">
              <div className="justify-center text-center pb-6">
              <h2 className="text-4xl font-bold text-black mb-6">
              OUR PROJECTS
              </h2>
              
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project._id} className="relative">
                    <div className="relative rounded-lg overflow-hidden bg-gray-800 opacity-35 hover:opacity-0  hover:hide transition-all duration-300">
                      <img
                        src={project.photo}
                        alt={project.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="hover:opacity-0 bg-gray-300 absolute bottom-0 left-0 right-0 pointer-events-none backdrop-filter backdrop-blur-md">
                        <h3 className=" hover:opacity-0 text-lg font-semibold text-white mb-2 text-center">
                          {project.name}
                        </h3>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gray-800 opacity-0 hover:opacity-75 transition-opacity duration-300">
                      <div className="absolute bottom-0 px-6 py-4">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {project.name}
                        </h3>
                        <p className="text-gray-200 text-sm">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
          <section className="bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 p-1 shadow-xl py-20 mt-16">
  <div className="container mx-auto">
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-4xl font-bold text-white mb-8">OUR MISSION</h2>
      <p className="relative text-xl text-white leading-relaxed mb-8">
  <span>&#8220;</span>Our mission is to provide top-rated e-commerce services that unlock the full potential of online businesses, empowering entrepreneurs to succeed in the digital realm.&#8221;
</p>
 
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Expertise
          </h3>
          <p className="text-gray-600 leading-relaxed">
          With years of experience and in-depth expertise in the e-commerce industry, our team of professionals excels in delivering top-notch e-commerce services.
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Online Growth
          </h3>
          <p className="text-gray-600 leading-relaxed">
          we create customized strategies that maximize their online growth potential. Our innovative approach ensures that each client receives a personalized plan for e-commerce success.
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Top Priority
          </h3>
          <p className="text-gray-600 leading-relaxed ">
          We prioritize maintaining open and transparent communication with our clients throughout the entire process. Our team is readily available to address any questions or concerns, ensuring customer satisfaction at every step.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


          <section className="bg-gray-100 py-20">
  <div className="container mx-auto">
    <div className="flex flex-wrap justify-between items-center mb-20">
      <div className="w-full md:w-1/2 mb-10 md:mb-0 text-center p-4">
        <h2 className="text-4xl font-bold leading-tight mb-6">
          OUR VISSION
        </h2>
        <p className="text-gray-600 text-xl leading-relaxed">
          "Our vision is to be a collaborative and results-driven e-commerce service provider, measured by the success of our clients. We are dedicated to helping our clients achieve their goals and delivering exceptional results that propel their businesses forward.".
        </p>
      </div>
      <div className="w-full md:w-1/2">
      <Lottie
                animationData={eye}
                loop={true}
                className=" md:w-5/6 md:ml-auto"
              />
      </div>
    </div>
    
</div>
</section>


          
       
      </div>
    </>
  );
}
