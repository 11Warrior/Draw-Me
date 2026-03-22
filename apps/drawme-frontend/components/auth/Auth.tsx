"use client"
import { useContext, useState } from 'react'
import { AuthModes } from '../../types/drawme.types'
import { Card } from '@repo/ui/card'
import { ArrowRight } from 'lucide-react'
import { UserContext } from '../../context/UserContext'
import { useRouter } from 'next/navigation'
import { GlobalContext } from '../../context/GlobalContext'

type SignUpProps = {
  mode: AuthModes,
  handleModeChange: (mode: AuthModes) => void;
}

type AuthDataType = {
  email: string,
  password: string,
  username: string
}

const Auth = ({ mode, handleModeChange }: SignUpProps) => {
  const navigate = useRouter();
  const [data, setData] = useState<AuthDataType>({
    email: "",
    password: "",
    username: ""
  })

  const context = useContext(UserContext);
  const globalContext = useContext(GlobalContext);

  if (!context || !globalContext) return null;

  const { SignInUser, SignUpUser } = context
  const { setPanelState } = globalContext;

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    if (mode === 'login') {
      await SignInUser(
        {
          username: data.username,
          password: data.password,
          mode: 'sign-in'
        }
      )
    }
    else if (mode === 'signup') {
      await SignUpUser(
        {
          username: data.username,
          password: data.password,
          email: data.email,
          mode: 'sign-up'
        }
      )
    }

    setData({
      email: "",
      password: "",
      username: ""
    })

    setPanelState(true);
    navigate.push('/');
  }

  return (
    <div className="w-105 rounded-lg overflow-hidden">
      <div className="text-center mb-6">
        <h1 className="text-[3vw] text-black font-semibold italic">Drawme</h1>
        <p className="text-gray-500 mt-2 text-2vw">
          Welcome back! Sign in to continue.
        </p>
      </div>

      <Card className="w-full bg-white border border-gray-200 shadow-md p-6">
        <div className="bg-gray-100 p-1 rounded-lg mb-6">
          <div className="flex">
            <button
              className={`flex-1 h-10 rounded-md text-sm font-medium transition cursor-pointer
                ${mode === "login" ? "bg-white shadow text-black" : "text-gray-500"}`}
              onClick={() => handleModeChange("login")}
            >
              Sign in
            </button>

            <button
              className={`flex-1 h-10 rounded-md text-sm font-medium transition cursor-pointer
                ${mode === "signup" ? "bg-white shadow text-black" : "text-gray-500"}`}
              onClick={() => handleModeChange("signup")}
            >
              Sign up
            </button>
          </div>
        </div>

        {mode === 'signup' && (
          <div className="mb-4">
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full mt-1 p-3 text-black rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        )}

        <div>
          <div className="mb-4">
            <label className="text-sm text-gray-700">Username</label>
            <input
              type="text"
              placeholder="ghost"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              className="w-full mt-1 p-3 text-black rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full mt-1 p-3 rounded-lg text-black border border-gray-300 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <button onClick={handleSubmit} className="w-full flex items-center justify-center cursor-pointer gap-2 bg-orange-500 hover:bg-orange-600 transition text-white text-2vw py-3 rounded-lg">
          {mode === "login" ? `Sign In ` : "Create account"}
          <div className='size-5'>
            <ArrowRight className='size-full' />
          </div>
        </button>
      </Card>
    </div>
  )
}

export default Auth