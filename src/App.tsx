import { BrowserRouter as Router, Routes, Route } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import DanbiTestPage from './pages/tests/DanbiTestPage'
import HYTestPage from './pages/tests/HYTestPage'
import WonheeTestPage from './pages/tests/WonheeTestPage'
import KyungbokTestPage from './pages/tests/KyungbokTestPage'
import HyunjinTestPage from './pages/tests/HyunjinTestPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="danbi" element={<DanbiTestPage />} />
          <Route path="wonhee" element={<WonheeTestPage />} />
          <Route path="hy" element={<HYTestPage />} />
          <Route path="hyunjin" element={<HyunjinTestPage />} />
          <Route path="bok" element={<KyungbokTestPage />} />
          {/* <Route index element={<ToastTest />} /> /}
          {/ <Route path="users" element={<userspage />} /> 
            아래 부분에 이렇게 계속 라우팅 추가해주시면 됩니다. */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
