'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaVoteYea, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from './AuthProvider';
import styles from './Header.module.css';

/**
 * Header Component.
 * Persistent navigation bar featuring the CivicAI logo and Authentication controls.
 * Integrates with AuthProvider for user state management.
 * 
 * @returns {JSX.Element} The Header component
 */
const Header = () => {
  const { user, login, logout, loading } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <FaVoteYea className={styles.logoIcon} />
          <span>CivicAI</span>
        </Link>

        <nav className={styles.nav}>
          {!loading && (
            user ? (
              <div className={styles.userProfile}>
                {user.photoURL ? (
                  <Image 
                    src={user.photoURL} 
                    alt={user.displayName || 'User'} 
                    className={styles.avatar}
                    width={32}
                    height={32}
                  />
                ) : (
                  <FaUserCircle className={styles.avatarPlaceholder} />
                )}
                <span className={styles.userName}>{user.displayName?.split(' ')[0]}</span>
                <button onClick={logout} className={styles.logoutBtn} title="Logout">
                  <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <button onClick={login} className={styles.loginBtn}>
                Sign In
              </button>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
