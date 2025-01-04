import React, { useState, useRef } from 'react'
import logo from './images/yuvalogo.png'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function SettelmentForm() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    advSetlDate: "",
    area: "",
    placeProg: "",
    project: "",
    prjCode: "",
    coversheet: "",
    dateProg: "",
    ToDate: "-",
    progTitle: "",
    summary: "",
    food: "0",
    travel: "0",
    stationery: "0",
    printing: "0",
    accom: "0",
    communication: "0",
    resource: "0",
    other: "0",
    total: "0",
    inword: "",
    vendor: "0",
    individual: "0",
    totalAdvTake: "0",
    receivable: "0",
  });
  const [isMultiDay, setIsMultiDay] = useState(false); // State for checkbox
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);

    const handleChange = (e) => { 
      const { name, value } = e.target;
        setFormData((prevFormData) => {
          const updatedFormData = {
            ...prevFormData,
            [name]: value,
          };

          const expenseKeys = ['food', 'travel', 'stationery', 'printing', 'accom', 'communication', 'resource', 'other'];

          if (expenseKeys.includes(name)) {
            // Calculate the total sum of all relevant fields
            updatedFormData.total = expenseKeys.reduce((sum, key) => {
              return sum + parseFloat(updatedFormData[key] || 0);
            }, 0);
          }

          // Calculate receivable/payable based on totalAdvanceTaken and individual expenses
      if (name === "totalAdvTake" || name === "individual") {
        updatedFormData.receivable = parseFloat(updatedFormData.totalAdvTake || 0) - parseFloat(updatedFormData.individual || 0);
      }
      
          return updatedFormData;
        });

        };

        //handle file change
        const handleFileChange = (e) => {
          setFiles([...e.target.files]);  // Store all selected files
        };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataWithFile = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
          formDataWithFile.append(key, value);
        });

        // Append all files to the FormData
    files.forEach((file) => {
      formDataWithFile.append("files", file);
    });

    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response =  await axios.post(
        `${apiUrl}/settelment/addForm`, formDataWithFile,{
        headers: {
          "Content-Type": "multipart/form-data" ,
          },
      });
      console.log("Settelment added Succesfully",response.data);

      navigate("/thanks",{state: {Data:formData }});
    } catch (error) {
      console.error("Error:"+error.response.data.message); // You can also show an error message to the user here
    }
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3FEB8] px-3 py-5 ">
        <div className=" bg-transparent border bg-yellow-400 p-4 md:p-8 rounded-lg shadow-xl w-[800px]">
        <div className=' flex justify-around gap-2 md:gap-0'> 
        <div >
          <img src={logo} alt="yuva logo" className='mt-7 md:mt-0'/>
        </div>
        <div> 
          <h2 className="text-2xl mt-6 font-bold font text-center md:text-[40px] text-[#FF4C4C]  mb-0">YOUTH FOR UNITY AND VOULUNTARY ACTION</h2>
        <p className=' text-center mb-6 text-[20px] font-semibold md:text-[30px] mt-2'>Expanditure Settelment Form</p></div>
        </div>  

        <hr className="border-t-2 border-white my-4" />

        <form onSubmit={handleSubmit}  >
        <div className=' md:grid grid-cols-2 gap-4'>
            <div className="mb-4  ">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                <input
                type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Email"
                required
                />
            </div>

            <div className="mb-4 ">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">Person Name</label>
              <input
                type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Name"
                required
              />
            </div>

            <div className="mb-4 ">
            <label htmlFor="advSetlDate" className="block text-sm font-medium text-gray-600">Advance Settelment Date</label>
              <input
              type="date" id="advSetlDate" name="advSetlDate" value={formData.advSetlDate} onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Advance Settelment Date"
              required
              />
            </div>

            <div className="mb-6 ">
            <label htmlFor="area" className="block text-sm font-medium text-gray-600">Region / City / Area</label>
              <input
                type="text" id="area" name="area" value={formData.area} onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Area"
                required
              />
            </div>

            <div className="mb-6 ">
            <label htmlFor="placeProg" className="block text-sm font-medium text-gray-600">Place Of Program</label>
              <input
                type="text" id="placeProg" name="placeProg" value={formData.placeProg} onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Place Of Program"
                required
              />
            </div>

            <div className="mb-6">
            <label htmlFor="project" className="block text-sm font-medium text-gray-600">Project</label>
            <select
              id="project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
                <option value="" disabled defaultValue>Select Project</option>
                <option value="ASK">ASK</option>
                <option value="HDFC">HDFC</option>
                <option value="APPI">APPI</option>
                <option value="MIS">MIS</option>
                <option value="SOCIAL PROTECTION">SOCIAL PROTECTION</option>
                <option value="CHILD RIGHTS">CHILD RIGHTS</option>
            </select>
            </div>

        <div className="mb-6 ">
          <label htmlFor="prjCode" className="block text-sm font-medium text-gray-600">Project Code</label>
          <input
            type="text" id="prjCode" name="prjCode" value={formData.prjCode} onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Project Code"
            required
          />
        </div>
        <div className="mb-6 ">
          <label htmlFor="coversheet" className="block text-sm font-medium text-gray-600">Coversheet Number</label>
          <input
            type="text" id="coversheet" name="coversheet" value={formData.coversheet} onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Coversheet Number"
            required
          />
        </div>
        <div className="mb-6 ">
          <label htmlFor="dateProg" className="block text-sm font-medium text-gray-600">Date Of Program(From/On)</label>
          <input
            type="date" id="dateProg" name="dateProg"  value={formData.dateProg} onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Date"
            required
          />
        </div>
       
        <div className="mb-6 flex items-center gap-2">
            <input
              type="checkbox"
              id="isMultiDay"
              checked={isMultiDay}
              onChange={() => setIsMultiDay(!isMultiDay)}
              className="w-5 h-5"
            />
            <label htmlFor="isMultiDay" className="text-sm font-medium text-gray-600">
              Is your program more than one day?
            </label>
          </div>

          {isMultiDay && (
            <div className="mb-6">
              <label htmlFor="ToDate" className="block text-sm font-medium text-gray-600">
                Date of Program (To)
              </label>
              <input
                type="date"
                id="ToDate"
                name="ToDate"
                value={formData.ToDate}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

        <div className="mb-6 ">
          <label htmlFor="progTitle" className="block text-sm font-medium text-gray-600">Program Title</label>
          <input
            type="text" id="progTitle" name="progTitle" value={formData.progTitle} onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Program Title"
            required
          />
        </div>

            </div>

            <div className="mb-6 ">
          <label htmlFor="summary" className="block text-sm font-medium text-gray-600">Short Note About Program</label>
         
          <textarea id="summary" name="summary" value={formData.summary} onChange={handleChange}
          className="mt-2 block w-full h-40 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required></textarea>
        </div>

        
        <h2 className="text-2xl font-bold font text-left text-[#FF4C4C]  mb-0">Expenses Summary</h2>
        <hr class="border-t-2 border-white my-4" />
            {/* expeses summary code */}

            <div className=' md:grid grid-cols-2 gap-4'>

            <div className="mb-4  ">
          <label htmlFor="food" className="block text-sm font-medium text-gray-600">Food</label>
          <input
            type="number" id="food" name="food" value={formData.food} onChange={handleChange}  
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Amount"
            required
          />
        </div>
                
        <div className="mb-4 ">
          <label htmlFor="travel" className="block text-sm font-medium text-gray-600">Travel</label>
          <input
            type="number" id="travel" name="travel" value={formData.travel} onChange={handleChange}  
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Amount"
            required
          />
        </div>

        <div className="mb-4 ">
          <label htmlFor="stationery" className="block text-sm font-medium text-gray-600">Stationery</label>
          <input
            type="number" id="stationery" name="stationery" value={formData.stationery} onChange={handleChange}  
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Amount"
            required
          />
        </div>

        <div className="mb-4 ">
          <label htmlFor="printing " className="block text-sm font-medium text-gray-600">Printing </label>
          <input
            type="number" id="printing" name="printing"  value={formData.printing} onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Amount"
            required
          />
        </div>

        <div className="mb-4 ">
          <label htmlFor="accom " className="block text-sm font-medium text-gray-600">Accommodation/Hall </label>
          <input
            type="number" id="accom" name="accom" value={formData.accom} onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Amount"
            required
          /> 
        </div>

        <div className="mb-4 ">
          <label htmlFor="communication " className="block text-sm font-medium text-gray-600">Communication</label>
          <input
            type="number" id="communication" name="communication" value={formData.communication} onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Amount"
            required
          />
        </div>

        <div className="mb-4 ">
          <label htmlFor="resource " className="block text-sm font-medium text-gray-600">Resources Person</label>
          <input
            type="number" id="resource" name="resource" value={formData.resource} onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Amount"
            required
          />
        </div>

        <div className="mb-4 ">
          <label htmlFor="other " className="block text-sm font-medium text-gray-600">Other</label>
          <input
            type="number" id="other" name="other" value={formData.other} onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Amount"
            required
          />
        </div>

        <div className="mb-4 ">
          <label htmlFor="total" className="block text-sm font-medium text-gray-600">Total </label>
          <input
            type="number" id="total" name="total"  value={formData.total} onChange={handleChange} 
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Amount"
            required
          />
        </div>

        <div className="mb-4 ">
          <label htmlFor="inword" className="block text-sm font-medium text-gray-600">Total Expenses In Word </label>
          <input
            type="text" id="inword" name="inword" value={formData.inword} onChange={handleChange} 
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Amount"
            required
          />
        </div>
            </div>

            <hr class="border-t-2 border-white my-4" />

            <div className=' md:grid grid-cols-2 gap-4'>
            <div className="mb-4 ">
          <label htmlFor="vendor" className="block text-sm font-medium text-gray-600">Expenses Incurred By Vendor</label>
          <input
            type="number" id="vendor" name="vendor" value={formData.vendor} onChange={handleChange}  
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Amount"
            required
          />
        </div>

        <div className="mb-4 ">
          <label htmlFor="individual" className="block text-sm font-medium text-gray-600">Expenses Incurred By Individual</label>
          <input
            type="number" id="individual"  name="individual" value={formData.individual} onChange={handleChange}  
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Amount"
            required
          />
        </div>

        <div className="mb-4 ">
          <label htmlFor="totalAdvTake" className="block text-sm font-medium text-gray-600">Total Advance Taken</label>
          <input
            type="number" id="totalAdvTake" name="totalAdvTake" value={formData.totalAdvTake} onChange={handleChange}  
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Amount"
            required
          />
        </div>

        
        <div className="mb-4 ">
          <label htmlFor="receivable" className="block text-sm font-medium text-gray-600">Receivable (-) / Payable (+)</label>
          <input
            type="number" id="receivable" name="receivable" value={formData.receivable} onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Amount"
            disabled
          />
        </div>

        <div className="mb-4 md:w-[735px]  ">
          <label htmlFor="files" className="block text-sm font-medium text-gray-600">Upload Supporting Bills / Documents</label>
        
          <input
            type="file"  
            id="files" 
            name="files" 
            multiple   
            onChange={handleFileChange}
            className="mt-2 h-32    w-full px-4 py-2 border bg-slate-50 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        </div>
        
        
        
        <div className=' grid grid-cols-2 gap-4'>
      <button
          type="button" 
          className="inline-flex items-center justify-center rounded-full border border-transparent bg-cyan-300 px-7 py-3 text-center text-base font-medium text-dark shadow-5 hover:bg-cyan-500 disabled:border-gray-3 disabled:bg-gray-3 disabled:text-dark-5 dark:bg-gray-2 dark:shadow-box-dark dark:hover:bg-dark-5"

        >
          Reset
        </button>
        
        <button
          type="submit" 
               className="inline-flex items-center justify-center rounded-full border border-transparent bg-cyan-300 px-7 py-3 text-center text-base font-medium text-dark shadow-5 hover:bg-cyan-500 disabled:border-gray-3 disabled:bg-gray-3 disabled:text-dark-5 dark:bg-gray-2 dark:shadow-box-dark dark:hover:bg-dark-5"
        >
          Submit
        </button>
       
      </div>
        </form>

        </div>
    </div>
  )
}

export default SettelmentForm