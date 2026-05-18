import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  Brain,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  TrendingUp,
  FileSearch,
  Star,
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Button from "../../components/common/Button";

/* ─── Particle Canvas Background ─────────────────────────────────────── */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

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

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.35 + 0.08,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.07 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
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
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.55,
      }}
    />
  );
};

/* ─── Animated Score Bar ──────────────────────────────────────────────── */
const ScoreBar = ({ label, pct, color, delay }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(pct), delay);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pct, delay]);

  return (
    <div ref={ref} style={{ marginBottom: "0.75rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.35rem",
        }}
      >
        <span
          style={{
            fontSize: "0.8rem",
            color: "var(--rs-muted)",
            fontWeight: 500,
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: "0.8rem", color, fontWeight: 700 }}>
          {width}%
        </span>
      </div>
      <div
        style={{
          height: 6,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 100,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: color,
            borderRadius: 100,
            transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
    </div>
  );
};

/* ─── Scroll Reveal Hook ──────────────────────────────────────────────── */
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};

const Reveal = ({ children, delay = 0, style = {} }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* ─── Main Landing Page ───────────────────────────────────────────────── */
const LandingPage = () => {
  const [floatY, setFloatY] = useState(0);

  useEffect(() => {
    /* CSS custom properties injected once */
    const style = document.createElement("style");
    style.textContent = `
      :root {
        --rs-bg: #05070f;
        --rs-surface: #0c0f1e;
        --rs-surface2: #111526;
        --rs-accent: #6366f1;
        --rs-accent2: #8b5cf6;
        --rs-accent3: #10b981;
        --rs-text: #eef0ff;
        --rs-muted: #7b82a8;
        --rs-border: rgba(255,255,255,0.07);
      }
      @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@500;600;700&family=Outfit:wght@300;400;500;600&display=swap');

      .rs-btn-primary {
        display: inline-flex; align-items: center; gap: 0.5rem;
        background: linear-gradient(135deg, var(--rs-accent), var(--rs-accent2));
        color: #fff; border: none; cursor: pointer;
        padding: 0.9rem 2rem; border-radius: 100px;
        font-family: 'Outfit', sans-serif; font-size: 1rem; font-weight: 600;
        text-decoration: none;
        box-shadow: 0 0 28px rgba(99,102,241,0.35);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .rs-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 48px rgba(99,102,241,0.55);
      }
      .rs-btn-ghost {
        display: inline-flex; align-items: center; gap: 0.5rem;
        background: transparent; color: var(--rs-text); border: none; cursor: pointer;
        padding: 0.9rem 2rem; border-radius: 100px;
        font-family: 'Outfit', sans-serif; font-size: 1rem; font-weight: 500;
        text-decoration: none;
        border: 1px solid var(--rs-border);
        transition: border-color 0.2s, background 0.2s;
      }
      .rs-btn-ghost:hover {
        border-color: rgba(255,255,255,0.18);
        background: rgba(255,255,255,0.04);
      }
      .rs-step-card {
        background: var(--rs-surface);
        border: 1px solid var(--rs-border);
        border-radius: 20px; padding: 2rem;
        transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
        position: relative; overflow: hidden;
      }
      .rs-step-card:hover {
        transform: translateY(-6px);
        border-color: rgba(99,102,241,0.3);
        box-shadow: 0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(99,102,241,0.1);
      }
      .rs-step-card::before {
        content: '';
        position: absolute; inset: 0;
        background: linear-gradient(135deg, rgba(99,102,241,0.05), transparent 60%);
        opacity: 0; transition: opacity 0.3s;
      }
      .rs-step-card:hover::before { opacity: 1; }

      .rs-feature-card {
        background: var(--rs-surface);
        border: 1px solid var(--rs-border);
        border-radius: 20px; padding: 2rem;
        transition: transform 0.3s, border-color 0.3s;
        position: relative; overflow: hidden;
      }
      .rs-feature-card:hover {
        transform: translateY(-5px);
        border-color: rgba(255,255,255,0.12);
      }
      .rs-tag-match {
        padding: 0.28rem 0.75rem; border-radius: 100px; font-size: 0.72rem; font-weight: 600;
        background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); color: #34d399;
      }
      .rs-tag-miss {
        padding: 0.28rem 0.75rem; border-radius: 100px; font-size: 0.72rem; font-weight: 600;
        background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); color: #f87171;
      }
      .rs-stat-pill {
        background: rgba(255,255,255,0.03);
        border: 1px solid var(--rs-border);
        border-radius: 100px; padding: 0.55rem 1.4rem;
        font-size: 0.84rem; color: var(--rs-muted);
        font-family: 'Outfit', sans-serif;
      }
      .rs-stat-pill strong { color: var(--rs-text); font-weight: 600; }

      @keyframes rs-float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-14px); }
      }
      @keyframes rs-gradient-shift {
        to { background-position: 200% center; }
      }
      @keyframes rs-badge-glow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
        50% { box-shadow: 0 0 14px 2px rgba(99,102,241,0.25); }
      }
      @keyframes rs-blink {
        0%, 100% { opacity: 1; } 50% { opacity: 0.2; }
      }
      @keyframes rs-slide-down {
        from { transform: translateY(-100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes rs-fade-up {
        from { transform: translateY(24px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "Deep AI Skill Matching",
      desc: "Goes beyond keywords — understands context, seniority signals, and skill synonyms for a true compatibility score.",
      accent: "rgba(99,102,241,0.15)",
      border: "rgba(99,102,241,0.2)",
    },
    {
      icon: BarChart3,
      title: "Visual Match Breakdown",
      desc: "See exactly which categories are dragging your score down and by precisely how much.",
      accent: "rgba(139,92,246,0.15)",
      border: "rgba(139,92,246,0.2)",
    },
    {
      icon: Target,
      title: "Missing Skills Radar",
      desc: "Instantly surface gaps the recruiter will spot — prioritized by frequency in your target role.",
      accent: "rgba(16,185,129,0.12)",
      border: "rgba(16,185,129,0.2)",
    },
    {
      icon: Zap,
      title: "Instant ATS Check",
      desc: "Ensure your resume isn't filtered out before a human ever reads it with our ATS compatibility scanner.",
      accent: "rgba(245,158,11,0.1)",
      border: "rgba(245,158,11,0.18)",
    },
    {
      icon: TrendingUp,
      title: "Strategic Rewording",
      desc: "Get specific phrase suggestions that mirror recruiter language and land better with hiring managers.",
      accent: "rgba(239,68,68,0.08)",
      border: "rgba(239,68,68,0.15)",
    },
    {
      icon: FileSearch,
      title: "Project Ideas Generator",
      desc: "Bridge experience gaps with AI-crafted project suggestions that prove your skills before you have the job.",
      accent: "rgba(99,102,241,0.12)",
      border: "rgba(99,102,241,0.18)",
    },
  ];

  const steps = [
    {
      num: "01",
      icon: Upload,
      title: "Upload your resume",
      desc: "Drag and drop any PDF, DOC, or DOCX. We parse every line with precision.",
    },
    {
      num: "02",
      icon: FileSearch,
      title: "Paste the job description",
      desc: "Add the exact listing you're targeting. Our AI identifies what the employer truly needs.",
    },
    {
      num: "03",
      icon: Brain,
      title: "Get your match report",
      desc: "Receive a detailed score, missing skills, and improvement suggestions — in under 60 seconds.",
    },
    {
      num: "04",
      icon: Sparkles,
      title: "Apply with confidence",
      desc: "Use project ideas and keyword guidance to sharpen your application before you hit send.",
    },
  ];

  const benefits = [
    "Identify missing technical skills",
    "Receive AI-powered recommendations",
    "Improve your resume strategically",
    "Prepare targeted project ideas",
    "ATS compatibility scoring",
    "Keyword density optimization",
  ];

  return (
    <div
      style={{
        background: "var(--rs-bg)",
        color: "var(--rs-text)",
        fontFamily: "'Outfit', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ── Custom Navbar override styles ── */}
      <style>{`
        .rs-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.1rem 3.5rem;
          background: rgba(5,7,15,0.75);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--rs-border);
          animation: rs-slide-down 0.6s ease both;
        }
        .rs-logo {
          font-family: 'Outfit', sans-serif;
          font-weight: 700; font-size: 1.35rem; letter-spacing: -0.02em;
          background: linear-gradient(135deg, var(--rs-accent), var(--rs-accent2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          text-decoration: none;
        }
        .rs-logo span { -webkit-text-fill-color: var(--rs-accent3); }
        .rs-nav-links { display: flex; gap: 2.5rem; list-style: none; }
        .rs-nav-links a {
          color: var(--rs-muted); text-decoration: none;
          font-size: 0.9rem; font-weight: 500;
          transition: color 0.2s;
        }
        .rs-nav-links a:hover { color: var(--rs-text); }
      `}</style>

      <nav className="rs-nav">
        <a
          href="/"
          className="rs-logo"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <img
            src="/Logo3.png"
            alt="ResuScan Logo"
            style={{ height: "32px", width: "auto" }}
          />
          <span
            style={{
              background:
                "linear-gradient(135deg, var(--rs-accent), var(--rs-accent2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Resu
            <span style={{ WebkitTextFillColor: "var(--rs-accent3)" }}>
              Scan
            </span>
          </span>
        </a>
        <ul className="rs-nav-links">
          <li>
            <a href="#how">How it Works</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
        </ul>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link to="/login-choice">
            <button
              className="rs-btn-ghost"
              style={{ padding: "0.6rem 1.4rem", fontSize: "0.9rem" }}
            >
              Sign In
            </button>
          </Link>
          <Link to="/register">
            <button
              className="rs-btn-primary"
              style={{ padding: "0.6rem 1.4rem", fontSize: "0.9rem" }}
            >
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "9rem 2rem 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <ParticleCanvas />

        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            animation: "rs-float 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)",
            top: "30%",
            right: "10%",
            pointerEvents: "none",
            animation: "rs-float 6s 2s ease-in-out infinite",
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
            color: "var(--rs-accent)",
            padding: "0.4rem 1rem",
            borderRadius: 100,
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            marginBottom: "2rem",
            animation:
              "rs-fade-up 0.8s 0.2s ease both, rs-badge-glow 3s 1s ease infinite",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--rs-accent3)",
              animation: "rs-blink 1.6s infinite",
            }}
          />
          AI-Powered Resume Analysis
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
            animation: "rs-fade-up 0.8s 0.35s ease both",
          }}
        >
          <span style={{ display: "block", color: "var(--rs-text)" }}>
            Land your dream job
          </span>
          <span
            style={{
              display: "block",
              background:
                "linear-gradient(135deg, var(--rs-accent) 0%, var(--rs-accent2) 40%, var(--rs-accent3) 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation:
                "rs-gradient-shift 5s linear infinite, rs-fade-up 0.8s 0.45s ease both",
            }}
          >
            faster than ever.
          </span>
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--rs-muted)",
            maxWidth: 520,
            fontWeight: 300,
            lineHeight: 1.85,
            marginBottom: "2.5rem",
            animation: "rs-fade-up 0.8s 0.55s ease both",
          }}
        >
          Upload your resume, compare it with real job descriptions, and receive
          AI-powered recommendations to close the gap between you and the offer.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "rs-fade-up 0.8s 0.65s ease both",
          }}
        >
          <Link to="/register">
            <button className="rs-btn-primary">
              Analyze my resume <ArrowRight size={16} />
            </button>
          </Link>
          <Link to="/login-choice">
            <button className="rs-btn-ghost">Sign In</button>
          </Link>
        </div>

        {/* Mock Analysis Card */}
        <div
          style={{
            marginTop: "4.5rem",
            width: "100%",
            maxWidth: 680,
            animation: "rs-fade-up 0.8s 0.8s ease both",
          }}
        >
          <div
            style={{
              background: "var(--rs-surface)",
              border: "1px solid var(--rs-border)",
              borderRadius: 22,
              padding: "2rem",
              position: "relative",
              overflow: "hidden",
              boxShadow:
                "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px var(--rs-border)",
              animation: "rs-float 7s ease-in-out infinite",
            }}
          >
            {/* top shimmer line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, var(--rs-accent), var(--rs-accent2), transparent)",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.75rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: "rgba(99,102,241,0.15)",
                    border: "1px solid rgba(99,102,241,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                  }}
                >
                  📄
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                    Senior Frontend Engineer
                  </div>
                  <div
                    style={{ fontSize: "0.78rem", color: "var(--rs-muted)" }}
                  >
                    Analyzed against 1 job description
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "2.6rem",
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, var(--rs-accent), var(--rs-accent3))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1,
                  }}
                >
                  78%
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--rs-muted)",
                    marginTop: 3,
                  }}
                >
                  Match Score
                </div>
              </div>
            </div>

            <ScoreBar
              label="Technical Skills"
              pct={82}
              color="linear-gradient(90deg,#6366f1,#8b5cf6)"
              delay={200}
            />
            <ScoreBar
              label="Experience"
              pct={75}
              color="linear-gradient(90deg,#8b5cf6,#a78bfa)"
              delay={350}
            />
            <ScoreBar
              label="Keywords"
              pct={90}
              color="linear-gradient(90deg,#10b981,#6366f1)"
              delay={500}
            />
            <ScoreBar
              label="Soft Skills"
              pct={65}
              color="linear-gradient(90deg,#f472b6,#8b5cf6)"
              delay={650}
            />

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginTop: "1.5rem",
              }}
            >
              {[
                "✓ React",
                "✓ TypeScript",
                "✓ Node.js",
                "✓ CI/CD",
                "✓ Agile",
              ].map((t) => (
                <span key={t} className="rs-tag-match">
                  {t}
                </span>
              ))}
              {["✗ GraphQL", "✗ AWS Lambda", "✗ Docker"].map((t) => (
                <span key={t} className="rs-tag-miss">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Social proof pills */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "2rem",
            animation: "rs-fade-up 0.8s 1s ease both",
          }}
        >
          <span className="rs-stat-pill">
            <strong>12,000+</strong> resumes analyzed
          </span>
          <span className="rs-stat-pill">
            <strong>94%</strong> saw interview rates rise
          </span>
          <span className="rs-stat-pill">
            <strong>3×</strong> faster job placement
          </span>
        </div>
      </section>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--rs-border), transparent)",
          margin: "0 4rem",
        }}
      />

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ padding: "7rem 2rem" }}>
        <Reveal>
          <p
            style={{
              textAlign: "center",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--rs-accent)",
              marginBottom: "0.75rem",
            }}
          >
            Process
          </p>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 700,
              textAlign: "center",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            Three steps to your offer
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--rs-muted)",
              fontSize: "1.05rem",
              fontWeight: 300,
              maxWidth: 440,
              margin: "0 auto 4rem",
            }}
          >
            From upload to actionable insights in under 60 seconds.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "1.25rem",
            maxWidth: 960,
            margin: "0 auto",
          }}
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div className="rs-step-card">
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "3.5rem",
                      fontWeight: 700,
                      lineHeight: 1,
                      background:
                        "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.08))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {step.num}
                  </div>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 11,
                      background: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                      color: "var(--rs-accent)",
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--rs-muted)",
                      lineHeight: 1.65,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--rs-border), transparent)",
          margin: "0 4rem",
        }}
      />

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "7rem 2rem" }}>
        <Reveal>
          <p
            style={{
              textAlign: "center",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--rs-accent)",
              marginBottom: "0.75rem",
            }}
          >
            Features
          </p>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 700,
              textAlign: "center",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            Everything you need to get hired
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "var(--rs-muted)",
              fontSize: "1.05rem",
              fontWeight: 300,
              maxWidth: 440,
              margin: "0 auto 4rem",
            }}
          >
            Built for job seekers who refuse to leave things to chance.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "1.25rem",
            maxWidth: 960,
            margin: "0 auto",
          }}
        >
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  className="rs-feature-card"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -40,
                      right: -40,
                      width: 110,
                      height: 110,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${f.accent} 0%, transparent 70%)`,
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: f.accent,
                      border: `1px solid ${f.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.1rem",
                      color: "var(--rs-accent)",
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--rs-muted)",
                      lineHeight: 1.65,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--rs-border), transparent)",
          margin: "0 4rem",
        }}
      />

      {/* ── WHY RESUMSCAN (Benefits) ── */}
      <section style={{ padding: "7rem 2rem" }}>
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <Reveal>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--rs-accent)",
                marginBottom: "0.75rem",
              }}
            >
              Why ResuScan
            </p>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
                textAlign: "left",
              }}
            >
              Stop guessing. Start getting interviews.
            </h2>
            <p
              style={{
                color: "var(--rs-muted)",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              Most candidates spray and pray. ResuScan gives you the precision
              to tailor every application — knowing exactly what's missing
              before you hit send.
            </p>
            <Link to="/register">
              <button className="rs-btn-primary">
                Get Started Free <ArrowRight size={16} />
              </button>
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              style={{
                background: "var(--rs-surface)",
                border: "1px solid var(--rs-border)",
                borderRadius: 20,
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, var(--rs-accent2), transparent)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <Star
                  size={18}
                  color="var(--rs-accent)"
                  fill="var(--rs-accent)"
                />
                <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                  Why choose ResuScan
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                }}
              >
                {benefits.map((b, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "rgba(16,185,129,0.12)",
                        border: "1px solid rgba(16,185,129,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        color: "var(--rs-accent3)",
                      }}
                    >
                      <CheckCircle size={12} />
                    </div>
                    <span
                      style={{ fontSize: "0.9rem", color: "var(--rs-muted)" }}
                    >
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "4rem 2rem 7rem" }}>
        <Reveal>
          <div
            style={{
              maxWidth: 680,
              margin: "0 auto",
              background: "var(--rs-surface)",
              border: "1px solid var(--rs-border)",
              borderRadius: 28,
              padding: "4rem 3rem",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.06) 50%, rgba(16,185,129,0.04) 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "20%",
                right: "20%",
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, var(--rs-accent), var(--rs-accent2), transparent)",
              }}
            />
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                marginBottom: "1rem",
                position: "relative",
              }}
            >
              Ready to land the role?
            </h2>
            <p
              style={{
                color: "var(--rs-muted)",
                marginBottom: "2rem",
                fontSize: "1rem",
                position: "relative",
              }}
            >
              Join over 12,000 job seekers who've sharpened their resumes with
              ResuScan. It's free to start.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
                position: "relative",
              }}
            >
              <Link to="/register">
                <button className="rs-btn-primary">
                  Analyze my resume free <ArrowRight size={16} />
                </button>
              </Link>
              <Link to="/login-choice">
                <button className="rs-btn-ghost">Sign in</button>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: "2.5rem 3.5rem",
          borderTop: "1px solid var(--rs-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          color: "var(--rs-muted)",
          fontSize: "0.85rem",
        }}
      >
        <span
          className="rs-logo"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "1.2rem",
            letterSpacing: "-0.02em",
          }}
        >
          Resu<span style={{ color: "var(--rs-accent3)" }}>Scan</span>
        </span>
        <span>© 2025 ResuScan. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                color: "var(--rs-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--rs-text)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--rs-muted)")}
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
