import 'normalize.css';
import 'src/assets/scss/reset.scss';
import 'src/assets/scss/index.scss';
import 'src/assets/js/polyfill';

import Axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import Index from 'src/pages/home/index.jsx';
import axios from 'src/tools/factoryAxios';

React.Axios = Axios;
window.axios = axios;

ReactDOM.render(<Index />, document.querySelector('#root'));
