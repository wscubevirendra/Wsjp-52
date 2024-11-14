import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Context from './Context.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Context>
      <App />
    </Context>
  </Provider>,
)
