// src/main.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DndProvider } from './contexts/DndContext.tsx'
import { InputStateProvider } from './contexts/InputStateContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DndProvider onDragEnd={() => { }}>
      <InputStateProvider>
        <App />
      </InputStateProvider>
    </DndProvider>
  </StrictMode>,
)
