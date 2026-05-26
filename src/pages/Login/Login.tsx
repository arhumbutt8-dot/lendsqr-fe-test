import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import logo from '@/assets/logo.svg';
import illustration from '@/assets/pablo-sign-in.png';
import styles from './Login.module.scss';

interface FormErrors {
  email: string;
  password: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function validate(): boolean {
    const newErrors: FormErrors = { email: '', password: '' };
    let valid = true;
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required.';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      login();
      navigate('/dashboard', { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>

      {/* ── Left column ── */}
      <div className={styles.leftCol}>
        <div className={styles.logoWrap}>
          <img src={logo} alt="Lendsqr" className={styles.logoImg} />
        </div>
        <div className={styles.illustrationWrap}>
          <img src={illustration} alt="" aria-hidden="true" className={styles.illustration} />
        </div>
      </div>

      {/* ── Right column ── */}
      <div className={styles.rightCol}>
        <div className={styles.formBox}>

          {/* Mobile logo */}
          <div className={styles.mobileLogo}>
            <img src={logo} alt="Lendsqr" className={styles.logoImg} />
          </div>

          <h1 className={styles.heading}>Welcome!</h1>
          <p className={styles.subheading}>Enter details to login.</p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className={styles.field}>
              <input
                id="email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((p) => ({ ...p, email: '' }));
                }}
                autoComplete="email"
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p id="email-error" className={styles.errorMsg} role="alert">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className={styles.field}>
              <div className={styles.passwordWrap}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((p) => ({ ...p, password: '' }));
                  }}
                  autoComplete="current-password"
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  className={styles.showBtn}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className={styles.errorMsg} role="alert">{errors.password}</p>
              )}
            </div>

            <a href="#" className={styles.forgotLink}>FORGOT PASSWORD?</a>

            <button
              type="submit"
              className={styles.loginBtn}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? <span className={styles.spinner} aria-hidden="true" /> : 'LOG IN'}
            </button>

          </form>
        </div>
      </div>

    </div>
  );
}
