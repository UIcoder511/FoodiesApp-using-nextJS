import Link from "next/link";
import logoOb from "@/app/icon.png";
import classes from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./main-nav-link";

const navLinksConfig = [
  { href: "/meals", label: "Browse Meals" },
  // { href: "/meals/share", label: "Share a Meal" },
  { href: "/community", label: "Community" },
];

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href={"/"}>
          <Image src={logoOb} alt="logo" priority />
          Foodies
        </Link>
        <nav className={classes.nav}>
          <ul>
            {navLinksConfig.map(({ href, label }) => (
              <li key={href}>
                <NavLink href={href} label={label} />
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
