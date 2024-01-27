import {
  MapContainer, Marker, Popup, TileLayer, Polygon,
} from 'react-leaflet';
import Leaflet from 'leaflet';
import { useEffect, useState } from 'react';
import {
  FaFileCsv, FaTrash, FaFileDownload, FaEdit,
} from 'react-icons/fa';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import serverURL from '../utils/urls';
import getCsvData from '../utils/csv';
import useAuth from '../hooks/useAuth';
import downloadMap from '../utils/downloadmap';

export default function MyLocationsDetails() {
  return <div>MyLocationsMap</div>;
}
