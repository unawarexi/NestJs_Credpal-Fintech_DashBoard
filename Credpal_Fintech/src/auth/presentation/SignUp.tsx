import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { authServices } from '../../core/services/auth/authServices';
import { SubmitSpinner } from '../../core/spinners/Spinners';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp: React.FC<{ toggleView: () => void }> = ({ toggleView }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      agreeToTerms: false
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      agreeToTerms: Yup.boolean().oneOf([true], 'You must agree to the terms')
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true); // Trigger loading spinner
      try {
        await authServices.register({
          name: values.fullName,
          email: values.email,
          password: values.password,
        });
        toast.success('Registration successful!'); // Show success message
        toggleView(); // Switch to login view
      } catch (error) {
        console.error(error); // Log error for debugging
        toast.error(error.response?.data?.message || 'Registration failed. Please try again.'); // Show error message
      } finally {
        setIsSubmitting(false); // Stop loading spinner
      }
    }
  });

  return (
    <>
      {isSubmitting && <SubmitSpinner />}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left side */}
        {/* <LeftContainer /> */}
        
        {/* Right side - Sign Up Form */}
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
            <h1 className="text-3xl font-bold mb-2">Create an account</h1>
            <p className="mb-8 text-gray-600">
              Already have an account? <span onClick={toggleView} className="text-blue-600 hover:underline cursor-pointer">Login</span>
            </p>
            
            <form onSubmit={formik.handleSubmit}>
              {/* Full name field */}
              <div className="mb-4">
                <label htmlFor="fullName" className="block mb-2 text-gray-700">Full name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={`w-full px-4 py-3 border ${formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter full name"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.fullName}</p>
                )}
              </div>
              
              {/* Email field */}
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full px-4 py-3 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`w-full px-4 py-3 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                )}
              </div>
              
              {/* Terms checkbox */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    className="w-4 h-4 mr-2"
                    checked={formik.values.agreeToTerms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span className="text-sm">
                    I agree to BeamMarkets <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </span>
                </label>
                {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.agreeToTerms}</p>
                )}
              </div>
              
              {/* Register button */}
              <motion.button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 rounded-full hover:bg-gray-900 transition duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Register
              </motion.button>
            </form>
            
            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">OR SIGNIN WITH</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            {/* Social login buttons */}
            <div className="flex gap-4">
              <motion.button
                className="flex-1 py-3 border border-gray-300 rounded-full flex justify-center items-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaGoogle className="text-red-600" />
              </motion.button>
              <motion.button
                className="flex-1 py-3 border border-gray-300 rounded-full flex justify-center items-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaApple className="text-gray-800" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default SignUp;