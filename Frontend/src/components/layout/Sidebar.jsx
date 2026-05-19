import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Briefcase,
  FileSearch,
  LayoutDashboard,
  LogOut,
  Upload,
  Users,
  Zap,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

/* ─── Styles ─────────────────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

  :root {
    --sb-bg:            #05070f;
    --sb-surface:       #0c0f1e;
    --sb-surface-2:     #111526;
    --sb-border:        rgba(255,255,255,0.07);
    --sb-border-md:     rgba(255,255,255,0.1);
    --sb-accent:        #6366f1;
    --sb-accent-2:      #8b5cf6;
    --sb-accent-3:      #10b981;
    --sb-accent-light:  rgba(99,102,241,0.1);
    --sb-text:          #eef0ff;
    --sb-text-2:        #7b82a8;
    --sb-text-3:        #4a5080;
    --sb-danger:        #f87171;
    --sb-danger-bg:     rgba(239,68,68,0.08);
    --sb-danger-border: rgba(239,68,68,0.15);
  }

  .sb-root {
    top: 0;
    height: 100vh;
    font-family: 'Outfit', sans-serif;
    display: flex;
    flex-direction: column;
    width: 272px;
    flex-shrink: 0;
    background: var(--sb-bg);
    border-right: 1px solid var(--sb-border);
    position: sticky;
    max-height: 100vh;
    overflow: hidden;
  }

  /* indigo glow orb top-left */
  .sb-root::before {
    content: '';
    position: absolute;
    top: -60px; left: -60px;
    width: 280px; height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  /* emerald glow bottom */
  .sb-root::after {
    content: '';
    position: absolute;
    bottom: 0; right: -40px;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .sb-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  /* ── Logo ── */
  .sb-logo-wrap {
    padding: 1.35rem 1.25rem 1.2rem;
    border-bottom: 1px solid var(--sb-border);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    animation: sbFadeDown 0.55s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes sbFadeDown {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .sb-logo-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 16px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
    flex-shrink: 0;
  }

  .sb-logo-text {
    font-family: 'Outfit', sans-serif;
    font-size: 1.18rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .sb-logo-text span {
    -webkit-text-fill-color: #10b981;
  }

  .sb-logo-badge {
    margin-left: auto;
    font-size: 0.58rem;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--sb-accent);
    background: rgba(99,102,241,0.1);
    border: 1px solid rgba(99,102,241,0.22);
    padding: 0.18rem 0.5rem;
    border-radius: 100px;
  }

  /* ── Section label ── */
  .sb-section-label {
    font-family: 'Outfit', sans-serif;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--sb-text-3);
    padding: 0 1rem;
    margin: 1.1rem 0 0.4rem;
    opacity: 0;
    animation: sbFadeIn 0.5s 0.2s ease forwards;
  }
  @keyframes sbFadeIn { to { opacity: 1; } }

  /* ── Nav ── */
  .sb-nav {
    flex: 1;
    padding: 0.25rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    overflow-y: auto;
    scrollbar-width: none;
  }
  .sb-nav::-webkit-scrollbar { display: none; }

  /* ── Nav link ── */
  .sb-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.62rem 0.9rem;
    border-radius: 12px;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--sb-text-2);
    border: 1px solid transparent;
    position: relative;
    overflow: hidden;
    transition: color 0.2s, background 0.2s, border-color 0.2s, transform 0.18s, box-shadow 0.2s;
    opacity: 0;
    animation: sbLinkSlide 0.45s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  @keyframes sbLinkSlide {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* left accent bar */
  .sb-link::after {
    content: '';
    position: absolute;
    left: 0; top: 22%; bottom: 22%;
    width: 3px;
    border-radius: 0 3px 3px 0;
    background: linear-gradient(180deg, var(--sb-accent), var(--sb-accent-2));
    opacity: 0;
    transform: scaleY(0);
    transition: opacity 0.2s, transform 0.22s cubic-bezier(0.22,1,0.36,1);
  }

  .sb-link:hover {
    color: var(--sb-text);
    background: var(--sb-surface);
    border-color: var(--sb-border);
    transform: translateX(3px);
  }

  .sb-link.active {
    color: var(--sb-text);
    background: linear-gradient(90deg, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0.04) 100%);
    border-color: rgba(99,102,241,0.2);
    transform: translateX(3px);
    box-shadow: 0 0 16px rgba(99,102,241,0.08);
  }
  .sb-link.active::after {
    opacity: 1;
    transform: scaleY(1);
  }

  .sb-icon-wrap {
    width: 30px; height: 30px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--sb-text-2);
    transition: background 0.2s, color 0.2s;
  }
  .sb-link:hover .sb-icon-wrap  { background: var(--sb-surface-2); color: var(--sb-text); }
  .sb-link.active .sb-icon-wrap { background: rgba(99,102,241,0.15); color: var(--sb-accent); }

  .sb-link-text { flex: 1; }

  .sb-active-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--sb-accent-3);
    flex-shrink: 0;
    box-shadow: 0 0 6px rgba(16,185,129,0.5);
    animation: sbDotPulse 2.2s ease-in-out infinite;
  }
  @keyframes sbDotPulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50%     { opacity: 0.4; transform: scale(1.5); }
  }

  /* ── Divider ── */
  .sb-divider {
    height: 1px;
    margin: 0.4rem 0.75rem;
    background: linear-gradient(90deg, transparent, var(--sb-border-md), transparent);
    flex-shrink: 0;
  }

  /* ── Footer ── */
  .sb-footer {
    padding: 0.75rem;
    border-top: 1px solid var(--sb-border);
    flex-shrink: 0;
  }

  .sb-user-strip {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.6rem 0.85rem;
    border-radius: 12px;
    background: var(--sb-surface);
    border: 1px solid var(--sb-border);
    margin-bottom: 0.45rem;
    opacity: 0;
    animation: sbFadeIn 0.5s 0.5s ease forwards;
  }

  .sb-user-avatar {
    width: 30px; height: 30px;
    border-radius: 8px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Outfit', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    color: white;
    flex-shrink: 0;
    box-shadow: 0 0 10px rgba(99,102,241,0.3);
  }

  .sb-user-info { flex: 1; min-width: 0; }
  .sb-user-name {
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--sb-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.2;
  }
  .sb-user-role {
    font-size: 0.65rem;
    color: var(--sb-text-3);
    margin-top: 1px;
  }

  .sb-status-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--sb-accent-3);
    box-shadow: 0 0 6px rgba(16,185,129,0.5);
    flex-shrink: 0;
  }

  .sb-logout {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.62rem 0.9rem;
    border-radius: 12px;
    border: 1px solid transparent;
    background: none;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--sb-text-2);
    transition: color 0.2s, background 0.2s, border-color 0.2s;
  }
  .sb-logout:hover {
    color: var(--sb-danger);
    background: var(--sb-danger-bg);
    border-color: var(--sb-danger-border);
  }
  .sb-logout:hover .sb-logout-icon-wrap {
    background: rgba(239,68,68,0.08);
    color: var(--sb-danger);
  }

  .sb-logout-icon-wrap {
    width: 30px; height: 30px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--sb-text-2);
    transition: background 0.2s, color 0.2s;
  }
