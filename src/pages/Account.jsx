import React from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import lg from "../assets/images/gnp.png";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import hp from "../assets/images/hp.jpg";

function Account() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged In Successfully");
      navigate("/");
    } catch (error) {
      console.error("Error with Google sign-in:", error);
      toast.error(
        "Failed to log in. Please check your credentials and try again."
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ opacity: 1.3 }}
    >
      <div className="min-h-screen flex  items-center justify-center bg-zinc-100 p-3 ">
        <div className="flex md:flex-row flex-col  rounded-lg shadow overflow-hidden w-full max-w-4xl">
          <div className="md:w-1/2 bg-zinc-100 flex items-center justify-center">
            {/* <img src={hp} alt="" /> */}
            <img
              src="https://images.pexels.com/photos/5052875/pexels-photo-5052875.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="object-cover h-full w-full"
            />
          </div>
          <div className="">
            <div className="max-w-md w-full space-y-6 border border-slate-300 p-10 ">
              <h1 className="md:text-3xl text-lg font-bold mb-4 text-center">
                Welcome to <span className="text-blue-500">Post</span>wave
              </h1>
              <p className="mb-8 text-zinc-600 text-center">
                The simplest way to start a blog and share your stories.
              </p>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition duration-150 ease-in-out">
                <Link to="/signup">Sign up with email</Link>
              </button>

              <button
                onClick={handleGoogleSignIn}
                className="w-full bg-zinc-300 hover:bg-zinc-400 text-black py-3 rounded mb-6 flex justify-center items-center transition duration-150 ease-in-out shadow-md"
              >
                <span className="bg-white p-1 mr-2 rounded-full">
                  <img src={lg} alt="Google Logo" className="h-5 w-5" />
                </span>
                Continue with Google
              </button>
              <div className="text-center text-zinc-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 transition duration-150 ease-in-out"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Account;
