import React, { useState, useContext, createContext } from "react"
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom"
import Wrapper from "../assets/wrappers/Dashboard"
import { BigSidebar, Navbar, SmallSidebar } from "../components"
import { checkDefaultTheme } from "../App"
import customFetch from "../utils/customFetch"
import { toast } from "react-toastify"

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user")
    return data
  } catch (error) {
    console.log(error)
    return redirect("/")
  }
}

const DashboardContext = createContext()

const DashboardLayout = () => {
  const { user } = useLoaderData()
  const navigate = useNavigate()

  // temp
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    document.body.classList.toggle("dark-theme", isDarkTheme)
    localStorage.setItem("darkTheme", newDarkTheme)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const logoutUser = async () => {
    navigate("/")
    await customFetch.get("/auth/logout")
    toast.success("Logging out")
  }
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => {
  return useContext(DashboardContext)
}
export default DashboardLayout
