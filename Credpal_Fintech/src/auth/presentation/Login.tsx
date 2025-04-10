import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authServices } from '../../core/services/auth/authServices';
import { SubmitSpinner } from '../../core/spinners/Spinners';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC<{ toggleView: () => void }> = ({ toggleView }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await authServices.login(values);
        toast.success('Login successful!');
        navigate('/');
      } catch (error) {
        console.log(error)
        toast.error('Login failed. Please check your credentials.');
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <>
      {isSubmitting && <SubmitSpinner />}
      <div className="flex flex-col md:flex-row lg:min-h-screen h-[100vh] bg-white">
        {/* Left side */}
        {/* <LeftContainer /> */}
        
        {/* Right side - Login Form */}
        <motion.div 
          className="w-full md:w-3/5 p-4 md:p-8 lg:p-16 flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="max-w-md mx-auto w-full"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Sign in to Beam.</h1>
            <p className="mb-4 md:mb-6 lg:mb-8 text-xs md:text-sm lg:text-gray-600">
              Please sign in with your assigned login details
            </p>
            
            <form onSubmit={formik.handleSubmit}>
              {/* Email field */}
              <div className="mb-4 md:mb-6">
                <label htmlFor="email" className="block mb-1 md:mb-2 text-xs md:text-sm text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full px-2 py-2 md:px-4 md:py-3 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="margnantissstockbroker@"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                )}
              </div>
              
              {/* Password field */}
              <div className="mb-2 md:mb-4">
                <label htmlFor="password" className="block mb-1 md:mb-2 text-xs md:text-sm text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`w-full px-2 py-2 md:px-4 md:py-3 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button 
                    type="button"
                    className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                )}
              </div>
              
              {/* Forgot password */}
              <div className="mb-6 text-right">
                <Link to="/forgot-password" className="text-sm text-gray-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              {/* Login button */}
              <motion.button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 md:py-3 rounded-full hover:bg-gray-900 transition duration-200 text-xs md:text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Log in
              </motion.button>
            </form>
            
            {/* Sign up link */}
            <div className="mt-8 text-center">
              <p className="text-xs md:text-sm text-gray-600">
                Don't have an account? <span onClick={toggleView} className="text-blue-600 hover:underline cursor-pointer">Create an account</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;