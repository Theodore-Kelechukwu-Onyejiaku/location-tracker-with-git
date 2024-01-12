import Autocomplete from '../components/Autocomplete';
import MapComponent from '../components/MapComponent';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import serverURL from '../utils/urls';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../utils/AppContext';

export default function AddLocation() {
  useAuth();
  return (
    <div className="">
      <div className="h-screen  overflow-hidden left-0 fixed w-full">
        <div className="fixed lg:absolute w-full mt-20  z-40 flex flex-col justify-center items-center">
          <div className="w-[400px]">
            <Autocomplete />
          </div>
        </div>
        <div className="absoulte top-0 h-full">
          <MapComponent />
        </div>
      </div>
    </div>
  );
}