import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
const App = lazy(() => import('./App'))

import '../i18n';

ReactDOM.render(
    <Suspense fallback={<div>Loagin Application</div>}>
        <App />
    </Suspense>,
    document.getElementById('root')
);
