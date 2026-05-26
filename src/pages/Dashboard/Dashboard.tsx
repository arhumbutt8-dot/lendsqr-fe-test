import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/Layout/AppLayout';
import { useUsers } from '@/hooks/useUsers';
import { formatCurrency } from '@/utils/formatters';
import styles from './Dashboard.module.scss';

export function Dashboard() {
  const { users, loading } = useUsers();

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === 'Active').length;
  const inactiveUsers = users.filter((u) => u.status === 'Inactive').length;
  const pendingUsers = users.filter((u) => u.status === 'Pending').length;
  const blacklistedUsers = users.filter((u) => u.status === 'Blacklisted').length;
  const totalBalance = users.reduce((sum, u) => sum + u.accountBalance, 0);

  const recentUsers = [...users]
    .sort((a, b) => new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime())
    .slice(0, 5);

  return (
    <AppLayout>
        <h1 className={styles.pageTitle}>Dashboard</h1>

        {loading ? (
          <div className={styles.loadingState}>Loading dashboard data…</div>
        ) : (
          <>
            {/* Summary cards */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIconWrap} style={{ background: 'rgba(223,24,255,0.1)' }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M15.5 19.5V17.5C15.5 16.4391 15.0786 15.4217 14.3284 14.6716C13.5783 13.9214 12.5609 13.5 11.5 13.5H4.5C3.43913 13.5 2.42172 13.9214 1.67157 14.6716C0.921427 15.4217 0.5 16.4391 0.5 17.5V19.5" stroke="#DF18FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 10.5C10.2091 10.5 12 8.70914 12 6.5C12 4.29086 10.2091 2.5 8 2.5C5.79086 2.5 4 4.29086 4 6.5C4 8.70914 5.79086 10.5 8 10.5Z" stroke="#DF18FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className={styles.statLabel}>TOTAL USERS</p>
                <p className={styles.statValue}>{totalUsers.toLocaleString()}</p>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIconWrap} style={{ background: 'rgba(57,205,98,0.1)' }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#39CD62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#39CD62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className={styles.statLabel}>ACTIVE USERS</p>
                <p className={styles.statValue}>{activeUsers.toLocaleString()}</p>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIconWrap} style={{ background: 'rgba(233,178,0,0.1)' }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="9" stroke="#E9B200" strokeWidth="1.5"/>
                    <path d="M11 7V11" stroke="#E9B200" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="11" cy="14.5" r="0.75" fill="#E9B200"/>
                  </svg>
                </div>
                <p className={styles.statLabel}>PENDING USERS</p>
                <p className={styles.statValue}>{pendingUsers.toLocaleString()}</p>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIconWrap} style={{ background: 'rgba(228,3,59,0.1)' }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="9" stroke="#E4033B" strokeWidth="1.5"/>
                    <path d="M5 5L17 17" stroke="#E4033B" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className={styles.statLabel}>BLACKLISTED</p>
                <p className={styles.statValue}>{blacklistedUsers.toLocaleString()}</p>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIconWrap} style={{ background: 'rgba(84,95,125,0.1)' }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#545F7D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#545F7D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className={styles.statLabel}>INACTIVE USERS</p>
                <p className={styles.statValue}>{inactiveUsers.toLocaleString()}</p>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIconWrap} style={{ background: 'rgba(57,205,204,0.1)' }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M19 3H3C1.89543 3 1 3.89543 1 5V17C1 18.1046 1.89543 19 3 19H19C20.1046 19 21 18.1046 21 17V5C21 3.89543 20.1046 3 19 3Z" stroke="#39CDCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 9H21" stroke="#39CDCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className={styles.statLabel}>TOTAL BALANCE</p>
                <p className={styles.statValue}>{formatCurrency(totalBalance)}</p>
              </div>
            </div>

            {/* Status breakdown */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>User Status Breakdown</h2>
              <div className={styles.breakdownGrid}>
                {[
                  { label: 'Active', count: activeUsers, color: '#39CD62', bg: 'rgba(57,205,98,0.08)' },
                  { label: 'Inactive', count: inactiveUsers, color: '#545F7D', bg: 'rgba(84,95,125,0.08)' },
                  { label: 'Pending', count: pendingUsers, color: '#E9B200', bg: 'rgba(233,178,0,0.08)' },
                  { label: 'Blacklisted', count: blacklistedUsers, color: '#E4033B', bg: 'rgba(228,3,59,0.08)' },
                ].map((item) => (
                  <div key={item.label} className={styles.breakdownCard} style={{ borderLeft: `4px solid ${item.color}` }}>
                    <p className={styles.breakdownLabel}>{item.label}</p>
                    <p className={styles.breakdownCount} style={{ color: item.color }}>
                      {item.count.toLocaleString()}
                    </p>
                    <div className={styles.breakdownBar}>
                      <div
                        className={styles.breakdownFill}
                        style={{
                          width: `${totalUsers > 0 ? (item.count / totalUsers) * 100 : 0}%`,
                          background: item.color,
                        }}
                      />
                    </div>
                    <p className={styles.breakdownPct}>
                      {totalUsers > 0 ? ((item.count / totalUsers) * 100).toFixed(1) : '0'}% of total
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent users */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Recently Joined Users</h2>
                <Link to="/users" className={styles.viewAll}>View all users →</Link>
              </div>
              <div className={styles.recentCard}>
                <table className={styles.recentTable}>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Organization</th>
                      <th>Date Joined</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <Link to={`/users/${user.id}`} className={styles.userLink}>
                            {user.username}
                          </Link>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.organization}</td>
                        <td>{user.dateJoined}</td>
                        <td>
                          <span className={`${styles.badge} ${styles[`badge${user.status}`]}`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
    </AppLayout>
  );
}
