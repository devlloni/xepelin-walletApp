"use client"
import React, { Fragment } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import NavbarLoggedIn from './navbar/NavbarLoggedIn';
import NavbarLoggedOut from './navbar/NavbarLoggedOut';

const NavBar = () => {
    const { data: session } = useSession();
    const sessionImage: string = session?.user?.image || 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png';
    const navigation = [
        { name: 'Tablero', href: '/dashboard', current: true },
        { name: 'Transacciones', href: '/transactions', current: false },
        { name: 'Información', href: '#', current: false },
    ]
    const userNavigation = [
        { name: 'Tu perfil', href: '#' },
        { name: 'Ajustes', href: '#' },
    ]
    const classNames = (...classes: any[]): any => {
        return classes.filter(Boolean).join(' ')
    }

    const pathname = usePathname() || '/';
    const withoutNavbarRoutes = [
        '/',
    ];

    const isWithoutNavbar = withoutNavbarRoutes.includes(pathname);

    if(isWithoutNavbar) {
        return(
            <></>
        )
    } else {
        return (
            <div>
               {session?.user ? (
                <NavbarLoggedIn
                    navigation={navigation}
                    userNavigation={userNavigation}
                    classNames={classNames}
                    sessionImage={sessionImage}
                    session={session}
                    signOut={signOut}
                />
               ) : (
                <NavbarLoggedOut
                    navigation={navigation}
                    classNames={classNames}
                    signIn={signIn}
                />
               )} 
            </div>
        )
    }
}

export default NavBar;