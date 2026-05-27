import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/App.css'
import App from './app/App.jsx'
import {BrowserRouter} from 'react-router-dom'
import ShopContextProvider from './context/shopContext'
import { Provider } from 'react-redux'
import { appStore } from './app/app.store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>
  </Provider>,
)
