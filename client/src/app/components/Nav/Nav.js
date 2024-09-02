"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const Nav = () => {
  const pathname = usePathname();
  const isOnboarding = pathname === "/onboard";
  return (
    <Navbar className={styles.Nav}>
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-2" color="foreground">
          <p className="font-bold text-inherit">LingoBites</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {!isOnboarding && (
          <>
            <NavbarItem>
              <Link color="foreground" href="#features">
                Como Funciona
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#pricing">
                Precios
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex"></NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="#"
            variant="flat"
            className="button"
            onPress={() =>
              signIn("google", {
                callbackUrl: "/onboard",
              })
            }
          >
            Registrarse!
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
