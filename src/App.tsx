import { BrowserRouter as Router, Routes, Route } from 'react-router'
import './App.css'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route index element={<ToastTest />} /> */}
          {/* <Route path="users" element={<userspage />} /> 
            아래 부분에 이렇게 계속 라우팅 추가해주시면 됩니다. */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App