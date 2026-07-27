// import React from "react";
// import { Link } from "react-router-dom";
// import { Users, Shield, ArrowRight } from "lucide-react";

// import Navbar from "../../components/layout/Navbar";
// import Footer from "../../components/layout/Footer";
// import Button from "../../components/common/Button";

// const LoginChoicePage = () => {
//   return (
//     <>
//       <Navbar />

//       <section className="flex min-h-[calc(100vh-128px)] items-center bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-50 py-12">
//         <div className="container-custom w-full">
//           <div className="mb-12 text-center">
//             <h1 className="text-4xl font-bold text-slate-900">
//               Welcome to Hirelytics
//             </h1>
//             <p className="mt-3 text-lg text-slate-600">
//               Choose how you'd like to access your account
//             </p>
//           </div>

//           <div className="mx-auto grid gap-8 max-w-4xl md:grid-cols-2">
//             {/* User Login Card */}
//             <Link to="/login" className="group">
//               <div className="card h-full p-8 transition-all duration-300 hover:shadow-lg hover:scale-105">
//                 <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-200">
//                   <Users className="h-8 w-8" />
//                 </div>

//                 <h2 className="text-2xl font-bold text-slate-900">
//                   Job Seeker
//                 </h2>

//                 <p className="mt-2 text-slate-600">
//                   Sign in to your Hirelytics account to upload your resume,
//                   compare it with job descriptions, and get AI-powered
//                   recommendations.
//                 </p>

//                 <div className="mt-8 space-y-3">
//                   <div className="flex items-center gap-2 text-sm text-slate-700">
//                     <span className="h-2 w-2 rounded-full bg-blue-500" />
//                     Upload and parse your resume
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-slate-700">
//                     <span className="h-2 w-2 rounded-full bg-blue-500" />
//                     View job opportunities
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-slate-700">
//                     <span className="h-2 w-2 rounded-full bg-blue-500" />
//                     Get detailed analysis reports
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-slate-700">
//                     <span className="h-2 w-2 rounded-full bg-blue-500" />
//                     Receive AI recommendations
//                   </div>
//                 </div>

//                 <div className="mt-8 flex items-center gap-2 font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
//                   Sign In <ArrowRight className="h-5 w-5" />
//                 </div>
//               </div>
//             </Link>

//             {/* Admin Login Card */}
//             <Link to="/admin/login" className="group">
//               <div className="card h-full p-8 transition-all duration-300 hover:shadow-lg hover:scale-105">
//                 <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-200">
//                   <Shield className="h-8 w-8" />
//                 </div>

//                 <h2 className="text-2xl font-bold text-slate-900">
//                   Admin Panel
//                 </h2>

//                 <p className="mt-2 text-slate-600">
//                   Sign in as an administrator to manage job postings, view
//                   applicant statistics, and oversee the platform.
//                 </p>

//                 <div className="mt-8 space-y-3">
//                   <div className="flex items-center gap-2 text-sm text-slate-700">
//                     <span className="h-2 w-2 rounded-full bg-purple-500" />
//                     Post and manage job listings
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-slate-700">
//                     <span className="h-2 w-2 rounded-full bg-purple-500" />
//                     View all registered users
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-slate-700">
//                     <span className="h-2 w-2 rounded-full bg-purple-500" />
//                     Monitor platform analytics
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-slate-700">
//                     <span className="h-2 w-2 rounded-full bg-purple-500" />
//                     Control system settings
//                   </div>
//                 </div>

//                 <div className="mt-8 flex items-center gap-2 font-semibold text-purple-600 group-hover:translate-x-1 transition-transform">
//                   Admin Login <ArrowRight className="h-5 w-5" />
//                 </div>
//               </div>
//             </Link>
//           </div>

//           <div className="mt-12 text-center">
//             <p className="text-slate-600">
//               Don't have an account?{" "}
//               <Link
//                 to="/register"
//                 className="font-semibold text-indigo-600 hover:text-indigo-700"
//               >
//                 Register here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default LoginChoicePage;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Shield,
  ArrowRight,
  Sparkles,
  Lock,
  ChevronRight,
} from "lucide-react";

