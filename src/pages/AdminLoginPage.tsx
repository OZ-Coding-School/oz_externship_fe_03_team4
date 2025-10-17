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
        <main className="min-h-screen bg-white"
    )
    }
  }
}
