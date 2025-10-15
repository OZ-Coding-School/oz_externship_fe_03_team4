import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import './App.css'

// import './index.css'
import ExampleForm from './components/FormUI/ExampleForm'
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExampleForm />
  </StrictMode>
)
