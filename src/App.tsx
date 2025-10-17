import { BrowserRouter as Router, Routes, Route } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import ButtonTestPage from './pages/tests/ButtonTestPage'
import { LocalFilterExample } from './components/search/LocalFilterExample'
import ExampleForm from './components/FormUI/ExampleForm'
import AdminLoginPage from './pages/AdminLoginPage'
import DanbiTestPage from './pages/tests/DanbiTestPage'
import HYTestPage from './pages/tests/HYTestPage'
import WonheeTestPage from './pages/tests/WonheeTestPage'
import KyungbokTestPage from './pages/tests/kyungbokTestPage'
import HyunjinTestPage from './pages/tests/hyunjinTestPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route element={<Layout />}>
          {/* <Route index element={<ToastTest />} /> */}
          <Route index element={<ButtonTestPage />} />
          <Route path="searchtest" element={<LocalFilterExample />} />
          <Route path="example" element={<ExampleForm />} />
          <Route path="wonhee" element={<WonheeTestPage />} />
          <Route path="danbi" element={<DanbiTestPage />} />
          <Route path="hy" element={<HYTestPage />} />
          <Route path="bok" element={<KyungbokTestPage />} />
          <Route path="hyunjin" element={<HyunjinTestPage />} />
          {/* <Route path="users" element={<userspage />} /> 
            아래 부분에 이렇게 계속 라우팅 추가해주시면 됩니다. */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
