import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import api from "../../services/axiosInstance";

/* ─── Inline styles (no Tailwind dependency for the new design layer) ─── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  .reg-root {
    height: 100vh;
    min-height: calc(100vh - 128px);
    display: flex;
    align-items: stretch;
    background: #08090c;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
    position: relative;
  }

  /* ── Left decorative panel ── */
  .reg-panel {
    flex: 0 0 46%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 12rem;
    padding-left: 3.5rem;
  }
  .reg-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 30% 20%, rgba(139,92,246,.35) 0%, transparent 65%),
      radial-gradient(ellipse 60% 80% at 80% 80%, rgba(16,185,129,.20) 0%, transparent 60%),
      linear-gradient(160deg, #0d0f18 0%, #111320 100%);
    z-index: 0;
  }
  .reg-panel-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(139,92,246,.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139,92,246,.07) 1px, transparent 1px);
    background-size: 48px 48px;
    z-index: 1;
  }
  .reg-panel-orb {
    position: absolute;
    width: 340px; height: 340px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139,92,246,.22) 0%, transparent 70%);
    top: -80px; right: -60px;
    z-index: 1;
    animation: orbFloat 8s ease-in-out infinite;
  }
  .reg-panel-orb2 {
    position: absolute;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(16,185,129,.18) 0%, transparent 70%);
    bottom: 120px; left: 40px;
    z-index: 1;
    animation: orbFloat 11s ease-in-out infinite reverse;
  }
  @keyframes orbFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-24px) scale(1.04); }
  }
  .reg-panel-content {
    position: relative;
    z-index: 2;
  }
  .reg-panel-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: rgba(139,92,246,.9);
    margin-bottom: 1.25rem;
  }
  .reg-panel-eyebrow span {
    display: block;
    width: 28px; height: 1px;
    background: rgba(139,92,246,.6);
  }
  .reg-panel-headline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 3.5vw, 2.9rem);
    line-height: 1.15;
    color: #f0eeff;
    margin-bottom: 1.25rem;
  }
  .reg-panel-headline em {
    font-style: italic;
    color: #a78bfa;
  }
  .reg-panel-sub {
    font-size: 14px;
    line-height: 1.75;
    color: rgba(240,238,255,.45);
    max-width: 310px;
    margin-bottom: 2.5rem;
  }
  .reg-panel-stats {
    display: flex;
    gap: 2rem;
  }
  .reg-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: #f0eeff;
    line-height: 1;
  }
  .reg-stat-lbl {
    font-size: 11px;
    color: rgba(240,238,255,.38);
    letter-spacing: .06em;
    margin-top: 1px;
  }

  /* ── Divider line ── */
  .reg-divider {
    flex: 0 0 1px;
    background: linear-gradient(to bottom, transparent, rgba(139,92,246,.25) 25%, rgba(139,92,246,.25) 75%, transparent);
  }

  /* ── Right form panel ── */
  .reg-form-side {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
    position: relative;
    background: #08090c;
  }
  .reg-form-side::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 50% at 70% 40%, rgba(139,92,246,.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .reg-card {
    width: 100%;
    max-width: 420px;
    position: relative;
    z-index: 1;
    animation: slideUp .55s cubic-bezier(.22,1,.36,1) both;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* card header */
  .reg-card-header { margin-bottom: 1rem; }
  .reg-card-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(139,92,246,.12);
    border: 1px solid rgba(139,92,246,.25);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 11px;
    font-weight: 500;
    color: #a78bfa;
    letter-spacing: .06em;
    margin-bottom: 1.25rem;
  }
  .reg-card-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #a78bfa;
    animation: pulse 2s ease infinite;
  }
  @keyframes pulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: .5; transform: scale(.8); }
  }
  .reg-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    color: #f0eeff;
    line-height: 1.15;
    margin-bottom: .5rem;
  }
  .reg-card-sub {
    font-size: 13.5px;
    color: rgba(240,238,255,.38);
  }

  /* fields */
  .reg-field { margin-bottom: 1.1rem; position: relative; }
  .reg-label {
    display: block;
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: .06em;
    color: rgba(240,238,255,.5);
    margin-bottom: .45rem;
    text-transform: uppercase;
  }
  .reg-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .reg-input-icon {
    position: absolute;
    left: 14px;
    width: 16px; height: 16px;
    color: rgba(167,139,250,.55);
    pointer-events: none;
    transition: color .2s;
  }
  .reg-input {
    width: 100%;
    padding: 13px 14px 13px 42px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.09);
    border-radius: 10px;
    color: #f0eeff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color .2s, background .2s, box-shadow .2s;
    box-sizing: border-box;
  }
  .reg-input::placeholder { color: rgba(240,238,255,.2); }
  .reg-input:focus {
    border-color: rgba(139,92,246,.6);
    background: rgba(139,92,246,.06);
    box-shadow: 0 0 0 3px rgba(139,92,246,.12);
  }
  .reg-input:focus ~ .reg-input-line { transform: scaleX(1); }

  /* password toggle */
  .reg-eye-btn {
    position: absolute;
    right: 14px;
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(167,139,250,.45);
    padding: 0;
    display: flex;
    align-items: center;
    transition: color .2s;
  }
  .reg-eye-btn:hover { color: #a78bfa; }

  /* password strength */
  .reg-strength {
    display: flex;
    gap: 4px;
    margin-top: 5px;
  }
  .reg-strength-bar {
    flex: 1; height: 3px;
    border-radius: 10px;
    background: rgba(255,255,255,.07);
    transition: background .3s;
  }
  .reg-strength-bar.active-1 { background: #ef4444; }
  .reg-strength-bar.active-2 { background: #f97316; }
  .reg-strength-bar.active-3 { background: #eab308; }
  .reg-strength-bar.active-4 { background: #10b981; }
  .reg-strength-label {
    font-size: 10.5px;
    color: rgba(240,238,255,.28);
    margin-top: 4px;
    text-align: right;
    min-height: 14px;
    transition: color .3s;
  }

  /* submit button */
  .reg-btn {
    width: 100%;
    padding: 14px;
    margin-top: .5rem;
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform .15s, box-shadow .2s, filter .2s;
    box-shadow: 0 4px 24px rgba(124,58,237,.35);
    letter-spacing: .02em;
  }
  .reg-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,.15), transparent);
    border-radius: inherit;
    opacity: 0;
    transition: opacity .2s;
  }
  .reg-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(124,58,237,.5); filter: brightness(1.08); }
  .reg-btn:hover:not(:disabled)::before { opacity: 1; }
  .reg-btn:active:not(:disabled) { transform: translateY(0); }
  .reg-btn:disabled { opacity: .6; cursor: not-allowed; }
  .reg-btn-shimmer {
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.15), transparent);
    animation: shimmer 2.2s 1s infinite;
  }
  @keyframes shimmer {
    to { left: 160%; }
  }
  .reg-btn-spinner {
    display: inline-block;
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin .7s linear infinite;
    vertical-align: middle;
    margin-right: 8px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* divider */
  .reg-or {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 1.25rem 0;
    color: rgba(240,238,255,.18);
    font-size: 12px;
  }
  .reg-or::before, .reg-or::after {
    content: '';
    flex: 1; height: 1px;
    background: rgba(255,255,255,.07);
  }

  /* social buttons */
  .reg-socials { display: flex; gap: 10px; margin-bottom: 1.5rem; }
  .reg-social-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 10px;
    color: rgba(240,238,255,.55);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    transition: background .2s, border-color .2s, color .2s;
  }
  .reg-social-btn:hover {
    background: rgba(255,255,255,.08);
    border-color: rgba(255,255,255,.16);
    color: rgba(240,238,255,.9);
  }

  .reg-login-link {
    text-align: center;
    font-size: 13px;
    color: rgba(240,238,255,.35);
  }
  .reg-login-link a {
    color: #a78bfa;
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid transparent;
    transition: border-color .15s;
  }
  .reg-login-link a:hover { border-color: #a78bfa; }

  /* terms */
  .reg-terms {
    font-size: 11px;
    color: rgba(240,238,255,.22);
    text-align: center;
    margin-top: 1.25rem;
    line-height: 1.6;
  }
  .reg-terms a { color: rgba(167,139,250,.6); text-decoration: none; }
  .reg-terms a:hover { color: #a78bfa; }

  /* responsive collapse panel on small screens */
  @media (max-width: 820px) {
    .reg-panel, .reg-divider { display: none; }
    .reg-form-side { padding: 2rem 1.25rem; }
  }
`;

/* ─── SVG icons (no icon library dependency) ─── */
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconEyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
  </svg>
);
const IconGoogle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);
const IconGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

/* ─── Password strength helper ─── */
const getStrength = (pw) => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[@$!%*?&]/.test(pw)) score++;
  return score;
};
const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColors = ["", "#ef4444", "#f97316", "#eab308", "#10b981"];

/* ══════════════════════════════════════════════ */
const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const strength = getStrength(formData.password);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validateForm = () => {
    const { name, email, password } = formData;
    if (!name.trim()) { toast.error("Name is required"); return false; }
    if (name.trim().length < 3) { toast.error("Name must be at least 3 characters"); return false; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) { toast.error("Email is required"); return false; }
    if (!emailRegex.test(email)) { toast.error("Please enter a valid email"); return false; }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.trim()) { toast.error("Password is required"); return false; }
    if (!passwordRegex.test(password)) {
      toast.error("Password must be 8+ chars with uppercase, lowercase, number & special character");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      const { data } = await api.post("/user/register", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
      if (data.success) { toast.success(data.message); navigate("/login"); }
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <section className="reg-root">
        {/* ── Left panel ── */}
        <div className="reg-panel">
          <div className="reg-panel-grid" />
          <div className="reg-panel-orb" />
          <div className="reg-panel-orb2" />
          <div className="reg-panel-content">
            <div className="reg-panel-eyebrow">
              <span /> Hirelytics - AI Powered Resume Analyzer
            </div>
            <h2 className="reg-panel-headline">
              Your career,<br /><em>elevated</em> by AI.
            </h2>
            <p className="reg-panel-sub">
              Get personalized resume feedback, keyword optimization, and ATS insights — all in seconds.
            </p>
            <div className="reg-panel-stats">
              <div>
                <div className="reg-stat-num">94%</div>
                <div className="reg-stat-lbl">Interview rate lift</div>
              </div>
              <div>
                <div className="reg-stat-num">50K+</div>
                <div className="reg-stat-lbl">Resumes optimized</div>
              </div>
              <div>
                <div className="reg-stat-num">3 min</div>
                <div className="reg-stat-lbl">Avg. review time</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="reg-divider" />

        {/* ── Right form ── */}
        <div className="reg-form-side">
          <div className="reg-card">
            <div className="reg-card-header">
              <h1 className="reg-card-title">Create your account</h1>
              <p className="reg-card-sub">Join thousands landing their dream roles.</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="reg-field">
                <label className="reg-label">Full name</label>
                <div className="reg-input-wrap">
                  <span className="reg-input-icon"><IconUser /></span>
                  <input
                    className="reg-input"
                    name="name"
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="reg-field">
                <label className="reg-label">Email address</label>
                <div className="reg-input-wrap">
                  <span className="reg-input-icon"><IconMail /></span>
                  <input
                    className="reg-input"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="reg-field">
                <label className="reg-label">Password</label>
                <div className="reg-input-wrap">
                  <span className="reg-input-icon"><IconLock /></span>
                  <input
                    className="reg-input"
                    name="password"
                    type={showPw ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="reg-eye-btn"
                    onClick={() => setShowPw((v) => !v)}
                    tabIndex={-1}
                  >
                    {showPw ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                {/* Strength meter */}
                {formData.password && (
                  <>
                    <div className="reg-strength">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`reg-strength-bar${strength >= i ? ` active-${strength}` : ""}`}
                        />
                      ))}
                    </div>
                    <div
                      className="reg-strength-label"
                      style={{ color: strengthColors[strength] }}
                    >
                      {strengthLabels[strength]}
                    </div>
                  </>
                )}
              </div>

              <button className="reg-btn" type="submit" disabled={loading}>
                <span className="reg-btn-shimmer" />
                {loading ? (
                  <><span className="reg-btn-spinner" /> Creating account…</>
                ) : (
                  "Create Account →"
                )}
              </button>
            </form>

            <p className="reg-login-link" style={{ marginTop: "2rem" }}>
              Already have an account?{" "}
              <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;