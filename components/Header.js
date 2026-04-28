'use client';
import React from 'react';
import Link from 'next/link';
import { FaVoteYea, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from './AuthProvider';
import styles from './Header.module.css';

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
                  <img src={user.photoURL} alt={user.displayName} className={styles.avatar} />
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
