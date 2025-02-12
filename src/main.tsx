import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RequiredBridalPowerProvider } from './contexts/RequiredBridalPowerContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RequiredBridalPowerProvider>
      <App />
    </RequiredBridalPowerProvider>
  </StrictMode>,
)
