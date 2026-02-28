'use client';

import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    const handleToggle = () => {
        setShowMenu(!showMenu);
    };

    const handleLinkClick = () => {
        setShowMenu(false);
    };

    const isActive = (path) => {
        return pathname === path;
    };



    return (
        <div className="navbar_container ">
            <div className="navbar__logo">
                <Link href="/">
                    <Image src="/images/logo.png" alt="nav_logo" width={400} height={40} />
                </Link>
            </div>

            <button className="navbar__toggle" onClick={handleToggle}>
                {showMenu ? <FaTimes /> : <FaBars />}
            </button>

            <div className={`main_nav container ${showMenu ? 'show' : ''}`}>
                <div className="nav__content">
                    <div className="main_nav_logo">
                        <Link href="/" onClick={handleLinkClick}>
                            <Image src="/images/logo.png" alt="nav_logo" width={400} height={40} />
                        </Link>
                    </div>

                    <div className="nav__list">


                        <Link href="/" className={isActive('/') ? 'nav_item active_nav' : 'nav_item'} onClick={handleLinkClick}>
                            Home
                        </Link>

                 


{/* 
                        <Link href="/resume" className={isActive('/resume') ? 'nav_item active_nav' : 'nav_item'} onClick={handleLinkClick}>
                            Resume
                        </Link> */}


                        <Link href="/about" className={isActive('/about') ? 'nav_item active_nav' : 'nav_item'} onClick={handleLinkClick}>
                            About
                        </Link>

                        <Link href="/projects" className={isActive('/projects') ? 'nav_item active_nav' : 'nav_item'} onClick={handleLinkClick}>
                            Projects
                        </Link>

                        <Link href="/blogs" className={isActive('/blogs') ? 'nav_item active_nav' : 'nav_item'} onClick={handleLinkClick}>
                            Blogs
                        </Link>

                        <Link href="/contact" className={isActive('/contact') ? 'nav_item active_nav' : 'nav_item'} onClick={handleLinkClick}>
                            Contact
                        </Link>

                        {session?.user?.admin && (
                            <Link href="/admin" className={isActive('/admin') ? 'nav_item active_nav' : 'nav_item'} onClick={handleLinkClick}>
                                Admin
                            </Link>
                        )}

                    </div>

                </div>
            </div>
        </div>

    )
}

export default Navbar
