import 'typeface-lato';
import 'font-awesome/css/font-awesome.css';

import './style.scss';

import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import AppLayout from './Layout/AppLayout';

const root = document.createElement('div');
root.className = 'react-root';
document.body.appendChild(root);

const Root = () => (
    <BrowserRouter>
        <AppLayout />
    </BrowserRouter>
)

render(<Root />, root);
