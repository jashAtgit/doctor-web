import { useState } from "react";

function Register(){
    const [email, setEmail] = useState('');


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      }

    return (
        <>
            <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
                <div className="border-t border-gray-200" />
            </div>
            </div>
    
            <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Personal Information</h3>
                </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                <form action="#" method="POST">
                    <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                            First name
                            </label>
                            <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Last name
                            </label>
                            <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                            <label htmlFor="email-address" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                            </label>
                            <input
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="sex" className="block text-sm font-medium leading-6 text-gray-900">
                            Gender
                            </label>
                            <select
                            id="sex"
                            name="sex"
                            autoComplete="sex-value"
                            className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                            </select>
                        </div>


                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            City
                            </label>
                            <input
                            type="text"
                            name="city"
                            id="city"
                            autoComplete="address-level2"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                      </div>

                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                        type="submit"
                        className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                        Save
                        </button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
            </div>
    
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
    
          <div className="mt-10 sm:mt-0">
          </div>
        </>
      )
}

export default Register;