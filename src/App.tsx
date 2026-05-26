import { type ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Login } from '@/pages/Login/Login';
import { Users } from '@/pages/Users/Users';
import { UserDetail } from '@/pages/UserDetail/UserDetail';
import { Dashboard } from '@/pages/Dashboard/Dashboard';
import { PlaceholderPage } from '@/pages/Placeholder/PlaceholderPage';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function LoginRoute() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/users" replace />;
  return <Login />;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginRoute />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path="/users/:id" element={<ProtectedRoute><UserDetail /></ProtectedRoute>} />

      {/* Sidebar nav stubs — all protected */}
      {[
        '/guarantors', '/loans', '/decision-models', '/savings',
        '/loan-requests', '/whitelist', '/karma', '/organization',
        '/loan-products', '/savings-products', '/fees', '/transactions',
        '/services', '/service-account', '/settlements', '/reports',
        '/preferences', '/fees-pricing', '/audit-logs',
      ].map((path) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute>
              <PlaceholderPage />
            </ProtectedRoute>
          }
        />
      ))}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
