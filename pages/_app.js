import '@/styles/globals.css'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import { useRouter } from "next/router";
import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import jwt from "jsonwebtoken";

export default function App({ Component, pageProps }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();
  
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [UserId, setUserId] = useState(false);
  const [expirationTime, setExpirationTime] = useState(null);

 
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("token");
      setToken(storedData);
    }
  }, []);
  
  useEffect(() => {
    if (token) {
      
      const decoded = jwt.decode(token);
      setExpirationTime(decoded.expirationTime);
      if (decoded._id) {
        setIsUserLoggedIn(true);
        setUserId(decoded._id);
        
        if (decoded.isAdmin) {
          setIsAdmin(true);
        }
      }
      if (!decoded) {
        console.error("Invalid token");
        return;
      }
    } else {
      setIsUserLoggedIn(false);
    }
  }, [token]);

  const handleSignIn = (isLoggedIn) => {
    setIsUserLoggedIn(isLoggedIn);
    const storedData = localStorage.getItem("token");
    setToken(storedData);
    const decoded = jwt.decode(storedData);
    if (decoded._id) {
      setUserId(decoded._id);
    }
    if (decoded.isAdmin) {
      setIsAdmin(true);
    }
    
  };


  const handleLogout = () => {
    
    setIsUserLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("token");
  };
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("/api/course/getcourse")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error(error));
  }, []);
  const handleEnrollment = (courseId) => {
    if (isUserLoggedIn) {
      // Call API for adding enrollment with user and course ID
      console.log(`Enrolling in course ${courseId}...`);
      console.log(`Enrolling user ${UserId}...`);

      fetch('/api/enrollment/add-enrollment', {
        method: 'POST',
        body: JSON.stringify({
          course: courseId,
          user: UserId // assuming you have a function to retrieve the user ID from the authentication token
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        // handle response from the API call
      })
      .catch(error => {
        // handle error from the API call
      });
    } else {
      // Redirect to login page
      router.push("/login");
    }
  };
  return (
  <>
   
   <Navbar  isUserLoggedIn={isUserLoggedIn} isAdmin={isAdmin} isLogout={handleLogout} token={token}/>
   <Component LoggedIn={handleSignIn} isAdmin={isAdmin} isUserLoggedIn={isUserLoggedIn} courses={courses} UserId={UserId} handleEnrollment={handleEnrollment} {...pageProps} />
   <FloatingWhatsAppButton />
   <Footer/>
   </>); 
}
