import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/Layout/AppLayout';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Pagination } from '@/components/shared/Pagination';
import { FilterPanel } from '@/components/shared/FilterPanel';
import { useUsers } from '@/hooks/useUsers';
import { formatDate } from '@/utils/formatters';
import type { FilterState, User, UserStatus } from '@/types';
import styles from './Users.module.scss';

// ── Stat card icons ───────────────────────────────────────────────────────────
function UsersStatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M15.5 19.5V17.5C15.5 16.4391 15.0786 15.4217 14.3284 14.6716C13.5783 13.9214 12.5609 13.5 11.5 13.5H4.5C3.43913 13.5 2.42172 13.9214 1.67157 14.6716C0.921427 15.4217 0.5 16.4391 0.5 17.5V19.5" stroke="#DF18FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 10.5C10.2091 10.5 12 8.70914 12 6.5C12 4.29086 10.2091 2.5 8 2.5C5.79086 2.5 4 4.29086 4 6.5C4 8.70914 5.79086 10.5 8 10.5Z" stroke="#DF18FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21.5 19.5V17.5C21.4993 16.6137 21.2044 15.7528 20.6614 15.0523C20.1184 14.3519 19.3581 13.8516 18.5 13.6333" stroke="#DF18FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 2.6333C15.8604 2.85013 16.623 3.35044 17.1676 4.05201C17.7122 4.75358 18.0078 5.61644 18.0078 6.5C18.0078 7.38356 17.7122 8.24642 17.1676 8.94799C16.623 9.64956 15.8604 10.1499 15 10.3667" stroke="#DF18FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ActiveUsersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#5718FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#5718FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.1333" stroke="#5718FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 3.1333C16.8604 3.35013 17.623 3.85044 18.1676 4.55201C18.7122 5.25358 19.0078 6.11644 19.0078 7C19.0078 7.88356 18.7122 8.74642 18.1676 9.44799C17.623 10.1496 16.8604 10.6499 16 10.8667" stroke="#5718FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LoansIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M2 11H20" stroke="#FF3670" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 6H20" stroke="#FF3670" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 16H20" stroke="#FF3670" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SavingsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M19 3H3C1.89543 3 1 3.89543 1 5V17C1 18.1046 1.89543 19 3 19H19C20.1046 19 21 18.1046 21 17V5C21 3.89543 20.1046 3 19 3Z" stroke="#FF6700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 9H21" stroke="#FF6700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Skeleton row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className={styles.skeletonRow} aria-hidden="true">
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i}>
          <span className={`${styles.skeletonCell} skeleton`} />
        </td>
      ))}
    </tr>
  );
}

// ── Three-dot action menu ─────────────────────────────────────────────────────
interface ActionMenuProps {
  userId: string;
  onViewDetails: () => void;
  onBlacklist: () => void;
  onActivate: () => void;
}

