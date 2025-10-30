import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AdminLoginButton } from '../components/login/AdminLoginButton'
import { BrandLogo } from '../components/login/BrandLogo'
import { FormField, TextField } from '../components/FormUI'
import api from '../lib/axios'
import { getAccessToken, setAccessToken } from '../lib/token'
import { LoginErrorModal } from '../components/login/ErrorModal'
import { parseJwt } from '../lib/authz'

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  //   const [emailError, setEmailError] = useState<string | undefined>()
  //   const [pwError, setPwError] = useState<string | undefined>()
  const [errorModalOn, setErrorModalOn] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // 이미 로그인되어있을 경우 진입을 차단합니당.
  useEffect(() => {
    const accessToken = getAccessToken() // 쿠키에 저장된 액세스토큰 불러오기 (없으면 null)
    const claims = parseJwt(accessToken) // JWT 내부 정보를 추출함
    const isExpired = claims?.exp ? claims.exp * 1000 < Date.now() : true // 토큰만료여부를 판단

    if (accessToken && !isExpired) {
      // 이미 로그인되어 잇는거니??
      window.location.replace('/userlist') // 응, 그러면 안되 돌아가
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // setEmailError(undefined)
    // setPwError(undefined)

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement)
      const emailValue = String(formData.get('email') ?? '')
      const passwordValue = String(formData.get('password') ?? '')
      const loginResponse = await api.post('/v1/auth/login', {
        email: emailValue,
        password: passwordValue,
      })
      const accessToken =
        loginResponse.data?.data?.access ?? loginResponse.data?.access
      if (accessToken) {
        setAccessToken(accessToken)
        window.location.href = '/userlist'
      } else {
        setErrorMessage(
          '이메일 또는 비밀번호가 올바르지 않아요.\n다시 확인해 주세요.'
        )
        setErrorModalOn(true)
      }
      // await api.post("v1/auth/login", {email, password});
    } catch {
      setErrorMessage(
        '이메일 또는 비밀번호가 올바르지 않아요.\n다시 확인해 주세요.'
      )
      setErrorModalOn(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <main className="grid min-h-screen grid-cols-1 bg-white md:grid-cols-[1fr_720px]">
        <section className="flex items-center justify-center px-6">
          <div className="flex w-full max-w-sm flex-col items-center text-center">
            <BrandLogo />
            <h1 className="mt-4 text-[26px] font-extrabold tracking-tight text-neutral-900 select-none">
              관리자 로그인
            </h1>

            <p className="mt-10 text-[12.5px] leading-5 text-neutral-500 select-none">
              <span className="font-semibold text-amber-500">관리자</span>
              <span className="ml-1 text-amber-500">계정</span>을 통해 로그인을
              진행해주세요.
            </p>
            <form className="mt-3 w-full" onSubmit={handleSubmit}>
              <FormField
                id="email"
                label={<span className="sr-only">이메일</span>}
                className="mb-2 space-y-0"
              >
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@company.com"
                  leftIcon={<Mail className="h-5 w-5 text-amber-700" />}
                  className="h-12 text-[15px]"
                  autoComplete="username"
                  required
                />
              </FormField>
              <FormField
                id="password"
                label={<span className="sr-only">비밀번호</span>}
                className="space-y-1.5"
              >
                <TextField
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 입력하세요"
                  leftIcon={<Lock className="h-5 w-5 text-amber-700" />}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-neutral-400 transition hover:text-neutral-600"
                      aria-label={
                        showPassword ? '비밀번호 숨기기' : '비밀번호 보기'
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-6 w-6 text-amber-800" />
                      ) : (
                        <Eye className="h-6 w-6 text-amber-800" />
                      )}
                    </button>
                  }
                  className="h-12 text-[15px]"
                  autoComplete="current-password"
                  required
                />
              </FormField>

              <AdminLoginButton
                type="submit"
                full
                className="mt-5"
                disabled={isLoading}
                aria-busy={isLoading}
                isLoading={isLoading}
              >
                {isLoading ? '접속 중' : '접속하기'}
              </AdminLoginButton>
            </form>
          </div>
        </section>

        <aside
          aria-hidden
          className="relative hidden overflow-hidden bg-[#FFF7ED] md:block"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[150vh] leading-none font-extrabold text-[#fbbf24]/20 select-none">
              S
            </span>
          </div>
        </aside>
      </main>
      <LoginErrorModal
        isOn={errorModalOn}
        message={errorMessage}
        onClose={() => setErrorModalOn(false)}
      />
    </>
  )
}
