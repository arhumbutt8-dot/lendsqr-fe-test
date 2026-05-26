import { useRef, useEffect, useState } from 'react';
import type { FilterState } from '@/types';
import styles from './FilterPanel.module.scss';

interface FilterPanelProps {
  filters: FilterState;
  onApply: (filters: FilterState) => void;
  onClose: () => void;
}

const ORGANIZATIONS = ['Lendsqr', 'Irorun', 'Lendstar'];
const STATUS_OPTIONS = ['Active', 'Inactive', 'Pending', 'Blacklisted'];

export function FilterPanel({ filters, onApply, onClose }: FilterPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [local, setLocal] = useState<FilterState>({ ...filters });

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  function handleChange(field: keyof FilterState, value: string) {
    setLocal((prev) => ({ ...prev, [field]: value }));
  }

  function handleReset() {
    const empty: FilterState = {
      organization: '',
      username: '',
      email: '',
      date: '',
      phone: '',
      status: '',
    };
    setLocal(empty);
    onApply(empty);
    onClose();
  }

  function handleApply() {
    onApply(local);
    onClose();
  }

  return (
    <div className={styles.panel} ref={panelRef} role="dialog" aria-label="Filter users">
      <div className={styles.field}>
        <label className={styles.label} htmlFor="filter-org">
          Organization
        </label>
        <select
          id="filter-org"
          className={styles.select}
          value={local.organization}
          onChange={(e) => handleChange('organization', e.target.value)}
        >
          <option value="">Select</option>
          {ORGANIZATIONS.map((org) => (
            <option key={org} value={org}>
              {org}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="filter-username">
          Username
        </label>
        <input
          id="filter-username"
          type="text"
          className={styles.input}
          placeholder="User"
          value={local.username}
          onChange={(e) => handleChange('username', e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="filter-email">
          Email
        </label>
        <input
          id="filter-email"
          type="email"
          className={styles.input}
          placeholder="Email"
          value={local.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="filter-date">
          Date
        </label>
        <input
          id="filter-date"
          type="date"
          className={styles.input}
          value={local.date}
          onChange={(e) => handleChange('date', e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="filter-phone">
          Phone Number
        </label>
        <input
          id="filter-phone"
          type="tel"
          className={styles.input}
          placeholder="Phone Number"
          value={local.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="filter-status">
          Status
        </label>
        <select
          id="filter-status"
          className={styles.select}
          value={local.status}
          onChange={(e) => handleChange('status', e.target.value)}
        >
          <option value="">Select</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.actions}>
        <button className={styles.resetBtn} onClick={handleReset} type="button">
          Reset
        </button>
        <button className={styles.applyBtn} onClick={handleApply} type="button">
          Filter
        </button>
      </div>
    </div>
  );
}
