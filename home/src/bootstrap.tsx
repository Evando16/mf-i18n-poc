import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app'

import '../i18n';

ReactDOM.render(
    <Suspense fallback={<div>Loagin Application</div>}>
        <App />
    </Suspense>,
    document.getElementById('root')
);
