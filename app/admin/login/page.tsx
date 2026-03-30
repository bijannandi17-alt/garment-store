"use client"

import { useState } from "react"

export default function AdminLoginPage() {

  const [password, setPassword] =
    useState("")

  const [error, setError] =
    useState("")

  const handleLogin = async () => {

    try {

      // 🔐 Static password check
      // (later we move to API login)

      if (password === "amropali@123") {

        // Save login session

        localStorage.setItem(
          "adminLoggedIn",
          "true"
        )

        // Redirect

        window.location.href =
          "/admin/dashboard"

      }

      else {

        setError(
          "Wrong password ❌"
        )

      }

    }

    catch (err) {

      console.error(err)

      setError(
        "Login failed"
      )

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center">

      <div className="border p-8 rounded w-80 bg-white shadow">

        <h1 className="text-2xl font-bold mb-4 text-center">

          Admin Login 🔐

        </h1>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full py-2 rounded"
        >

          Login

        </button>

        {error && (

          <p className="text-red-500 mt-3 text-sm">

            {error}

          </p>

        )}

      </div>

    </div>

  )

}