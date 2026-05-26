import type { UserStatus } from '@/types';
import styles from './StatusBadge.module.scss';

interface StatusBadgeProps {
  status: UserStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const classMap: Record<UserStatus, string> = {
    Active: styles.active,
    Inactive: styles.inactive,
    Pending: styles.pending,
    Blacklisted: styles.blacklisted,
  };

  return (
    <span className={`${styles.badge} ${classMap[status]}`}>{status}</span>
  );
}
