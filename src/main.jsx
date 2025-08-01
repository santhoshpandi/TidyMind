import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PlanProvider } from './contexts/PlanContext.jsx'
import { SlideProvider } from './contexts/SlideContext.jsx'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider autoHideDuration={1000} anchorOrigin={{vertical:'top', horizontal:'center'}} >
      <SlideProvider>
        <PlanProvider>
          <App />
        </PlanProvider>
      </SlideProvider>
    </SnackbarProvider >
  </StrictMode>,
)
