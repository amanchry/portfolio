import React, { useState } from 'react';
import Logo from "../public/images/logo.png"
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    const handleToggle = () => {
        setShowMenu(!showMenu);
    };

    const handleLinkClick = () => {
        setShowMenu(false);
    };

    const isActive = (path) => {
        return router.pathname === path;
    };



    return (
        <div className="navbar_container ">
            <div className="navbar__logo">
                <Link href="/">
                    <Image src={Logo} alt="nav_logo" />
                </Link>
            </div>

            <button className="navbar__toggle" onClick={handleToggle}>
                {showMenu ? <FaTimes /> : <FaBars />}
            </button>

            <div className={`main_nav container ${showMenu ? 'show' : ''}`}>
                <div className="nav__content">
                    <div className="main_nav_logo">
                        <Link href="/" onClick={handleLinkClick}>
                            <Image src={Logo} alt="nav_logo" />
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


                        <Link href="/portfolio" className={isActive('/portfolio') ? 'nav_item active_nav' : 'nav_item'} onClick={handleLinkClick}>
                            Portfolio
                        </Link>

                        <Link href="/blogs" className={isActive('/blogs') ? 'nav_item active_nav' : 'nav_item'} onClick={handleLinkClick}>
                            Blogs
                        </Link>

                        <Link href="/contact" className={isActive('/contact') ? 'nav_item active_nav' : 'nav_item'} onClick={handleLinkClick}>
                            Contact
                        </Link>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default Navbar
