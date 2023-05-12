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

export default function App({ Component, pageProps }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();
  const jwt = require("jsonwebtoken");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [UserId, setUserId] = useState(false);
  
  const LoadingIndicator = () => {
    useEffect(() => {
      const handleStart = () => {
        // Remove the loading indicator or add your own custom logic
        console.log('Page is loading...');
      };
  
      const handleComplete = () => {
        // Remove the loading indicator or add your own custom logic
        console.log('Page has loaded!');
      };
  
      Router.events.on('routeChangeStart', handleStart);
      Router.events.on('routeChangeComplete', handleComplete);
  
      return () => {
        Router.events.off('routeChangeStart', handleStart);
        Router.events.off('routeChangeComplete', handleComplete);
      };
    }, []);
  
    return null; // Return null or your custom loading indicator component
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("token");
      setToken(storedData);
    }
  }, []);
  
  useEffect(() => {
    if (token) {
      const decoded = jwt.decode(token);
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
  }, [isUserLoggedIn, token]);
  const handleSignIn = (isLoggedIn) => {
    setIsUserLoggedIn(isLoggedIn);
  };
  const handleLogout = () => {
    // handle logout logic here
    setIsUserLoggedIn(false);
    localStorage.removeItem("token");
  };
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("/api/getcourse")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error(error));
  }, []);
  const handleEnrollment = (courseId) => {
    if (isUserLoggedIn) {
      // Call API for adding enrollment with user and course ID
      console.log(`Enrolling in course ${courseId}...`);
      console.log(`Enrolling user ${UserId}...`);

      fetch('/api/add-enrollment', {
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
   <LoadingIndicator />
   <Component LoggedIn={handleSignIn} isAdmin={isAdmin} isUserLoggedIn={isUserLoggedIn} courses={courses} UserId={UserId} handleEnrollment={handleEnrollment} {...pageProps} />
   <FloatingWhatsAppButton />
   <Footer/>
   </>); 
}
