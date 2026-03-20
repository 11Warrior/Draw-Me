"use client"
import { useState } from "react"
import { AuthModes } from "../../types/drawme.types"
import Auth from "../../components/auth/Auth"

const AuthClient = () => {
    const [mode, setMode] = useState<AuthModes>("login")

    const handleModeChange = (mode: AuthModes) => {
        setMode(mode);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-100">
            <Auth mode={mode} handleModeChange={handleModeChange} />
        </div>
    )
}

export default AuthClient