function ActionMenu({ userId: _userId, onViewDetails, onBlacklist, onActivate }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  return (
    <div className={styles.actionMenu} ref={menuRef}>
      <button
        className={styles.dotsBtn}
        onClick={() => setOpen((v) => !v)}
        aria-label="Row actions"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        ⋮
      </button>
      {open && (
        <ul className={styles.dropdown} role="menu">
          <li role="none">
            <button
              role="menuitem"
              className={styles.dropdownItem}
              onClick={() => { setOpen(false); onViewDetails(); }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2.91667C4.08333 2.91667 1.75 5.25 1.75 7C1.75 8.75 4.08333 11.0833 7 11.0833C9.91667 11.0833 12.25 8.75 12.25 7C12.25 5.25 9.91667 2.91667 7 2.91667Z" stroke="#545F7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="7" cy="7" r="1.75" stroke="#545F7D" strokeWidth="1.2"/>
              </svg>
              View Details
            </button>
          </li>
          <li role="none">
            <button
              role="menuitem"
              className={styles.dropdownItem}
              onClick={() => { setOpen(false); onBlacklist(); }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.25" stroke="#545F7D" strokeWidth="1.2"/>
                <path d="M3.5 3.5L10.5 10.5" stroke="#545F7D" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Blacklist User
            </button>
          </li>
          <li role="none">
            <button
              role="menuitem"
              className={styles.dropdownItem}
              onClick={() => { setOpen(false); onActivate(); }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.33333 7L5.83333 10.5L11.6667 3.5" stroke="#545F7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Activate User
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

// ── Column headers with filter ────────────────────────────────────────────────
const COLUMNS: { key: keyof FilterState | null; label: string }[] = [
  { key: 'organization', label: 'ORGANIZATION' },
  { key: 'username', label: 'USERNAME' },
  { key: 'email', label: 'EMAIL' },
  { key: 'phone', label: 'PHONE NUMBER' },
  { key: 'date', label: 'DATE JOINED' },
  { key: 'status', label: 'STATUS' },
  { key: null, label: '' },
];

const EMPTY_FILTERS: FilterState = {
  organization: '',
  username: '',
  email: '',
  date: '',
  phone: '',
  status: '',
};

// ── Main component ────────────────────────────────────────────────────────────
export function Users() {
  const navigate = useNavigate();
  const { users, setUsers, loading, error, refetch } = useUsers();

  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [openFilterCol, setOpenFilterCol] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  // Derived stats
  const activeCount = useMemo(
    () => users.filter((u) => u.status === 'Active').length,
    [users]
  );

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (filters.organization && u.organization !== filters.organization) return false;
      if (filters.username && !u.username.toLowerCase().includes(filters.username.toLowerCase())) return false;
      if (filters.email && !u.email.toLowerCase().includes(filters.email.toLowerCase())) return false;
      if (filters.phone && !u.phone.includes(filters.phone)) return false;
      if (filters.status && u.status !== filters.status) return false;
      if (filters.date) {
        const filterDate = new Date(filters.date).toDateString();
        const userDate = new Date(u.dateJoined).toDateString();
        if (filterDate !== userDate) return false;
      }
      return true;
    });
  }, [users, filters]);

  // Paginated slice
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page, pageSize]);

  function handleFilterApply(newFilters: FilterState) {
    setFilters(newFilters);
    setPage(1);
  }

  function handleFilterToggle(colKey: string) {
    setOpenFilterCol((prev) => (prev === colKey ? null : colKey));
  }

  const updateUserStatus = useCallback(
    (userId: string, status: UserStatus) => {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id !== userId) return u;
          const updated: User = { ...u, status };
          // Update localStorage cache for this user
          const cached = localStorage.getItem(`user_${userId}`);
          if (cached) {
            try {
              const parsed = JSON.parse(cached) as User;
              localStorage.setItem(`user_${userId}`, JSON.stringify({ ...parsed, status }));
            } catch {
              // ignore parse errors
            }
          }
          return updated;
        })
      );
    },
    [setUsers]
  );

  const statCards = [
    {
      icon: <UsersStatIcon />,
      iconBg: 'rgba(223,24,255,0.1)',
      label: 'USERS',
      value: users.length.toLocaleString(),
    },
    {
      icon: <ActiveUsersIcon />,
      iconBg: 'rgba(87,24,255,0.1)',
      label: 'ACTIVE USERS',
      value: activeCount.toLocaleString(),
    },
    {
      icon: <LoansIcon />,
      iconBg: 'rgba(255,54,112,0.1)',
      label: 'USERS WITH LOANS',
      value: '12,453',
    },
    {
      icon: <SavingsIcon />,
      iconBg: 'rgba(255,103,0,0.1)',
      label: 'USERS WITH SAVINGS',
      value: '102,453',
    },
  ];

  return (
    <AppLayout>
        <h1 className={styles.pageTitle}>Users</h1>

        {/* Stat cards */}
        <div className={styles.statsGrid} role="list" aria-label="User statistics">
          {statCards.map((card) => (
            <div key={card.label} className={styles.statCard} role="listitem">
              <div
                className={styles.statIcon}
                style={{ background: card.iconBg }}
                aria-hidden="true"
              >
                {card.icon}
              </div>
              <p className={styles.statLabel}>{card.label}</p>
              <p className={styles.statValue}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className={styles.tableCard}>
          {error ? (
            <div className={styles.errorState} role="alert">
              <p>{error}</p>
              <button className={styles.retryBtn} onClick={refetch}>
                Retry
              </button>
            </div>
          ) : (
            <>
              <div className={styles.tableWrapper}>
                <table className={styles.table} aria-label="Users table">
                  <thead>
                    <tr>
                      {COLUMNS.map((col) => (
                        <th key={col.label} className={styles.th}>
                          {col.key ? (
                            <div className={styles.thInner}>
                              <span>{col.label}</span>
                              <div className={styles.filterWrapper}>
                                <button
                                  className={styles.filterBtn}
                                  onClick={() => col.key && handleFilterToggle(col.key)}
                                  aria-label={`Filter by ${col.label}`}
                                  aria-expanded={openFilterCol === col.key}
                                >
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M1 2.5H11M3 6H9M5 9.5H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                                  </svg>
                                </button>
                                {openFilterCol === col.key && (
                                  <FilterPanel
                                    filters={filters}
                                    onApply={handleFilterApply}
                                    onClose={() => setOpenFilterCol(null)}
                                  />
                                )}
                              </div>
                            </div>
                          ) : null}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      Array.from({ length: pageSize }).map((_, i) => (
                        <SkeletonRow key={i} />
                      ))
                    ) : paginatedUsers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className={styles.emptyState}>
                          No results found. Try adjusting your filters.
                        </td>
                      </tr>
                    ) : (
                      paginatedUsers.map((user) => (
                        <tr
                          key={user.id}
                          className={styles.row}
                          onClick={() => navigate(`/users/${user.id}`)}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              navigate(`/users/${user.id}`);
                            }
                          }}
                          aria-label={`View details for ${user.username}`}
                        >
                          <td className={styles.td}>{user.organization}</td>
                          <td className={styles.td}>{user.username}</td>
                          <td className={styles.td}>{user.email}</td>
                          <td className={styles.td}>{user.phone}</td>
                          <td className={styles.td}>{formatDate(user.dateJoined)}</td>
                          <td className={styles.td}>
                            <StatusBadge status={user.status} />
                          </td>
                          <td
                            className={`${styles.td} ${styles.actionCell}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ActionMenu
                              userId={user.id}
                              onViewDetails={() => navigate(`/users/${user.id}`)}
                              onBlacklist={() => updateUserStatus(user.id, 'Blacklisted')}
                              onActivate={() => updateUserStatus(user.id, 'Active')}
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {!loading && filteredUsers.length > 0 && (
                <div className={styles.tableFooter}>
                  <Pagination
                    total={filteredUsers.length}
                    page={page}
                    pageSize={pageSize}
                    onPageChange={setPage}
                    onPageSizeChange={(size) => {
                      setPageSize(size);
                      setPage(1);
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
    </AppLayout>
  );
}
