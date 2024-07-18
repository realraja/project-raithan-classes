"use client"
import React from 'react';
import { motion } from 'framer-motion';
const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen relative">
     

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 text-white p-8 rounded-lg shadow-lg relative z-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full px-3 py-2 bg-gray-900 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 bg-gray-900 border rounded-lg focus:outline-none"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
