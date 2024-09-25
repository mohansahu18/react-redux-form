// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { updateField, updateCountry } from "./addressSlice";

// export default function AddressForm() {
//   const fields = useSelector((state) => state.address.fields);
//   const submitDisabled = useSelector((state) => state.address.submitDisabled);

//   const dispatch = useDispatch();

//   const handleInputChange = (e) => {
//     // debugger;
//     const { id, value } = e.target;
//     dispatch(updateField({ id, value }));
//     if (id === "country") {
//       dispatch(updateCountry(value));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted", fields);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-2xl rounded-lg overflow-hidden"
//         >
//           <div className="px-6 py-8 sm:p-10">
//             <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
//               Address Information
//             </h2>
//             <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
//               {fields.map(
//                 (field) =>
//                   field.status && (
//                     <div
//                       key={field.id}
//                       className={field.width === "full" ? "sm:col-span-2" : ""}
//                     >
//                       <label
//                         htmlFor={field.id}
//                         className="block text-sm font-medium text-gray-700 mb-1"
//                       >
//                         {field.title}
//                       </label>
//                       {field.type === "select" ? (
//                         <select
//                           id={field.id}
//                           value={field.value}
//                           onChange={handleInputChange}
//                           className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${field.class}`}
//                         >
//                           <option value="">Select {field.title}</option>
//                           {field.options.map((option) => (
//                             <option key={option.value} value={option.value}>
//                               {option.text}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <input
//                           type={field.type}
//                           id={field.id}
//                           value={field.value}
//                           onChange={handleInputChange}
//                           className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${field.class}`}
//                           placeholder={`Enter your ${field.title.toLowerCase()}`}
//                         />
//                       )}
//                       {!field.validate && (
//                         <p className="mt-2 text-sm text-red-600">
//                           {field.validateError}
//                         </p>
//                       )}
//                     </div>
//                   )
//               )}
//             </div>
//           </div>
//           <div className="px-6 py-8 bg-gray-50 sm:px-10">
//             <button
//               type="submit"
//               disabled={submitDisabled}
//               className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
//                 submitDisabled ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField, updateCountry } from "../redux/addressSlice";

export default function AddressForm() {
  const { fields, buttons } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updateField({ id, value }));
    if (id === "country") {
      dispatch(updateCountry(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!buttons[0].disabled) {
      const formData = fields.reduce((acc, field) => {
        acc[field.id] = field.value;
        return acc;
      }, {});
      console.log("Form submitted", formData);
      // Here you would typically send the data to your backend
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-lg overflow-hidden"
        >
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
              Address Information
            </h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              {fields.map(
                (field) =>
                  field.status && (
                    <div
                      key={field.id}
                      className={field.width === "full" ? "sm:col-span-2" : ""}
                    >
                      <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {field.title}
                      </label>
                      {field.type === "select" ? (
                        <select
                          id={field.id}
                          value={field.value}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${field.class}`}
                        >
                          <option value="">Select {field.title}</option>
                          {field?.options?.map((option) => (
                            <option key={option?.value} value={option.value}>
                              {option.text}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          id={field.id}
                          value={field.value}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${field.class}`}
                          placeholder={`Enter your ${field.title.toLowerCase()}`}
                        />
                      )}
                      {!field.validate && (
                        <p className="mt-2 text-sm text-red-600">
                          {field.validateError}
                        </p>
                      )}
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="px-6 py-8 bg-gray-50 sm:px-10">
            <button
              type={buttons[0].type}
              disabled={buttons[0].disabled}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
                buttons[0].disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {buttons[0].title}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
