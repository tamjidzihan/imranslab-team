/** @format */

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth'; // update path as needed
import { useNavigate } from 'react-router-dom';

export default function MobMenu({ Menus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
    setDropdownOpen(false);
  };

  return (
    <div>
      <button className='lg:hidden z-[999] relative' onClick={toggleDrawer}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <motion.div
        className='fixed left-0 right-0 top-16 overflow-y-auto h-full bg-[#0A2B42] backdrop-blur text-white p-6 pb-20 z-[998]'
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? '0%' : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <ul>
          {Menus.map(({ name, path }, i) => {
            const isClicked = clicked === i;
            return (
              <li key={name}>
                <span
                  className='flex-center-between p-4 hover:bg-white/5 rounded-md cursor-pointer'
                  onClick={() => setClicked(isClicked ? null : i)}
                >
                  <a href={path}>{name}</a>
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 border-t border-white/20 pt-4">
          {!user ? (
            <div className="space-y-3">
              <button
                onClick={() => {
                  toggleDrawer();
                  navigate('/login');
                }}
                className="w-full px-4 py-2 rounded bg-white text-[#0A2B42] font-semibold hover:bg-gray-200"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  toggleDrawer();
                  navigate('/signup');
                }}
                className="w-full px-4 py-2 rounded border border-white text-white font-semibold hover:bg-white/10"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-full px-4 py-2 rounded bg-white text-[#0A2B42] font-semibold hover:bg-gray-200"
              >
                {user.username}
                <ChevronDown size={18} className={`ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 w-full mt-2 bg-white rounded shadow text-sm z-50"
                  >
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={toggleDrawer}
                    >
                      Profile
                    </a>
                    <button
                      onClick={() => {
                        logout();
                        toggleDrawer();
                        navigate('/')
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
