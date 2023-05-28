import { useEffect, useState } from "react";
import { useRouter } from "next/router";
function UserProfile({ UserId,token ,isLogout}) {
  const [name, setName] = useState("John Doe");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setpasswordError] = useState("");
 console.log(token,UserId)
  useEffect(() => {
    if (!token ||!UserId) {
      router.push('/signin');
    }
  }, [token,router]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await fetch(`/api/user/get-user?id=${UserId}`);
        const data = await res.json();
        setName(data.name);
        setAddress(data.address);
        setPhone(data.phone);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error(error);
      }
    };
    if (UserId) {
      fetchCourseDetails();
    }
  }, [token, router]);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = {};
  
    name && (data.name = name);
    address && (data.address = address);
    phone && (data.phone = phone);
    email && (data.email = email);
    password && (data.password = password);
    console.log(data);
    try {
      const res = await fetch(`/api/user/update-user?id=${UserId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPassword("");
      setConfirmPassword("");
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);

    if (event.target.value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className=" bg-gray-100 flex justify-center items-center min-h-screen ">
      <div className="bg-white  relative max-w-lg w-full p-6 rounded-lg shadow-lg my-24 mx-2 ">
        <div className="flex justify-center items-center py-8">
          <div className="flex-shrink-0 h-30 w-30">
            <img
              className="h-30 w-30 rounded-full"
              src="https://www.gravatar.com/avatar/11111111111111111111111111111111?d=mp&f=y"
              alt=""
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder=""
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder=""
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder=""
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder=""
              value={email}
              onChange={handleEmailChange}
              disabled // email cannot be changed
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              New Password
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
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
          </div>

          {passwordError && <div className="text-red-500">{passwordError}</div>}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Confirm password
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="confirm_password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {confirmPasswordError && (
            <div className="text-red-500">{confirmPasswordError}</div>
          )}

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