/* ─── Orbital Ring Background ─────────────────────────────────────────── */
const OrbitalCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = [
      [99, 102, 241],
      [139, 92, 246],
      [16, 185, 129],
    ];

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.3 + 0.05,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Orbital rings
      [220, 320, 420].forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99,102,241,${0.04 - i * 0.008})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Orbiting dot
        const angle = t * (1 - i * 0.2) + (i * Math.PI * 2) / 3;
        const dx = cx + Math.cos(angle) * r;
        const dy = cy + Math.sin(angle) * r;
        ctx.beginPath();
        ctx.arc(dx, dy, 2.5 - i * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLORS[i].join(",")},0.6)`;
        ctx.fill();

        // Trail
        for (let j = 1; j <= 8; j++) {
          const ta = angle - j * 0.06;
          const tx = cx + Math.cos(ta) * r;
          const ty = cy + Math.sin(ta) * r;
          ctx.beginPath();
          ctx.arc(tx, ty, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${COLORS[i].join(",")},${0.3 - j * 0.035})`;
          ctx.fill();
        }
      });

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.join(",")},${p.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.5,
      }}
    />
  );
};

/* ─── Hover Card ──────────────────────────────────────────────────────── */
const ChoiceCard = ({
  to,
  icon: Icon,
  iconBg,
  iconColor,
  accentColor,
  glowColor,
  title,
  subtitle,
  bullets,
  bulletColor,
  ctaLabel,
  ctaColor,
  delay,
}) => {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          background: "var(--lc-surface)",
          border: `1px solid ${hovered ? accentColor : "var(--lc-border)"}`,
          borderRadius: 24,
          padding: "2.5rem",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          height: "100%",
          boxSizing: "border-box",
          transform: hovered
            ? "translateY(-8px) scale(1.01)"
            : "translateY(0) scale(1)",
          boxShadow: hovered
            ? `0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px ${accentColor}, 0 0 60px ${glowColor}`
            : "0 8px 32px rgba(0,0,0,0.25)",
          transition: `transform 0.4s cubic-bezier(0.16,1,0.3,1),
                       box-shadow 0.4s cubic-bezier(0.16,1,0.3,1),
                       border-color 0.3s ease`,
          animation: `lc-fade-up 0.7s ${delay}s ease both`,
        }}
      >
        {/* Mouse-follow spotlight */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${glowColor} 0%, transparent 60%)`,
              pointerEvents: "none",
              transition: "opacity 0.2s",
            }}
          />
        )}

        {/* Top shimmer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background: hovered
              ? `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
            transition: "all 0.4s ease",
          }}
        />

        {/* Corner accent */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }}
        />

        {/* Number badge */}
        <div
          style={{
            position: "absolute",
            top: "1.75rem",
            right: "1.75rem",
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--lc-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.7rem",
            fontWeight: 700,
            color: "var(--lc-muted)",
            letterSpacing: "0.05em",
          }}
        >
          {to === "/login" ? "01" : "02"}
        </div>

        {/* Icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: iconBg,
            border: `1px solid ${accentColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
            color: iconColor,
            transform: hovered
              ? "scale(1.08) rotate(-3deg)"
              : "scale(1) rotate(0deg)",
            transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Icon size={24} />
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--lc-text)",
            marginBottom: "0.5rem",
            letterSpacing: "-0.02em",
            position: "relative",
            zIndex: 1,
          }}
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--lc-muted)",
            lineHeight: 1.75,
            marginBottom: "2rem",
            fontWeight: 300,
            position: "relative",
            zIndex: 1,
          }}
        >
          {subtitle}
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "var(--lc-border)",
            marginBottom: "1.5rem",
            position: "relative",
            zIndex: 1,
          }}
        />

        {/* Bullets */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.7rem",
            marginBottom: "2rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          {bullets.map((b, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                opacity: hovered ? 1 : 0.85,
                transform: hovered ? `translateX(${4}px)` : "translateX(0)",
                transition: `transform 0.35s ${i * 0.05}s ease, opacity 0.35s ease`,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: bulletColor,
                  flexShrink: 0,
                  boxShadow: hovered ? `0 0 8px ${bulletColor}` : "none",
                  transition: "box-shadow 0.3s ease",
                }}
              />
              <span
                style={{
                  fontSize: "0.83rem",
                  color: "var(--lc-muted)",
                  fontWeight: 400,
                }}
              >
                {b}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: ctaColor,
            fontWeight: 600,
            fontSize: "0.9rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span>{ctaLabel}</span>
          <ChevronRight
            size={16}
            style={{
              transform: hovered ? "translateX(5px)" : "translateX(0)",
              transition: "transform 0.3s ease",
            }}
          />
        </div>
      </div>
    </Link>
  );
};

