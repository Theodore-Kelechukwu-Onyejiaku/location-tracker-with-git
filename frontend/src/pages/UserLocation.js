import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  MapContainer, Marker, Popup, TileLayer,
} from 'react-leaflet';
import Leaflet from 'leaflet';
import useAuth from '../hooks/useAuth';
import serverURL from '../utils/urls';
import Loader from '../components/Loader';

export default function UserLocation() {
  // get username from request parameters
  const { username } = useParams();

  // create state variables
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // invoke the custom authentication hook
  useAuth();

  useEffect(() => {
    // create the getUser function
    const getUser = async () => {
      try {
        // get result data from request
        const { data: { data } } = await axios.get(`${serverURL}/locations/user/${username}`);

        // update states
        setUserDetails(data);
        setLoading(false);
      } catch (error) {
        const responseError = error?.response?.data?.message;
        toast.error(responseError || error.message);
        setLoading(false);
      }
    };

    // invoke getUser() function
    getUser();

  }, [username]);

  return (
    <div className="p-3 h-screen lg:p-10 py-10 dark:text-white border mt-10">
      {
        loading ? <Loader />
          : userDetails
            ? (
              <div className="h-screen w-full  flex flex-col ">
                <div className="h-1/6">
                  <p className="my-3">
                    This user has{" "}
                    <span className="text-green-500">{userDetails?.friends?.length}</span>{" "}
                    friends
                  </p>
                  <p>
                    And has visited{" "}
                    <span className="text-green-500">{userDetails?.locations?.length}</span>{" "}
                    place(s).
                  </p>
                </div>
              </div>
            )
            : <div>User details not available</div>
      }
    </div>
  );
}
