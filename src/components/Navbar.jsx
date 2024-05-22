import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Adjust the import based on your file structure
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/me.jpeg';
import { VscAccount } from "react-icons/vsc";
import { FiMenu, FiX } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout, adjust as necessary
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const getInitials = (name) => {
    const nameArray = name.split(' ');
    if (nameArray.length === 1) {
      return nameArray[0][0];
    }
    return nameArray[0][0] + nameArray[1][0];
  };

  const userInitials = user ? getInitials(user.displayName || user.email) : null;

  return (
    <>
      <div className='flex justify-between items-center shadow-md p-5 bg-black text-white lg:sticky lg:top-0'>
        <Link to='/'>
          <div><img src={logo} alt="" className='w-32' /></div>
        </Link>
        <div className='hidden lg:flex justify-center items-center gap-8 font-medium text-sm mx-5'>
          <p className='hover:underline cursor-pointer'>Technology</p>
          <p className='hover:underline cursor-pointer'>Science</p>
          <p className='hover:underline cursor-pointer'>Business</p>
          <p className='hover:underline cursor-pointer'>Culture</p>
          <p className='hover:underline cursor-pointer'>Politics</p>
          <Link to='/categories'>
            <p className='hover:underline'>Blogs</p>
          </Link>
          <button onClick={handleLogout} className='hover:bg-red-700 hover:text-white  p-2 px-2 rounded-lg  bg-blue-700 text-white'>
          <IoIosLogOut className='font-black'/>
          </button>
          <button className='p-2 rounded-xl text-lg shadow-md hover:bg-white hover:text-black'><CiSearch /></button>
          <Link to='/create'>
            <button className='hover:text-green-500  p-1  text-lg shadow-md'><FaEdit /></button>
          </Link>
          <Link to='/account'>
            {user ? (
              <Link to='/profile'>
                <div className='hover:bg-green-500 hover:text-white bg-white text-black text-xl rounded-full h-8 w-8 text-center shadow'>
                  {userInitials}
                </div>
              </Link>
            ) : (
              <button className='hover:bg-white hover:text-black p-2 text-xl rounded-xl shadow'>
                <VscAccount />
              </button>
            )}
          </Link>
        </div>
        <button className="lg:hidden mx-4" onClick={toggleMenu}>
          {isOpen ? <FiX className="text-2xl" /> : <RiMenu3Fill className='text-2xl' />}
        </button>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-slate-900 text-white fixed left-0 top-0 w-32 h-96 z-10 overflow-y-auto animate__animated animate__fadeInLeft">
          <div className="flex flex-col items-center gap-4 mt-4">
            <p>Explore</p>
           
              <button className='hover:bg-red-500 hover:text-white text-sm py-1 px-2 rounded-lg bg-blue-700 text-white' onClick={handleLogout}> <IoIosLogOut className='font-black'/></button>
      
            <Link to='/categories'>
              <p>Tags</p>
            </Link>
            <Link to='/create'>
              <button className='hover:text-green-500  p-1  text-lg shadow-md'><FaEdit /></button>
            </Link>
            <Link to='/account'>
              {user ? (
                <Link to='/profile'>
                  <div className='hover:bg-green-500 hover:text-white bg-white text-black text-xl rounded-full h-8 w-8 text-center shadow'>
                    {userInitials}
                  </div>
                </Link>
              ) : (
                <button className='bg-white text-black p-2 text-xl rounded-xl shadow'>
                  <VscAccount />
                </button>
              )}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;






