import React from "react"
import ToggleMode from "./ToggleMode"
import Link from "next/link"
import MainNavLinks from "./MainNavLinks"

const MainNav = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Tickets",
      href: "/tickets",
    },
    {
      label: "Users",
      href: "/users",
    },
  ]

  return (
    <div className="flex justify-between gap-2">
      <MainNavLinks links={links} />
      <div className="flex items-center gap-2">
        <Link href="/" className="navbar-link">
          Logout
        </Link>
        <ToggleMode />
      </div>
    </div>
  )
}

export default MainNav
