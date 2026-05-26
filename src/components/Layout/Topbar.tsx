import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import logo from '@/assets/logo.svg';
import styles from './Topbar.module.scss';

interface TopbarProps {
  onMenuToggle: () => void;
}

function LogoutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5.25 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V2.91667C1.75 2.60725 1.87292 2.3105 2.09171 2.09171C2.3105 1.87292 2.60725 1.75 2.91667 1.75H5.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.33333 9.91667L12.25 7L9.33333 4.08333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.25 7H5.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  const { logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userMenuOpen) return;
    function handleOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [userMenuOpen]);

  function handleLogout() {
    setUserMenuOpen(false);
    logout();
  }

  return (
    <header className={styles.topbar} role="banner">
      {/* Left: logo */}
      <div className={styles.left}>
        <button className={styles.hamburger} onClick={onMenuToggle} aria-label="Toggle navigation menu">
          <span /><span /><span />
        </button>
        <Link to="/dashboard" className={styles.logoLink} aria-label="Lendsqr home">
          <img src={logo} alt="Lendsqr" className={styles.logo} />
        </Link>
      </div>

      {/* Center: search */}
      <div className={styles.center}>
        <div className={styles.searchWrapper}>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search for anything"
            aria-label="Search"
          />
          <button className={styles.searchBtn} aria-label="Submit search">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M6.33333 11.6667C9.27885 11.6667 11.6667 9.27885 11.6667 6.33333C11.6667 3.38781 9.27885 1 6.33333 1C3.38781 1 1 3.38781 1 6.33333C1 9.27885 3.38781 11.6667 6.33333 11.6667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 13L10.1 10.1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Right: docs, bell, user */}
      <nav className={styles.right} aria-label="Top navigation">
        <a href="#" className={styles.docsLink}>Docs</a>

        <button className={styles.iconBtn} aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 18.3333C10.9167 18.3333 11.6667 17.5833 11.6667 16.6667H8.33333C8.33333 17.5833 9.08333 18.3333 10 18.3333ZM15 13.3333V9.16667C15 6.60833 13.6417 4.45833 11.25 3.89167V3.33333C11.25 2.64167 10.6917 2.08333 10 2.08333C9.30833 2.08333 8.75 2.64167 8.75 3.33333V3.89167C6.35 4.45833 5 6.6 5 9.16667V13.3333L3.33333 15V15.8333H16.6667V15L15 13.3333Z" fill="#213F7D"/>
          </svg>
        </button>

        {/* User menu */}
        <div className={styles.userMenuWrapper} ref={userMenuRef}>
          <div className={styles.avatar} aria-hidden="true">A</div>
          <button
            className={styles.userBtn}
            onClick={() => setUserMenuOpen((v) => !v)}
            aria-label="User menu"
            aria-expanded={userMenuOpen}
            aria-haspopup="menu"
          >
            <span className={styles.userName}>Adedeji</span>
            <svg
              width="10" height="6" viewBox="0 0 10 6" fill="none"
              className={`${styles.chevron} ${userMenuOpen ? styles.chevronUp : ''}`}
            >
              <path d="M1 1L5 5L9 1" stroke="#213F7D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {userMenuOpen && (
            <ul className={styles.userDropdown} role="menu">
              <li role="none" className={styles.userDropdownHeader}>
                <div className={styles.dropdownAvatar}>A</div>
                <div>
                  <p className={styles.dropdownName}>Adedeji</p>
                  <p className={styles.dropdownEmail}>adedeji@lendsqr.com</p>
                </div>
              </li>
              <li role="none" className={styles.dropdownDivider} />
              <li role="none">
                <button
                  role="menuitem"
                  className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                  Sign out
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
