import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
function contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    subject: "",
    message: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/add-messege", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      // Display an error message to the user
    }
  };
 
  return (
    <div>
      <div class="bg-gray-100">
        <section class="pb-32 text-gray-800">
          <div
            className="relative overflow-hidden bg-no-repeat bg-cover h-[3]"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-vector/blue-contact-icons-background_23-2147607328.jpg?w=740&t=st=1678330723~exp=1678331323~hmac=cdd14c56270db4a0746282ad8a8b50fd46fd014dd7ee5b340f4db8eccda1ca5e')",
              backgroundPosition: "50%",
              height: "300px",
            }}
          ></div>
          <div className="container  mx-auto text-gray-800 ">
            <div
              className="block rounded-lg shadow-lg py-10 md:py-12 px-2 md:px-6"
              style={{
                marginTop: "-100px",
                background: "hsla(0, 0%, 100%, 0.8)",
                backdropFilter: "blur(30px)",
              }}
            >
              <div class="flex flex-wrap items-center justify-center">
                <div class="grow-0 shrink-0 basis-auto w-full xl:w-7/12">
                  <div class="flex flex-wrap">
                    <div class="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
                      <div class="flex items-start">
                        <div class="shrink-0">
                          <div class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                          <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'white', fontSize: '2rem' }} />
                          </div>
                        </div>
                        <div class="grow ml-6">
                          <p class="font-bold mb-1">Address</p>
                          <p class="text-gray-500"> Multhan, Punjab, Pakistan</p>

                        </div>
                      </div>
                    </div>
                    <div class="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
                      <div class="flex items-start">
                        <div class="shrink-0">
                          <div class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                          <FontAwesomeIcon icon={faPhone} style={{ color: 'white', fontSize: '2rem' }} />
    
                          </div>
                        </div>
                        <div class="grow ml-6">
                          <p class="font-bold mb-1">Call Number</p>
                          <p class="text-gray-500">(+92)323-8760847</p>
                         
                        </div>
                      </div>
                    </div>
                    <div class="mb-12 md:mb-0 grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
                      <div class="flex align-start">
                        <div class="shrink-0">
                          <div class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                          <FontAwesomeIcon icon={faEnvelope} style={{ color: 'white', fontSize: '2rem' }} />
                          </div>
                        </div>
                        <div class="grow ml-6">
                          <p class="font-bold mb-1">Mail Address</p>
                          <p class="text-gray-500">theaimstech@example.com</p>
                     
                        </div>
                      </div>
                    </div>
                    <div class="grow-0 shrink-0 basis-auto w-full md:w-6/12 px-3 lg:px-6">
                      <div class="flex align-start">
                        <div class="shrink-0">
                          <div class="p-4 bg-blue-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                          <FontAwesomeIcon icon={faWhatsapp} style={{ color: "white", fontSize: "2rem" }} />
                          </div>
                        </div>
                        <div class="grow ml-6">
                          <p class="font-bold mb-1">Whatapps Number</p>
                    
                          <p class="text-gray-500">(+92)323-8760847</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-screen-xl mt-24 px-8 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-8">
                  Let's talk about everything!
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-1">
                      <span className="uppercase text-sm text-gray-600 font-bold mb-2">
                        Full Name
                      </span>
                      <input
                        className="w-full bg-gray-300 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <span className="uppercase text-sm text-gray-600 font-bold mb-2">
                        Email
                      </span>
                      <input
                        className="w-full bg-gray-300 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <span className="uppercase text-sm text-gray-600 font-bold mb-2">
                        Phone
                      </span>
                      <input
                        className="w-full bg-gray-300 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <span className="uppercase text-sm text-gray-600 font-bold mb-2">
                        Country
                      </span>
                      <input
                        className="w-full bg-gray-300 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <span className="uppercase text-sm text-gray-600 font-bold mb-2">
                        Subject
                      </span>
                      <input
                        className="w-full bg-gray-300 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <span className="uppercase text-sm text-gray-600 font-bold mb-2">
                        Message
                      </span>
                      <textarea
                        className="w-full bg-gray-300 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-8">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default contact;
