import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import './App.css'
const Layout = lazy(() => import('./components/Layout'))
const DanbiTestPage = lazy(() => import('./pages/tests/DanbiTestPage'))
const HYTestPage = lazy(() => import('./pages/tests/HYTestPage'))
const WithdrawalManagementPage = lazy(() => import('./pages/WithdrawalManagementPage'))
const WonheeTestPage = lazy(() => import('./pages/tests/WonheeTestPage'))
const KyungbokTestPage = lazy(() => import('./pages/tests/KyungbokTestPage'))
const HyunjinTestPage = lazy(() => import('./pages/tests/HyunjinTestPage'))
const UserListPage = lazy(() => import('./pages/UserListPage'))
const StudyReviewPage = lazy(() => import('./pages/StudyReviewPage'))
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const StudyApplicationPage = lazy(() => import('./pages/StudyApplicationPage'))
const LectureManagementPage = lazy(
  () => import('./pages/LectureManagementPage')
)
const RecruitmentManagementPage = lazy(
  () => import('./pages/RecruitmentManagementPage')
)
const AdminProtectedRoute = lazy(
  () => import('./components/AdminProtectedRoute')
)
const StudyGroupManagementPage = lazy(
  () => import('./pages/StudyGroupManagementPage')
)
import { Spinner } from './components/Spinner'

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <Spinner size={100} />
          </div>
        }
      >
        <Routes>
          <Route index element={<AdminLoginPage />} />
          <Route path="login" element={<AdminLoginPage />} />

          <Route
            element={
              <Suspense
                fallback={
                  <div className="flex h-screen items-center justify-center">
                    <Spinner size={100} />
                  </div>
                }
              >
                <AdminProtectedRoute>
                  <Layout />
                </AdminProtectedRoute>
              </Suspense>
            }
          >
            <Route path="danbi" element={<DanbiTestPage />} />
            <Route path="wonhee" element={<WonheeTestPage />} />
            <Route path="hy" element={<HYTestPage />} />
            <Route path="hyunjin" element={<HyunjinTestPage />} />
            <Route path="bok" element={<KyungbokTestPage />} />
            <Route path="userlist" element={<UserListPage />} />
            <Route path="reviews" element={<StudyReviewPage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="withdraw-management" element={<WithdrawalManagementPage />} />
            <Route path="application" element={<StudyApplicationPage />} />
            <Route
              path="lecture-management"
              element={<LectureManagementPage />}
            />
            <Route path="recruit" element={<RecruitmentManagementPage />} />
            <Route
              path="study-group-management"
              element={<StudyGroupManagementPage />}
            />

            {/* <Route index element={<ToastTest />} /> /}
          {/ <Route path="users" element={<userspage />} /> 
            아래 부분에 이렇게 계속 라우팅 추가해주시면 됩니다. */}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
