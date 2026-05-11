import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/App.css'
import App from './app/App.jsx'
import {BrowserRouter} from 'react-router-dom'
import ShopContextProvider from './context/shopContext'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>,
)
