import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import styles from './Sidebar.module.scss';
import {
  BriefcaseIcon,
  HomeIcon,
  UserIcon,
  UsersIcon,
  MoneyBagIcon,
  HandshakeIcon,
  PiggyBankIcon,
  CoinHandIcon,
  UserCheckIcon,
  UserSlashIcon,
  BankIcon,
  CoinsIcon,
  PhoneIcon,
  GalaxyIcon,
  UserGearIcon,
  ScrollIcon,
  ChartIcon,
  SlidersIcon,
  PercentIcon,
  ClipboardIcon,
  LogoutIcon,
} from './SidebarIcons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  icon: ReactNode;
  to: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'CUSTOMERS',
    items: [
      { label: 'Users', icon: <UserIcon />, to: '/users' },
      { label: 'Guarantors', icon: <UsersIcon />, to: '/guarantors' },
      { label: 'Loans', icon: <MoneyBagIcon />, to: '/loans' },
      { label: 'Decision Models', icon: <HandshakeIcon />, to: '/decision-models' },
      { label: 'Savings', icon: <PiggyBankIcon />, to: '/savings' },
      { label: 'Loan Requests', icon: <CoinHandIcon />, to: '/loan-requests' },
      { label: 'Whitelist', icon: <UserCheckIcon />, to: '/whitelist' },
      { label: 'Karma', icon: <UserSlashIcon />, to: '/karma' },
    ],
  },
  {
    title: 'BUSINESSES',
    items: [
      { label: 'Organization', icon: <BriefcaseIcon />, to: '/organization' },
      { label: 'Loan Products', icon: <CoinHandIcon />, to: '/loan-products' },
      { label: 'Savings Products', icon: <BankIcon />, to: '/savings-products' },
      { label: 'Fees and Charges', icon: <CoinsIcon />, to: '/fees' },
      { label: 'Transactions', icon: <PhoneIcon />, to: '/transactions' },
      { label: 'Services', icon: <GalaxyIcon />, to: '/services' },
      { label: 'Service Account', icon: <UserGearIcon />, to: '/service-account' },
      { label: 'Settlements', icon: <ScrollIcon />, to: '/settlements' },
      { label: 'Reports', icon: <ChartIcon />, to: '/reports' },
    ],
  },
  {
    title: 'SETTINGS',
    items: [
      { label: 'Preferences', icon: <SlidersIcon />, to: '/preferences' },
      { label: 'Fees and Pricing', icon: <PercentIcon />, to: '/fees-pricing' },
      { label: 'Audit Logs', icon: <ClipboardIcon />, to: '/audit-logs' },
    ],
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuth();

  function handleLogout() {
    onClose();
    logout();
  }

  return (
    <>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} aria-label="Main navigation">
        <div className={styles.orgSwitch}>
          <BriefcaseIcon />
          <span>Switch Organization</span>
          <svg className={styles.chevron} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
            onClick={onClose}
          >
            <span className={styles.navIcon}><HomeIcon /></span>
            <span>Dashboard</span>
          </NavLink>

          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className={styles.section}>
              <p className={styles.sectionTitle}>{section.title}</p>
              {section.items.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                  onClick={onClose}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className={styles.footer}>
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            <LogoutIcon />
            <span>Logout</span>
          </button>
          <p className={styles.version}>v1.2.0</p>
        </div>
      </aside>
    </>
  );
}