`;

let injected = false;
function injectStyles() {
  if (injected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = STYLES;
  document.head.appendChild(el);
  injected = true;
}

const Sidebar = ({ admin = false }) => {
  injectStyles();
  const { logout } = useAuth();

  const userLinks = [
    { name: "Dashboard",     path: "/dashboard", icon: LayoutDashboard },
    { name: "Upload Resume", path: "/upload",    icon: Upload },
    { name: "Jobs",          path: "/jobs",       icon: Briefcase },
  ];

  const adminLinks = [
    { name: "Dashboard",   path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Add Job",     path: "/admin/add-job",   icon: Upload },
    { name: "Manage Jobs", path: "/admin/jobs",      icon: FileSearch },
    { name: "Users",       path: "/admin/users",     icon: Users },
  ];

  const links = admin ? adminLinks : userLinks;
  const navigate = useNavigate();

  return (
    <aside className="sb-root">
      <div className="sb-inner">
        {/* ── Logo ── */}
        <div className="sb-logo-wrap">
          <div className="sb-logo-icon">
            <Zap size={18} color="white" strokeWidth={2.5} />
          </div>
          <span className="sb-logo-text">
            Resu<span>Scan</span>
          </span>
          <span className="sb-logo-badge">{admin ? "Admin" : "User"}</span>
        </div>

        {/* ── Nav ── */}
        <nav className="sb-nav">
          <div className="sb-section-label">
            {admin ? "Admin Panel" : "Main Menu"}
          </div>

          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                style={{ animationDelay: `${0.1 + i * 0.07}s` }}
                className={({ isActive }) =>
                  `sb-link${isActive ? " active" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="sb-icon-wrap">
                      <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                    </div>
                    <span className="sb-link-text">{link.name}</span>
                    {isActive && <span className="sb-active-dot" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* ── Footer ── */}
        <div className="sb-footer">
          <div className="sb-user-strip">
            <div className="sb-user-avatar">
              {admin ? "A" : "U"}
            </div>
            <div onClick={()=>{navigate('/profile')}} className="cursor-pointer sb-user-info">
              <div className="sb-user-name">{admin ? "Admin User" : "My Account"}</div>
              <div className="sb-user-role">{admin ? "Administrator" : "Job Seeker"}</div>
            </div>
            <span className="sb-status-dot" />
          </div>

          <div className="sb-divider" />

          <button className="sb-logout" onClick={logout}>
            <div className="sb-logout-icon-wrap">
              <LogOut size={16} strokeWidth={1.8} />
            </div>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;