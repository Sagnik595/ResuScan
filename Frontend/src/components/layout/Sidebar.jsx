// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   BarChart3,
//   Briefcase,
//   FileSearch,
//   LayoutDashboard,
//   LogOut,
//   Upload,
//   Users,
// } from "lucide-react";
// import useAuth from "../../hooks/useAuth";

// const Sidebar = ({ admin = false }) => {
//   const { logout } = useAuth();

//   const userLinks = [
//     { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
//     { name: "Upload Resume", path: "/upload", icon: Upload },
//     { name: "Jobs", path: "/jobs", icon: Briefcase },
//   ];

//   const adminLinks = [
//     { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
//     { name: "Add Job", path: "/admin/add-job", icon: Upload },
//     { name: "Manage Jobs", path: "/admin/jobs", icon: FileSearch },
//     { name: "Users", path: "/admin/users", icon: Users },
//   ];

//   const links = admin ? adminLinks : userLinks;

//   return (
//     <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
//       <div className="border-b border-slate-200 px-6 py-5">
//         <h1 className="text-2xl font-bold text-indigo-600">ResuScan</h1>
//       </div>

//       <nav className="flex-1 space-y-2 p-4">
//         {links.map((link) => {
//           const Icon = link.icon;

//           return (
//             <NavLink
//               key={link.path}
//               to={link.path}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
//                   isActive
//                     ? "bg-indigo-50 text-indigo-600"
//                     : "text-slate-600 hover:bg-slate-100"
//                 }`
//               }
//             >
//               <Icon className="h-5 w-5" />
//               {link.name}
//             </NavLink>
//           );
//         })}
//       </nav>

//       <div className="border-t border-slate-200 p-4">
//         <button
//           onClick={logout}
//           className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
//         >
//           <LogOut className="h-5 w-5" />
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
import React from "react";
import { NavLink } from "react-router-dom";
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
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --sb-bg:            #f5f0e8;
    --sb-surface:       #ede8df;
    --sb-surface-2:     #e5dfd4;
    --sb-border:        rgba(160,140,110,0.18);
    --sb-border-md:     rgba(140,120,90,0.28);
    --sb-accent:        #d97706;
    --sb-accent-2:      #b45309;
    --sb-accent-light:  rgba(217,119,6,0.1);
    --sb-text:          #1c1712;
    --sb-text-2:        #6b5f4a;
    --sb-text-3:        #a89880;
    --sb-danger:        #b91c1c;
    --sb-danger-bg:     rgba(185,28,28,0.07);
    --sb-danger-border: rgba(185,28,28,0.15);
    --sb-green:         #16a34a;
  }

  .sb-root {
    height: 100vh;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 272px;
    flex-shrink: 0;
    background: var(--sb-bg);
    border-right: 1px solid var(--sb-border);
    position: relative;
    overflow: hidden;
  }

  /* warm top blush */
  .sb-root::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 200px;
    background: linear-gradient(160deg, rgba(217,119,6,0.06) 0%, transparent 70%);
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
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 12px rgba(217,119,6,0.3), inset 0 1px 0 rgba(255,255,255,0.25);
    flex-shrink: 0;
  }

  .sb-logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 1.18rem;
    font-weight: 800;
    letter-spacing: -0.025em;
    color: var(--sb-text);
  }

  .sb-logo-badge {
    margin-left: auto;
    font-size: 0.58rem;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--sb-accent-2);
    background: rgba(217,119,6,0.1);
    border: 1px solid rgba(217,119,6,0.22);
    padding: 0.18rem 0.5rem;
    border-radius: 6px;
  }

  /* ── Section label ── */
  .sb-section-label {
    font-family: 'Syne', sans-serif;
    font-size: 0.6rem;
    font-weight: 700;
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
    border-radius: 11px;
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
    background: var(--sb-accent);
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
    color: var(--sb-accent-2);
    background: linear-gradient(90deg, rgba(217,119,6,0.1) 0%, rgba(217,119,6,0.04) 100%);
    border-color: rgba(217,119,6,0.2);
    transform: translateX(3px);
    box-shadow: 0 1px 6px rgba(217,119,6,0.08);
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
    transition: background 0.2s;
  }
  .sb-link:hover .sb-icon-wrap  { background: var(--sb-surface-2); }
  .sb-link.active .sb-icon-wrap { background: rgba(217,119,6,0.12); }

  .sb-link-text { flex: 1; }

  .sb-active-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--sb-accent);
    flex-shrink: 0;
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
    border-radius: 11px;
    background: var(--sb-surface);
    border: 1px solid var(--sb-border);
    margin-bottom: 0.45rem;
    opacity: 0;
    animation: sbFadeIn 0.5s 0.5s ease forwards;
  }

  .sb-user-avatar {
    width: 30px; height: 30px;
    border-radius: 8px;
    background: linear-gradient(135deg, #f59e0b, #d97706);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    color: white;
    flex-shrink: 0;
    box-shadow: 0 1px 6px rgba(217,119,6,0.25);
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
    background: var(--sb-green);
    box-shadow: 0 0 5px rgba(22,163,74,0.4);
    flex-shrink: 0;
  }

  .sb-logout {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.62rem 0.9rem;
    border-radius: 11px;
    border: 1px solid transparent;
    background: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
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
    background: rgba(185,28,28,0.08);
  }

  .sb-logout-icon-wrap {
    width: 30px; height: 30px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s;
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

  return (
    <aside className="sb-root">
      <div className="sb-inner">
        {/* ── Logo ── */}
        <div className="sb-logo-wrap">
          <div className="sb-logo-icon">
            <Zap size={18} color="white" strokeWidth={2.5} />
          </div>
          <span className="sb-logo-text">ResuScan</span>
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
            <div className="sb-user-info">
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