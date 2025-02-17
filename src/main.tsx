// src/main.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DndProvider } from './contexts/DndContext.tsx'
import { InputStateProvider } from './contexts/InputStateContext.tsx'
import { RequiredHanayomePowerProvider } from './contexts/RequiredHanayomePowerContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InputStateProvider>
      {/* <RequiredHanayomePowerProvider> */}
        <App />
      {/* </RequiredHanayomePowerProvider> */}
    </InputStateProvider>
  </StrictMode>,
)
