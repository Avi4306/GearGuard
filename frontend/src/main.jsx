import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import rootReducer from './reducers/index.js'

const store = configureStore({
  reducer: rootReducer,       // This can be a combined reducer or a single one
});

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
  <StrictMode>
    <App />
  </StrictMode>,
    </Router>
  </Provider>
)
