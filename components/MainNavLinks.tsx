"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
  role?: string
}

const MainNavLinks = ({ role }: Props) => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
      adminOnly: false,
    },
    {
      label: "Tickets",
      href: "/tickets",
      adminOnly: false,
    },
    {
      label: "Users",
      href: "/users",
      adminOnly: true,
    },
  ]
  const currentPath = usePathname()

  return (
    <div className="flex items-center gap-2">
      {links
        .filter((link) => !link.adminOnly || role === "ADMIN")
        .map((link) => {
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`navbar-link ${
                currentPath == link.href &&
                "cursor-default text-primary/70 hover:text-primary/60"
              }`}
            >
              {link.label}
            </Link>
          )
        })}
    </div>
  )
}

export default MainNavLinks
