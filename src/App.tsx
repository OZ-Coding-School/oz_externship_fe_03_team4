import { BrowserRouter as Router, Routes, Route } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import ButtonTestPage from './pages/tests/ButtonTestPage'
import { LocalFilterExample } from './components/search/LocalFilterExample'
import ExampleForm from './components/FormUI/ExampleForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route index element={<ToastTest />} /> */}
          <Route index element={<ButtonTestPage />} />
          <Route path="searchtest" element={<LocalFilterExample />} />
          <Route path="example" element={<ExampleForm />} />
          {/* <Route path="users" element={<userspage />} /> 
            아래 부분에 이렇게 계속 라우팅 추가해주시면 됩니다. */}
        </Route>
      </Routes>
    </Router>
  )
}
export default App