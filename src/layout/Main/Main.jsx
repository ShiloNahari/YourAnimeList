import React from "react"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import NoPage from "../../pages/NoPage/NoPage"
import Home from "../../pages/Home/Home"
import Layout from "../../components/NavBar/NavBar"
import Privacy from "../../pages/Privacy Policy/Privacy"
import Register from "../../pages/Register/Register"
import Login from "../../pages/Login/Login"
import Profile from "../../pages/profile/Profile"
import Settings from "../../pages/profile/settings/Settings"
import AnimeDetails from "../../pages/AnimeDetails/AnimeDetails"
import Search from "../../pages/search/Search"
import Admin from "../../pages/Admin/Admin"
import { useAuthContext } from "../../hooks/useAuthContext"
import TableList from "../../components/TableList/TableList"


export default function Main() {
  
  const { user } = useAuthContext()
  return (
    <BrowserRouter>
      <div className="Main">
        <Header />

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" index element={<Home />} />
            <Route path="/anime-list/:userId" index element={<TableList />} />
            <Route path="/anime/:animeId" element={<AnimeDetails />} />
            <Route path="/results/:animeTitle" element={<Search />} />
            <Route path="/profile/:id/" element={<Profile />}>
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-panel" element={user && user.role === 'admin' ?<Admin />:<Login/>}/>
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookie" element={<Privacy />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>

        <Footer />
      </div>
      <Outlet />
    </BrowserRouter>
  )
}
