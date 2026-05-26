import { useContext } from 'react';
import { UsersContext } from '@/context/UsersContext';
import type { UsersContextType } from '@/types';

/**
 * Convenience hook for consuming UsersContext.
 * Throws a descriptive error if used outside the provider.
 */
export function useUsers(): UsersContextType {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
}
