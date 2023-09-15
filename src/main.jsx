import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.jsx'
import {Toaster} from "react-hot-toast";
import "react-multi-carousel/lib/styles.css";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App/>
        <Toaster/>
    </React.StrictMode>,
)
