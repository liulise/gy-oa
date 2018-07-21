import Axios from 'axios';
import { BASEURL } from 'src/config/mainConfig';

Axios.defaults.url = '/';
Axios.defaults.baseURL = BASEURL;
Axios.defaults.withCredentials = false;

export default Axios.create();
