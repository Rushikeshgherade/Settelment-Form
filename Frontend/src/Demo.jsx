import React from 'react'
import  logo from "./images/yuvalogo.png"

function Demo() {
  return (
    <div>
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
          <p className="mb-2">
            <span className="text-blue-600 font-bold">Person Name:</span> Rushikesh Gherade
          </p>
          <p className="mb-2">
            <span className="text-blue-600 font-bold">Advance Settelment Date:</span> 25-10-2024
          </p>
          <p className="mb-2">
            <span className="text-blue-600 font-bold">Region / City / Area:</span> Navi Mumbai
          </p>
          <p className="mb-2">
            <span className="text-blue-600 font-bold">Project:</span> Unicef
          </p>
          <p className="mb-2">
            <span className="text-blue-600 font-bold">Place Of Program:</span> Panvel
          </p>
          <p className="mb-2">
            <span className="text-blue-600 font-bold">Project Code:</span> ISP/45/2024
          </p>
          <p className="mb-2">
            <span className="text-blue-600 font-bold">Date Of Program(from/on):</span> 25/10/2036
          </p>
          <p className="mb-2">
            <span className="text-blue-600 font-bold">Date Of Program(To):</span> 25/10/2036
          </p>
          <p className="mb-2">
            <span className="text-blue-600 font-bold">Coversheet Number:</span> 451278
          </p>
          <p className="mb-2">
            <span className="text-blue-600 font-bold">Program Title:</span> Socila protection Camp 
          </p>
      </div>
      <div>
      <p className="mb-2">
            <span className="text-blue-600 font-bold">Short Note About Program:</span> <br />
           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque labore, illum nemo molestias
           sit dolor. Ipsam placeat veritatis quas nemo dolore eius dolor sapiente, aliquam laborum vel 
           quam libero aspernatur? Iusto praesentium corporis aut delectus cum, possimus id rem ratione 
           sunt exercitationem doloremque alias culpa necessitatibus eligendi nam distinctio ut esse autem 
        </p>
      </div>

      <div>
        <h1 className='text-blue-600 underline font-bold'>Expenses Summary</h1>
      </div>    
      <hr className="border-blue-600 my-4" />
      <div className="grid grid-cols-4 gap-0 bg-white p-6 rounded-lg shadow-md border border-gray-300">
  {/* Row 1: Column Names */}
  <div className="text-blue-600 font-bold text-center border border-gray-300 py-2">Food</div>
  <div className="text-blue-600 font-bold text-center border border-gray-300 py-2">Travel</div>
  <div className="text-blue-600 font-bold text-center border border-gray-300 py-2">Stationery</div>
  <div className="text-blue-600 font-bold text-center border border-gray-300 py-2">Printing</div>

  {/* Row 2: Values */}
  <div className="text-center text-gray-800 font-medium border border-gray-300 py-2">250</div>
  <div className="text-center text-gray-800 font-medium border border-gray-300 py-2">100</div>
  <div className="text-center text-gray-800 font-medium border border-gray-300 py-2">4000</div>
  <div className="text-center text-gray-800 font-medium border border-gray-300 py-2">0</div>

  {/* Row 3: Column Names */}
  <div className="text-blue-600 font-bold text-center border border-gray-300 py-2">Accommodation & Hall</div>
  <div className="text-blue-600 font-bold text-center border border-gray-300 py-2">Communication</div>
  <div className="text-blue-600 font-bold text-center border border-gray-300 py-2">Resource Person</div>
  <div className="text-blue-600 font-bold text-center border border-gray-300 py-2">Other</div>

  {/* Row 4: Values */}
  <div className="text-center text-gray-800 font-medium border border-gray-300 py-2">0</div>
  <div className="text-center text-gray-800 font-medium border border-gray-300 py-2">0</div>
  <div className="text-center text-gray-800 font-medium border border-gray-300 py-2">0</div>
  <div className="text-center text-gray-800 font-medium border border-gray-300 py-2">0</div>

  {/* Row 5: Total */}
  <div className="col-span-3 text-blue-600 font-bold text-center border border-gray-300 py-2">Total</div>
  <div className="col-span-1 text-center text-gray-800 font-bold border border-gray-300 py-2">₹0</div>
</div>


      <hr className="border-blue-600 my-4" />

      <div className=" grid grid-cols-4 gap-4">
      <p className="mb-2">
            <span className="text-blue-600 font-bold">Individual Cost :</span> <br />
            200
        </p>
        <p className="mb-2">
            <span className="text-blue-600 font-bold">Vendor Cost :</span> <br />
            0
        </p>
        <p className="mb-2">
            <span className="text-blue-600 font-bold">Total Advance Taken:</span> <br />
            100
        </p> font-bold
        <p className="mb-2">
            <span className="text-blue-600 font-bold">Receivable (-) / Payable (+):</span> <br />
            1000
        </p>
      </div>

      <div className=''>
      <p className="mb-2 flex gap-3">
            <span className="text-blue-600 font-bold ">Total Expenses In Word :</span> 
            <span>Rupees One Thousand Only </span>
        </p>
      </div>
      <hr className="border-blue-600 my-4" />


      {/* Additional Content */}
      <p className="text-lg text-gray-700">
        Add any additional information or table content here as needed.
      </p>
    </div>  
    </div>
  )
}

export default Demo