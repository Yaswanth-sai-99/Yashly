import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import { Store } from './RTK/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter> 
   <Provider store ={Store}>
    <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
