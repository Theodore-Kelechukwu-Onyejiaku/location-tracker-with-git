import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function MyLocationsMap({ handleSelectLocationForUpdate }) {
  const { authUser } = useAuth();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const userLocations = authUser?.locations || [];
    const initializeLocations = () => {
      setLocations(userLocations);
    };

    initializeLocations();
  }, [authUser]);

  return <div className="text-black dark:text-white p-3 lg:p-10">
    <div className="h-1/2">
      <p className="my-3 lg:my-7">Places you have visited and your coverage</p>
    </div>
    <div className="h-1/2">
      <p className="my-3 lg:my-7">Edit or delete a place you have visited from the map!</p>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {
          locations?.length > 0
            ? locations?.map((location) => (
              <div
                key={location?._id}
                id={location?._id}
                className="group  w-full  relative z-10 rounded-2xl shadow-lg dark:shadow-black bg-[#f6f6f9]rounded-2xl dark:bg-dark_green transition-all duration-1000"
              >
                <div className="group-hover:scale-105 group-hover:bg-[rgb(246,246,249)] bg-[#f6f6f9] dark:bg-dark_green dark:group-hover:bg-dark_green rounded-2xl absolute h-48 w-full z-20 transition-all duration-300 p-3 flex flex-col space-y-3" />
                <div className=" h-48 w-full   z-20 p-3 rounded-2xl ">
                  <div className="flex h-full flex-col justify-between relative z-40 w-full">
                    <div className="h-3/4 flex flex-col justify-between">
                      <div className="text-sm">
                        <span className="text-green-500">location:</span>
                        <span className="ml-3">{location?.name}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-green-500">lat:</span>
                        <span className="ml-2">{location?.latitude}</span>
                        <span className="ml-5 text-green-500">long:</span>
                        <span className="ml-2">{location?.latitude}</span>
                      </div>
                    </div>

                    <div className="h-1/4">
                      <div className="flex justify-between items-center w-full left-0 absolute bottom-0">
                        <button
                          type="button"
                          className="primary-button p-2 rounded-md flex items-center space-x-2 border border-red-500 cursor-pointer"
                        >
                          <FaTrash />
                          {' '}
                        </button>
                        <button
                          onClick={()=>{handleSelectLocationForUpdate(location)}}
                          type="button"
                          className="primary-button p-2 rounded-md flex items-center space-x-2 border border-green-500 cursor-pointer"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
            : (
              <div className="absolute left-0  w-full justify-center ">
                <div className="flex mx-24  flex-col space-y-5 p-3 lg:p-10 justify-center items-center">
                  <p className="text-center text-orange-600">You have not visited a place yet! Click the button below to add a place you have visited!</p>
                  <Link to="/add-location" className="text-black dark:text-white hover:text-black  ml-3 p-2 border-[1px] border-border_color rounded hover:border-green-500  hover:shadow transition-all duration-200 no-underline hover:no-underline">Add Location</Link>
                </div>
              </div>
            )
        }
      </div>
    </div>
  </div>;
}
