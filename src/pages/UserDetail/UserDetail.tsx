import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppLayout } from '@/components/Layout/AppLayout';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useUsers } from '@/hooks/useUsers';
import { formatCurrency, getInitials } from '@/utils/formatters';
import type { User, UserStatus } from '@/types';
import styles from './UserDetail.module.scss';

type Tab = 'general' | 'documents' | 'bank' | 'loans' | 'savings' | 'app';

const TABS: { key: Tab; label: string }[] = [
  { key: 'general', label: 'General Details' },
  { key: 'documents', label: 'Documents' },
  { key: 'bank', label: 'Bank Details' },
  { key: 'loans', label: 'Loans' },
  { key: 'savings', label: 'Savings' },
  { key: 'app', label: 'App and System' },
];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.33333L10.06 5.50667L14.6667 6.18L11.3333 9.42667L12.12 14.0133L8 11.8467L3.88 14.0133L4.66667 9.42667L1.33333 6.18L5.94 5.50667L8 1.33333Z"
        fill={filled ? '#E9B200' : 'none'}
        stroke={filled ? '#E9B200' : '#C4C4C4'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface InfoFieldProps {
  label: string;
  value: string;
}

function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className={styles.infoField}>
      <p className={styles.fieldLabel}>{label}</p>
      <p className={styles.fieldValue}>{value || '—'}</p>
    </div>
  );
}

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
  showDivider?: boolean;
}

function InfoSection({ title, children, showDivider = true }: InfoSectionProps) {
  return (
    <div className={styles.infoSection}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <div className={styles.fieldsGrid}>{children}</div>
      {showDivider && <hr className={styles.divider} />}
    </div>
  );
}

