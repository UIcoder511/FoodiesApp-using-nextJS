"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./main-nav-link.module.css";

export default function NavLink({ href, label }) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {label}
    </Link>
  );
}
