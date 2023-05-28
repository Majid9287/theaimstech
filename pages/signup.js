import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function signup() {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (confirmPassword !== password) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    // Check if email is already registered
    fetch(`/api/user/emailcheck?email=${email}`)
      .then((response) => {
        if (!response.ok) {
          toast.error("Error occurred while checking email!", {
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
        return response.json();
      })
      .then((data) => {
        if (data.exists) {
          toast.error("Email is already registered!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setemailError("Email is already registered");
        } else {
          const formData = {
            name,
            email,
            phone,
            address,
            password,
          };

          console.log(formData);

          // Make an API call to your backend server to save the user data
          fetch("/api/user/signup", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (!response.ok) {
                toast.error("Error occurred while submitting the form!", {
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
              toast.success("Account created successfully", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              router.push("/signin");
            })
            .catch((error) => {
              console.log(error);
              alert(error.message);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);

    if (event.target.value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };
  return (
    <div>
      <div className="bg-gray-100 relative min-h-screen flex flex-col pt-20">
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
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        <div className="container pb-4 max-w-sm mx-auto flex-1 flex flex-col items-center justify-center  px-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white relative px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className=" text-3xl text-center font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                Sign up
              </h1>
              <div className="text-grey-dark text-center mb-4">
                Already have an account?
                <Link
                  href="/signin"
                  className="relative text-indigo-600 no-underline border-b border-blue text-blue"
                >
                  Log in
                </Link>
                .
              </div>
              <input
                type="text"
                className="relative block border border-grey-light w-full p-3 rounded mb-4"
                name="name"
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />

              <input
                type="text"
                className="relative block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                required
                placeholder="Email"
                value={email}
                onClick={(e) => setemailError("")}
                onChange={(e) => {
                  setEmail(e.target.value);
                  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailPattern.test(e.target.value)) {
                    setemailError("Please enter a valid email address.");
                  } else {
                    setemailError("");
                  }
                }}
              />
              {emailError && <div className="text-red-500">{emailError}</div>}

              <input
                type="tel"
                className="relative block border border-grey-light w-full p-3 rounded mb-4"
                name="name"
                required
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/; // regex pattern to match only numbers and backspace
                  if (e.target.value === "" || re.test(e.target.value)) {
                    setphone(e.target.value);
                  }
                }}
              />
              <input
                type="text"
                className="relative block border border-grey-light w-full p-3 rounded mb-4"
                name="name"
                required
                placeholder="Complete Address"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
              <input
                type="password"
                className="relative block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  const passwordPattern =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
                  if (!passwordPattern.test(e.target.value)) {
                    setpasswordError(
                      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
                    );
                  } else {
                    setpasswordError("");
                  }
                }}
              />
              {passwordError && (
                <div className="text-red-500">{passwordError}</div>
              )}
              <input
                type="password"
                className="relative block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password"
                required
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {confirmPasswordError && (
                <div className="text-red-500">{confirmPasswordError}</div>
              )}

              <button
                type="submit"
                className="relative w-full text-center py-3 rounded bg-blue-900 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Create Account
              </button>
              <div className="text-center text-sm text-grey-dark mt-4">
                By signing up, you agree to the
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Terms of Service
                </a>{" "}
                and
                <a
                  className="no-underline border-b border-grey-dark text-grey-dark"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default signup;