export function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, setUsers } = useUsers();

  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [user, setUser] = useState<User | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    // 1. Check localStorage cache first
    const cached = localStorage.getItem(`user_${id}`);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as User;
        setUser(parsed);
        return;
      } catch {
        // fall through to context lookup
      }
    }

    // 2. Find in context
    if (users.length > 0) {
      const found = users.find((u) => u.id === id);
      if (found) {
        localStorage.setItem(`user_${id}`, JSON.stringify(found));
        setUser(found);
      } else {
        setNotFound(true);
      }
    }
  }, [id, users]);

  // Keep local user in sync with context (e.g. status updates)
  useEffect(() => {
    if (!id || !user) return;
    const contextUser = users.find((u) => u.id === id);
    if (contextUser && contextUser.status !== user.status) {
      setUser(contextUser);
      localStorage.setItem(`user_${id}`, JSON.stringify(contextUser));
    }
  }, [users, id, user]);

  function updateStatus(status: UserStatus) {
    if (!user) return;
    const updated: User = { ...user, status };
    setUser(updated);
    localStorage.setItem(`user_${user.id}`, JSON.stringify(updated));
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? updated : u))
    );
  }

  if (notFound) {
    return (
      <AppLayout>
        <div className={styles.notFound}>
          <p>User not found.</p>
          <Link to="/users" className={styles.backLink}>← Back to Users</Link>
        </div>
      </AppLayout>
    );
  }

  if (!user) {
    return (
      <AppLayout>
        <div className={styles.loading} aria-live="polite">Loading user details…</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
        {/* Back link + title */}
        <button
          className={styles.backBtn}
          onClick={() => navigate('/users')}
          aria-label="Back to users list"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M9 5H1M1 5L5 9M1 5L5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Users
        </button>

        <div className={styles.titleRow}>
          <h1 className={styles.pageTitle}>User Details</h1>
          <div className={styles.actionBtns}>
            <button
              className={styles.blacklistBtn}
              onClick={() => updateStatus('Blacklisted')}
              disabled={user.status === 'Blacklisted'}
            >
              BLACKLIST USER
            </button>
            <button
              className={styles.activateBtn}
              onClick={() => updateStatus('Active')}
              disabled={user.status === 'Active'}
            >
              ACTIVATE USER
            </button>
          </div>
        </div>

        {/* Profile card */}
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarCircle} aria-hidden="true">
              {getInitials(user.username)}
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>{user.username}</h2>
              <p className={styles.profileId}>{user.id}</p>
            </div>

            <div className={styles.profileDivider} aria-hidden="true" />

            <div className={styles.tierInfo}>
              <p className={styles.tierLabel}>User's Tier</p>
              <div className={styles.stars} aria-label={`Tier ${user.tier} out of 3`}>
                {[1, 2, 3].map((n) => (
                  <StarIcon key={n} filled={n <= user.tier} />
                ))}
              </div>
            </div>

            <div className={styles.profileDivider} aria-hidden="true" />

            <div className={styles.balanceInfo}>
              <p className={styles.balance}>{formatCurrency(user.accountBalance)}</p>
              <p className={styles.bankInfo}>
                {user.accountNumber} / {user.bankName}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <nav className={styles.tabs} aria-label="User detail sections">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`${styles.tab} ${activeTab === tab.key ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab.key)}
                aria-selected={activeTab === tab.key}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className={styles.contentCard} role="tabpanel">
          {activeTab === 'general' ? (
            <>
              <InfoSection title="Personal Information">
                <InfoField label="Full Name" value={user.username} />
                <InfoField label="Phone Number" value={user.phone} />
                <InfoField label="Email Address" value={user.email} />
                <InfoField label="BVN" value={user.bvn} />
                <InfoField label="Gender" value={user.gender} />
                <InfoField label="Marital Status" value={user.maritalStatus} />
                <InfoField label="Children" value={user.children} />
                <InfoField label="Type of Residence" value={user.typeOfResidence} />
              </InfoSection>

              <InfoSection title="Education and Employment">
                <InfoField label="Level of Education" value={user.levelOfEducation} />
                <InfoField label="Employment Status" value={user.employmentStatus} />
                <InfoField label="Sector of Employment" value={user.sectorOfEmployment} />
                <InfoField label="Duration of Employment" value={user.durationOfEmployment} />
                <InfoField label="Office Email" value={user.officeEmail} />
                <InfoField label="Monthly Income" value={user.monthlyIncome} />
                <InfoField label="Loan Repayment" value={user.loanRepayment} />
              </InfoSection>

              <InfoSection title="Socials">
                <InfoField label="Twitter" value={user.twitter} />
                <InfoField label="Facebook" value={user.facebook} />
                <InfoField label="Instagram" value={user.instagram} />
              </InfoSection>

              <InfoSection title="Guarantor" showDivider>
                <InfoField label="Full Name" value={user.guarantor1.name} />
                <InfoField label="Phone Number" value={user.guarantor1.phone} />
                <InfoField label="Email Address" value={user.guarantor1.email} />
                <InfoField label="Relationship" value={user.guarantor1.relationship} />
              </InfoSection>

              <InfoSection title="Guarantor" showDivider={false}>
                <InfoField label="Full Name" value={user.guarantor2.name} />
                <InfoField label="Phone Number" value={user.guarantor2.phone} />
                <InfoField label="Email Address" value={user.guarantor2.email} />
                <InfoField label="Relationship" value={user.guarantor2.relationship} />
              </InfoSection>
            </>
          ) : (
            <div className={styles.comingSoon}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <circle cx="24" cy="24" r="22" stroke="#E5E9F2" strokeWidth="2"/>
                <path d="M24 14V26" stroke="#545F7D" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="24" cy="32" r="1.5" fill="#545F7D"/>
              </svg>
              <p>Coming Soon</p>
              <span>This section is under development.</span>
            </div>
          )}
        </div>

        {/* Status badge display */}
        <div className={styles.statusRow}>
          <span className={styles.statusLabel}>Current Status:</span>
          <StatusBadge status={user.status} />
        </div>
    </AppLayout>
  );
}
