import React from 'react'
import jsPDF from "jspdf";
import html2canvas from "html2canvas"
import logo from "./images/yuvalogo.png"

const PdfGenrator = ({ formData }) => {
  
    const generatePDF = async () => {
      const pdfContent = document.getElementById("pdfContent");
      const pdf = new jsPDF("p", "mm", "a4"); // A4 dimensions
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const margin = 10; // Top and bottom margin in mm
  
      // Render the content as a canvas
      const canvas = await html2canvas(pdfContent, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pageWidth - margin * 2; // Adjusted for margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  
      // Split content into pages
      let yPosition = margin; // Start position for the first page
      let remainingHeight = imgHeight;
  
      while (remainingHeight > 0) {
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          yPosition,
          imgWidth,
          Math.min(remainingHeight, pageHeight - margin * 2) // Adjust height for the current page
        );
  
        remainingHeight -= pageHeight - margin * 2; // Remaining height after each page
  
        if (remainingHeight > 0) {
          pdf.addPage();
          yPosition = margin; // Reset position for the next page
        }
      }
     
      // Save the PDF
 
      pdf.save(`${formData.name || "Settelment Form_Response"}.pdf`);


};


  return (
    <div>
         <div className="text-center mt-4">
    {/* PDF Download Button */}
    <button
      onClick={generatePDF}
      className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
    >
      Download PDF
    </button>

    {/* PDF Content Section */}
    <div
      id="pdfContent"
      className="bg-white p-8 mt-2 mx-auto rounded-lg shadow-md max-w-3xl"
    >
    
    <div className="text-center  flex gap-3    ">
        <div>
            <img src={logo} alt="Yuva logo" className='mt-7 md:mt-0'/>
        </div>
        <div className='mt-7'>
        <h2 className="text-xl font-bold text-red-600">
          YOUTH FOR UNITY AND VOLUNTARY ACTION
        </h2>
        <h3 className="text-gray-700">
          Yuva Centre, Plot No. 23, Sector 7, Kharghar, Navi Mumbai - 4102010
        </h3>
        </div>
        
        </div>
        <div className='text-center'>
        <h1 className="text-2xl font-bold text-blue-600 mt-2">
          EXPENDITURE SETTLEMENT SHEET
        </h1>
        </div>
        <hr className='border-blue-600 my-4 border-t-2'/>

      <div className=" grid grid-cols-2 gap-4">
          <p className="mb-2 text-left">
            <span className="text-blue-600 ">Person Name:</span> {formData.name}
          </p>
          <p className="mb-2 text-left">
            <span className="text-blue-600">Advance Settelment Date:</span> {formData.advSetlDate}
          </p>
          <p className="mb-2 text-left">
            <span className="text-blue-600">Region / City / Area:</span> {formData.area}
          </p>
          <p className="mb-2 text-left">
            <span className="text-blue-600">Project:</span> {formData.project}
          </p>
          <p className="mb-2 text-left">
            <span className="text-blue-600">Place Of Program:</span> {formData.placeProg}
          </p>
          <p className="mb-2 text-left">
            <span className="text-blue-600">Project Code:</span> {formData.prjCode}
          </p>
          <p className="mb-2 text-left">
            <span className="text-blue-600">Date Of Program:</span> {formData.dateProg}
          </p>
          <p className="mb-2 text-left">
            <span className="text-blue-600 font-bold">Date Of Program(To):</span> {formData.ToDate}
          </p>
          <p className="mb-2 text-left">
            <span className="text-blue-600">Coversheet Number:</span> {formData.coversheet}
          </p>
          <p className="mb-2 text-left">
            <span className="text-blue-600">Program Title:</span> {formData.progTitle}
          </p>
      </div>
      <div>
      <p className="mb-2 text-left">
            <span className="text-blue-600">Short Note About Program:</span> <br />
            {formData.summary}
        </p>
      </div>

      <div className='text-left'>
        <h1 className='text-blue-600 underline font-bold'>Expenses Summary</h1>
      </div>    
      <hr className="border-blue-600 my-4" />
      <div className=" grid grid-cols-4 gap-4">
      <p className="mb-2 text-left">
            <span className="text-blue-600">Food:</span> <br />
            {formData.food}
        </p>
        <p className="mb-2 text-left">
            <span className="text-blue-600">Travel:</span> <br />
            {formData.travel}
        </p>
        <p className="mb-2 text-left">
            <span className="text-blue-600">Stationery:</span> <br />
            {formData.stationery}
        </p>
        <p className="mb-2 text-left">
            <span className="text-blue-600">Printing:</span> <br />
            {formData.printing}
        </p>
        <p className="mb-2 text-left">
            <span className="text-blue-600">Accommodation & Hall:</span> <br />
            {formData.accom}
        </p>
        <p className="mb-2 text-left">
            <span className="text-blue-600">Communication:</span> <br />
            {formData.communication}
        </p>
        <p className="mb-2 text-left">
            <span className="text-blue-600">Resource Person:</span> <br />
            {formData.resource}
        </p>
        <p className="mb-2 text-left">
            <span className="text-blue-600">Other:</span> <br />
            {formData.other}
        </p>
        <p className="mb-2 text-left">
            <span className="text-blue-600">Total:</span> <br />
             <span className='text-red-600'>{formData.total}</span>
        </p>
      </div>

      <hr className="border-blue-600 my-4" />

      <div className=" grid grid-cols-4 gap-4">
      <p className="mb-2 text-left">
            <span className="text-blue-600">Individual Cost :</span> <br />
            {formData.individual}
        </p>
        <p className="mb-2 text-left">
            <span className="text-blue-600">Vendor Cost :</span> <br />
            {formData.vendor}
        </p>
        <p className="mb-2 text-left">
            <span className="text-blue-600">Total Advance Taken:</span> <br />
            {formData.totalAdvTake}
        </p>
        <p className="mb-2 text-left">
            <span className="text-blue-600">Receivable (-) / Payable (+):</span> <br />
            {formData.receivable}
        </p>
      </div>

      <div className=''>
      <p className="mb-2 text-left flex gap-3 ">
            <span className="text-blue-600">Total Expenses In Word :</span> 
            <span>{formData.inword}</span>
        </p>
      </div>
      <hr className="border-blue-600 my-4" />


      {/* Additional Content */}
      <p className="text-lg text-gray-700">
        Add any additional information or table content here as needed.
      </p>
    </div>  
  </div>
 
  </div>
  )
}
export default PdfGenrator