import React, { Component } from "react";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
export default function course({ courses, handleEnrollment,token }) {
  const [confirmId, setConfirmId] = useState(null);
  const showConfirmation = (id) => {
    setConfirmId(id);
  };

  const hideConfirmation = () => {
    setConfirmId(null);
  };
  const handleClick = (e) => {
    handleEnrollment(e);
    if(token){
    toast.success("Course is Enrolled Successfully", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  else{
    toast.error("Please login for Enroll course!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
    hideConfirmation();
  };
  const router = useRouter();
  return (
    <div className="bg-gray-100">
      <section className="pb-32 text-gray-800">
        <div
          className="relative overflow-hidden bg-no-repeat bg-cover h-[3]"
          style={{
            backgroundImage:
              "url('images/course.png')",
            backgroundPosition: "50%",
            height: "300px",
          }}
        ></div>
        <div className="container  mx-auto text-gray-800 ">
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <div
            className="block rounded-lg shadow-lg py-10 md:py-12 px-2 md:px-6"
            style={{
              marginTop: "-100px",
              background: "hsla(0, 0%, 100%, 0.8)",
              backdropFilter: "blur(30px)",
            }}
          >
            <div className="justify-center text-center pb-6 ">
              <h2 className="text-4xl font-bold text-black mb-6">Courses</h2>
              <p>
                Our courses are not just about acquiring new skills, but also
                about personal growth and development, helping students to
                become the best version of themselves.{" "}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className={`opacity-100 transition-opacity duration-500 ease-in-out mx-4 ${styles.courseCard}`}
                >
                  <div
                    className="bg-white rounded-lg shadow-md mx-2 md:mx-4 lg:mx-6 px-6 py-4 flex-shrink-0"
                    style={{ width: "320px" }}
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
                      price: {course.price} k
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      Duration: {course.duration} months
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      Enrollment: {course.enrollment}
                    </p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => showConfirmation(course._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Enroll Now
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/course-outline?courseId=${course._id}`)
                        }
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full"
                      >
                        Course Outline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {confirmId && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white p-8 rounded-lg mx-4 md:mx-24">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Currently, our team is working on the course section, which provides content online on our website.
        But don't worry, our team can contact you for details of the course and payment.
        They will provide a link for online classes.
      </h3>
      <h2 className="text-lg font-medium text-gray-900 mb-4">We also offer physical classes at our institute.</h2>
      <div className="flex justify-end">
        <button
          className="text-gray-600 hover:text-gray-900 mr-2"
          onClick={hideConfirmation}
        >
          Cancel
        </button>
        <button
          className="text-red-600 hover:text-red-900"
          onClick={() => handleClick(confirmId)}
        >
          Add
        </button>
      </div>
    </div>
  </div>
)}

        </div>
      </section>
    </div>
  );
}
