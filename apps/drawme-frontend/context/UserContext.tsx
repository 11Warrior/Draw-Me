"use client"
import { createContext, ReactNode, useState } from 'react'
import { UserContextArgType, UserContextType } from '../types/drawme.types';
import axios from 'axios';
//sign-up sign-in
export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [login, setLogin] = useState(false);

  const SignInUser = async ({ username, password, mode }: UserContextArgType) => {
    // console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${mode}`, {
      username,
      password
    }, {
      withCredentials: true
    })

    // const { token } = await data.data();
    // sessionStorage.setItem('token', token)
  }

  const SignUpUser = async ({ username, password, email, mode }: UserContextArgType) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${mode}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        email
      })
    })
  }

  const IsAuthUser = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
      {
        withCredentials: true
      }
    )
    if (!res.data) {
      setLogin(false);
      return;
    }
    setLogin(true);
  }

  return (
    <UserContext.Provider value={{ SignInUser, SignUpUser, IsAuthUser, login }}>
      {children}
    </UserContext.Provider>
  )
}