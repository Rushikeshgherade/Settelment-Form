import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import PDFGenerator from "./PdfGenrator";

function Thanku() {
  const location = useLocation();
  const formData = location.state?.Data || {};
  
  const navigate = useNavigate();
  // Redirect back to form on page refresh
  React.useEffect(() => {
    const redirectToForm = () => {
      navigate("/");
    };

    const timeout = setTimeout(() => {
      redirectToForm();
    }, 300000); // Redirect after 5 minutes (optional)

    return () => clearTimeout(timeout);
  }, [navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3FEB8] px-3 py-5 ">
    <div className=" items-start bg-transparent border bg-yellow-400 p-4 md:p-8 rounded-lg shadow-xl w-[800px] ">
      <div className=' text-center text-teal-400  text-[30px] mb-2 '> THANK YOU FOR RESPONSE </div>
      <div className='flex justify-center gap-5 font-mono font-bold'>
      <PDFGenerator formData={formData} />
      </div>
    </div>
    </div>
  )
}

export default Thanku