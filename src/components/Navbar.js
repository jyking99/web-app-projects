import React from 'react';
import { Link } from "react-router-dom";

import css from './Navbar.module.css';
import publicUrl from 'utils/publicUrl';

function Navbar() {
    // function handleNavChange(page) {
    //     if (props.onNavChange) {
    //         props.onNavChange(page);
    //     }
    // }

    return (
        <nav className={css.navbar}>
            <div className={css.navItem}>
                <Link to="/">
                    <img src={publicUrl('/assets/home.svg')} alt="Home" />
                </Link>
            </div>
            <div className={css.navItem}>
                <Link to="/explore">
                    <img src={publicUrl('/assets/explore.svg')} alt="Explore" />
                </Link>
            </div>
            <div className={css.navItem}>
                <Link to="/newpost">
                    <img src={publicUrl('/assets/newpost.svg')} alt="Newpost" />
                </Link>
            </div>
            <div className={css.navItem}>
                <Link to="/activity">
                    <img src={publicUrl('/assets/activity.svg')} alt="Activity" />
                </Link>
            </div>
            <div className={css.navItem}>
                <Link to="/profile">
                    <img src={publicUrl('/assets/profile.svg')} alt="Home" />
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;

