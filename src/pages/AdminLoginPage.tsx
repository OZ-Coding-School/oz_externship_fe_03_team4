import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { AdminLoginButton } from '../components/login/AdminLoginButton'
import { BrandLogo } from '../components/login/BrandLogo'
import { FormField, TextField } from '../components/FormUI'

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState<string | undefined>()
  const [pwError, setPwError] = useState<string | undefined>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setEmailError(undefined)
    setPwError(undefined);

    try {
        // await api.post("v1/auth/login", {email, password});
    } catch (err) {
        console.error(err);
    } finally {
        setIsLoading(false);
    }
};

    return(
        <main className="min-h-screen bg-white grid grid-cols-1 md:grid-cols-[1fr_720px]">
            <section className="flex items-center justify-center px-6">
                <div className="w-full max-w-sm flex flex-col items-center text-center">
                    <BrandLogo />
                    <h1 className="mt-4 text-[26px] font-extrabold tracking-tight text-neutral-900 select-none">
                        관리자 로그인
                    </h1>

                    <p className="mt-10 text-[12.5px] leading-5 text-neutral-500 select-none">
                        <span className="text-amber-500 font-semibold">관리자</span>
                        <span className="text-amber-500 ml-1">계정</span>을 통해 로그인을 진행해주세요.
                    </p>
                    <form className="mt-3 w-full space-y-3" onSubmit={handleSubmit}>
                        <FormField
                            id="email"
                            label="이메일"
                            hint={!emailError && "이메일을 확인하세요"}
                            error={emailError}
                        >
                            <TextField
                                id="email"
                                type="email"
                                placeholder="example@company.com"
                                leftIcon={<Mail className="h-5 w-5 text-amber-700" />}
                                autoComplete="username"
                                required
                            />
                        </FormField>
                    </form>
                </div>
            </section>
        </main>
    )
    }
  }
}
