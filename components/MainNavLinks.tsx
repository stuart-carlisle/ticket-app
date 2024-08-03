"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MainNavLinks = ({ links }) => {
  const currentPath = usePathname()
  console.log(currentPath)

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => {
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
