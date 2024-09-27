import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import A from './A.jsx'
import './index.css'
import MainContext from './MainContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContext>
      <A />
    </MainContext>
  </StrictMode>,
)