/* ─── Main Page ───────────────────────────────────────────────────────── */
const LoginChoicePage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      :root {
        --lc-bg: #05070f;
        --lc-surface: #0c0f1e;
        --lc-surface2: #111526;
        --lc-accent: #6366f1;
        --lc-accent2: #8b5cf6;
        --lc-accent3: #10b981;
        --lc-text: #eef0ff;
        --lc-muted: #7b82a8;
        --lc-border: rgba(255,255,255,0.07);
      }
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

      @keyframes lc-fade-up {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes lc-slide-down {
        from { opacity: 0; transform: translateY(-100%); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes lc-pulse-ring {
        0%   { transform: scale(0.95); opacity: 0.7; }
        50%  { transform: scale(1.05); opacity: 0.3; }
        100% { transform: scale(0.95); opacity: 0.7; }
      }
      @keyframes lc-badge-glow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
        50%       { box-shadow: 0 0 14px 2px rgba(99,102,241,0.25); }
      }
      @keyframes lc-blink {
        0%, 100% { opacity: 1; } 50% { opacity: 0.2; }
      }
      @keyframes lc-gradient-shift {
        to { background-position: 200% center; }
      }

      .lc-nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 100;
        display: flex; align-items: center; justify-content: space-between;
        padding: 1.1rem 3.5rem;
        background: rgba(5,7,15,0.8);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--lc-border);
        animation: lc-slide-down 0.6s ease both;
      }
      .lc-logo {
        font-family: 'Outfit', sans-serif;
        font-weight: 700; font-size: 1.35rem; letter-spacing: -0.02em;
        text-decoration: none;
        display: flex; align-items: center; gap: 0.5rem;
      }
      .lc-logo-text {
        background: linear-gradient(135deg, var(--lc-accent), var(--lc-accent2));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      }
      .lc-logo-scan { -webkit-text-fill-color: var(--lc-accent3); }

      .lc-register-btn {
        display: inline-flex; align-items: center; gap: 0.5rem;
        background: linear-gradient(135deg, var(--lc-accent), var(--lc-accent2));
        color: #fff; border: none; cursor: pointer;
        padding: 0.6rem 1.4rem; border-radius: 100px;
        font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 600;
        text-decoration: none;
        box-shadow: 0 0 20px rgba(99,102,241,0.3);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .lc-register-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 36px rgba(99,102,241,0.5);
      }
    `;
    document.head.appendChild(style);
    setTimeout(() => setMounted(true), 50);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div
      style={{
        background: "var(--lc-bg)",
        color: "var(--lc-text)",
        fontFamily: "'Outfit', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <OrbitalCanvas />

      {/* ── Navbar ── */}
      <nav className="lc-nav">
        <a href="/" className="lc-logo">
          <img
            src="/Logo3.png"
            alt="Hirelytics Logo"
            style={{ height: 30, width: "auto" }}
          />
          <span className="lc-logo-text">
            Hire<span className="lc-logo-scan">lytics</span>
          </span>
        </a>
        <Link to="/register" className="lc-register-btn">
          Get Started <ArrowRight size={14} />
        </Link>
      </nav>

      {/* ── Main Content ── */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8rem 2rem 4rem",
        }}
      >
        {/* Ambient glow behind cards */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            animation: "lc-pulse-ring 6s ease-in-out infinite",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.25)",
            color: "var(--lc-accent)",
            padding: "0.4rem 1rem",
            borderRadius: 100,
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "2rem",
            animation:
              "lc-fade-up 0.7s 0.1s ease both, lc-badge-glow 3s 1s ease infinite",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--lc-accent3)",
              animation: "lc-blink 1.6s infinite",
            }}
          />
          Secure Access Portal
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            textAlign: "center",
            marginBottom: "1rem",
            animation: "lc-fade-up 0.7s 0.2s ease both",
          }}
        >
          Welcome back to{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, var(--lc-accent) 0%, var(--lc-accent2) 50%, var(--lc-accent3) 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "lc-gradient-shift 5s linear infinite",
            }}
          >
            Hirelytics
          </span>
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "var(--lc-muted)",
            fontWeight: 300,
            textAlign: "center",
            maxWidth: 420,
            lineHeight: 1.8,
            marginBottom: "3.5rem",
            animation: "lc-fade-up 0.7s 0.3s ease both",
          }}
        >
          Choose your access path to continue. Each portal is tailored to your
          role and permissions.
        </p>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            width: "100%",
            maxWidth: 780,
            animation: "lc-fade-up 0.7s 0.35s ease both",
          }}
        >
          <ChoiceCard
            to="/login"
            icon={Users}
            iconBg="rgba(99,102,241,0.12)"
            iconColor="#818cf8"
            accentColor="rgba(99,102,241,0.35)"
            glowColor="rgba(99,102,241,0.08)"
            title="Job Seeker"
            subtitle="Access your personal dashboard to upload resumes, compare with job descriptions, and receive AI-driven recommendations."
            bullets={[
              "Upload and parse your resume instantly",
              "Compare with live job descriptions",
              "Get detailed AI analysis reports",
              "Receive smart keyword suggestions",
            ]}
            bulletColor="#6366f1"
            ctaLabel="Continue as Job Seeker"
            ctaColor="#818cf8"
            delay={0.45}
          />

          <ChoiceCard
            to="/admin/login"
            icon={Shield}
            iconBg="rgba(139,92,246,0.12)"
            iconColor="#a78bfa"
            accentColor="rgba(139,92,246,0.35)"
            glowColor="rgba(139,92,246,0.08)"
            title="Administrator"
            subtitle="Access the control panel to manage job postings, oversee users, monitor analytics, and configure system settings."
            bullets={[
              "Post and manage job listings",
              "View all registered candidates",
              "Monitor platform-wide analytics",
              "Control system configuration",
            ]}
            bulletColor="#8b5cf6"
            ctaLabel="Continue as Admin"
            ctaColor="#a78bfa"
            delay={0.55}
          />
        </div>

        {/* Register prompt */}
        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            animation: "lc-fade-up 0.7s 0.65s ease both",
          }}
        >
          <div
            style={{
              height: 1,
              width: 60,
              background: "var(--lc-border)",
            }}
          />
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--lc-muted)",
              textAlign: "center",
            }}
          >
            New here?{" "}
            <Link
              to="/register"
              style={{
                color: "var(--lc-accent)",
                fontWeight: 600,
                textDecoration: "none",
                borderBottom: "1px solid rgba(99,102,241,0.4)",
                paddingBottom: 1,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.borderColor = "var(--lc-accent)")
              }
              onMouseLeave={(e) =>
                (e.target.style.borderColor = "rgba(99,102,241,0.4)")
              }
            >
              Create a free account
            </Link>
          </p>
          <div
            style={{
              height: 1,
              width: 60,
              background: "var(--lc-border)",
            }}
          />
        </div>

        {/* Trust signals */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginTop: "2.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
            animation: "lc-fade-up 0.7s 0.75s ease both",
          }}
        >
          {[
            { icon: Lock, label: "256-bit encrypted" },
            { icon: Shield, label: "SOC 2 compliant" },
            { icon: Sparkles, label: "12,000+ users" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "var(--lc-muted)",
                fontSize: "0.78rem",
                fontWeight: 400,
              }}
            >
              <Icon size={13} style={{ color: "var(--lc-accent3)" }} />
              {label}
            </div>
          ))}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          padding: "2rem 3.5rem",
          borderTop: "1px solid var(--lc-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          color: "var(--lc-muted)",
          fontSize: "0.8rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            letterSpacing: "-0.02em",
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(135deg, var(--lc-accent), var(--lc-accent2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hire
          </span>
          <span style={{ WebkitTextFillColor: "var(--lc-accent3)" }}>
            lytics
          </span>
        </span>
        <span>© 2025 Hirelytics. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                color: "var(--lc-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--lc-text)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--lc-muted)")}
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default LoginChoicePage;
