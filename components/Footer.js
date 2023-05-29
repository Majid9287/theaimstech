import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link'
function Footer() {
  const [isWhatsappHovered, setIsWhatsappHovered] = useState(false);
  const [isFacebookHovered, setIsFacebookHovered] = useState(false);
  const [isLinkedinHovered, setIsLinkedinHovered] = useState(false);
  const [isInstagramHovered, setIsInstagramHovered] = useState(false);

  const handleWhatsappMouseEnter = () => {
    setIsWhatsappHovered(true);
  };

  const handleWhatsappMouseLeave = () => {
    setIsWhatsappHovered(false);
  };

  const handleFacebookMouseEnter = () => {
    setIsFacebookHovered(true);
  };

  const handleFacebookMouseLeave = () => {
    setIsFacebookHovered(false);
  };

  const handleLinkedinMouseEnter = () => {
    setIsLinkedinHovered(true);
  };

  const handleLinkedinMouseLeave = () => {
    setIsLinkedinHovered(false);
  };

  const handleInstagramMouseEnter = () => {
    setIsInstagramHovered(true);
  };

  const handleInstagramMouseLeave = () => {
    setIsInstagramHovered(false);
  };

  const whatsappIconColor = isWhatsappHovered ? "green" : " gray";
  const facebookIconColor = isFacebookHovered ? "blue" : "gray";
  const linkedinIconColor = isLinkedinHovered ? "blue" : "gray";
  const instagramIconColor = isInstagramHovered ? "purple" : "gray";

  return (
    
<footer className="  bg-neutral-200 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left">
  
  
<div className="flex justify-center items-center pt-6">
      <a
        target="_blank"
        href="https://wa.me/923113471713"
        onMouseEnter={handleWhatsappMouseEnter}
        onMouseLeave={handleWhatsappMouseLeave}
        className="mr-6 text-neutral-600 dark:text-neutral-200"
      >
        <FontAwesomeIcon icon={faWhatsapp} style={{ color: whatsappIconColor, fontSize: "2rem" }} />
      </a>

      <a
        target="_blank"
        href="https://www.facebook.com/your-page-url"
        onMouseEnter={handleFacebookMouseEnter}
        onMouseLeave={handleFacebookMouseLeave}
        className="mr-6 text-neutral-600 dark:text-neutral-200"
      >
        <FontAwesomeIcon icon={faFacebook} style={{ color: facebookIconColor, fontSize: "2rem" }} />
      </a>

      <a
        target="_blank"
        href="https://www.linkedin.com/in/your-profile-url"
        onMouseEnter={handleLinkedinMouseEnter}
        onMouseLeave={handleLinkedinMouseLeave}
        className="mr-6 text-neutral-600 dark:text-neutral-200"
      >
        <FontAwesomeIcon icon={faLinkedin} style={{ color: linkedinIconColor, fontSize: "2rem" }} />
      </a>

      <a
        target="_blank"
        href="https://www.instagram.com/your-profile-url"
        onMouseEnter={handleInstagramMouseEnter}
        onMouseLeave={handleInstagramMouseLeave}
        className="mr-6 text-neutral-600 dark:text-neutral-200"
      >
        <FontAwesomeIcon icon={faInstagram} style={{ color: instagramIconColor, fontSize: '2rem' }} />
      </a>
    </div>
  
  <div className="px-10 mx-6 py-10 text-center md:text-left">
    <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      <div className="">
        <h6
          className="mb-4 mr-8 flex items-center justify-center font-semibold uppercase md:justify-start">
          <img src="images/aims11.png" alt="" />
        </h6>
        <p>
        We provide cutting-edge e-commerce solutions to drive business success, exceeding client expectations and empowering online growth.
        </p>
      </div>
      <div className="">
        <h6
          className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
          Services
        </h6>
        <p className="mb-4">
          <Link href="/" className="text-neutral-600 dark:text-neutral-200"
            >Amazon</Link>
        </p>
        <p className="mb-4">
          <Link href="/" className="text-neutral-600 dark:text-neutral-200"
            >eBay</Link>
        </p>
        <p className="mb-4">
          <Link href="/" className="text-neutral-600 dark:text-neutral-200"
            >Walmart</Link>
        </p>
        <p>
          <Link href="/" className="text-neutral-600 dark:text-neutral-200"
            >Shopify</Link>
        </p>
      </div>
      <div className="">
        <h6
          className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
          Useful links
        </h6>
        <p className="mb-4">
          <Link href="/" className="text-neutral-600 dark:text-neutral-200"
            >Home</Link>
        </p>
        <p className="mb-4">
          <Link href="/portfolio" className="text-neutral-600 dark:text-neutral-200"
            >Portfolio</Link >
        </p>
        <p className="mb-4">
          <Link href="/course" className="text-neutral-600 dark:text-neutral-200"
            >course</Link>
        </p>
        <p>
          <Link href="/contact" className="text-neutral-600 dark:text-neutral-200"
            >Contact us</Link>
        </p>
      </div>
      <div>
        <h6
          className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
          Contact
        </h6>
        <p className="mb-4 flex items-center justify-center md:justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5">
            <path
              d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path
              d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
          Multhan, Punjab, Pakistan
        </p>
        <p className="mb-4 flex items-center justify-center md:justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5">
            <path
              d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
            <path
              d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
          </svg>
          theaimstech@example.com
        </p>
        <p className="mb-4 flex items-center justify-center md:justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5">
            <path
              fillRule="evenodd"
              d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
              clipRule="evenodd" />
          </svg>
          (+92)3019287569
        </p>
        
      </div>
    </div>
  </div>
  <div className="bg-white  backdrop-filter backdrop-blur-lg bg-opacity-30 p-6 text-center dark:bg-neutral-700">
    <span>© 2023 Copyright:</span>
    <a
      className="font-semibold text-neutral-600 dark:text-neutral-400"
      href="https://tailwind-elements.com/"
      >The Aims Tech</a
    >
  </div>
</footer>

  )
}

export default Footer