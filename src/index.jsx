import 'typeface-lato';
import 'font-awesome/css/font-awesome.css';

import './style.scss';

import * as React from 'react';
import { render } from 'react-dom';

import App from './App';

const root = document.createElement('div');
root.className = 'react-root';
document.body.appendChild(root);

render(<App />, root);
