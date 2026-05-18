// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// import Navbar from "../../components/layout/Navbar";
// import Footer from "../../components/layout/Footer";
// import Input from "../../components/common/Input";
// import Button from "../../components/common/Button";
// import useAuth from "../../hooks/useAuth";
// import api from "../../services/axiosInstance";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const validateForm = () => {
//     const { email, password } = formData;
    
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.trim()) {
//       toast.error("Email is required");
//       return false;
//     }
//     if (!emailRegex.test(email)) {
//       toast.error("Please enter a valid email");
//       return false;
//     }
    
//     // Password validation
//     if (!password.trim()) {
//       toast.error("Password is required");
//       return false;
//     }
//     if (password.length < 8) {
//       toast.error("Password must be at least 8 characters");
//       return false;
//     }
    
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       setLoading(true);

//       const { data } = await api.post("/user/login", {
//         email: formData.email.trim(),
//         password: formData.password,
//       });

//       if (data.success) {
//         login(data.token, "user");
//         toast.success(data.message);
//         navigate("/dashboard");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Login failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <section className="flex min-h-[calc(100vh-128px)] items-center bg-slate-50 py-12">
//         <div className="container-custom">
//           <div className="mx-auto max-w-md card p-8">
//             <h1 className="text-3xl font-bold text-slate-900">
//               Welcome Back
//             </h1>

//             <p className="mt-2 text-slate-600">
//               Sign in to your ResuScan account.
//             </p>

//             <form onSubmit={handleSubmit} className="mt-8 space-y-5">
//               <Input
//                 label="Email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />

//               <Input
//                 label="Password"
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />

//               <Button
//                 type="submit"
//                 fullWidth
//                 size="lg"
//                 loading={loading}
//               >
//                 Login
//               </Button>
//             </form>

//             <p className="mt-6 text-center text-sm text-slate-600">
//               Don&apos;t have an account?{" "}
//               <Link
//                 to="/register"
//                 className="font-medium text-indigo-600"
//               >
//                 Register
//               </Link>
//             </p>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default LoginPage;


import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import api from "../../services/axiosInstance";

/* ─── Particle Canvas ─────────────────────────────────────────────────── */
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

    const COLORS = [[99, 102, 241], [139, 92, 246], [16, 185, 129]];
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.3 + 0.05,
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
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.06 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
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
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.45,
      }}
    />
  );
};

/* ─── Styled Input Field ──────────────────────────────────────────────── */
const StyledInput = ({ label, type, name, value, onChange, icon: Icon, required }) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label
        style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          color: focused ? "var(--lp-accent)" : "var(--lp-muted)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {/* Left icon */}
        <div
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: focused ? "var(--lp-accent)" : "var(--lp-muted)",
            transition: "color 0.2s ease",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <Icon size={16} />
        </div>

        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          style={{
            width: "100%",
            boxSizing: "border-box",
            background: focused ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${focused ? "rgba(99,102,241,0.5)" : "var(--lp-border)"}`,
            borderRadius: 12,
            padding: "0.85rem 1rem 0.85rem 2.75rem",
            color: "var(--lp-text)",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.9rem",
            fontWeight: 400,
            outline: "none",
            transition: "border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease",
            boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
            paddingRight: isPassword ? "3rem" : "1rem",
          }}
          placeholder={type === "email" ? "you@example.com" : "••••••••"}
        />

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--lp-muted)",
              padding: 0,
              display: "flex",
              alignItems: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lp-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--lp-muted)")}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};

/* ─── Main Login Page ─────────────────────────────────────────────────── */
const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      :root {
        --lp-bg: #05070f;
        --lp-surface: #0c0f1e;
        --lp-surface2: #111526;
        --lp-accent: #6366f1;
        --lp-accent2: #8b5cf6;
        --lp-accent3: #10b981;
        --lp-text: #eef0ff;
        --lp-muted: #7b82a8;
        --lp-border: rgba(255,255,255,0.07);
      }
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

      @keyframes lp-fade-up {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes lp-slide-down {
        from { opacity: 0; transform: translateY(-100%); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes lp-gradient-shift {
        to { background-position: 200% center; }
      }
      @keyframes lp-badge-glow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
        50%       { box-shadow: 0 0 14px 2px rgba(99,102,241,0.25); }
      }
      @keyframes lp-blink {
        0%, 100% { opacity: 1; } 50% { opacity: 0.2; }
      }
      @keyframes lp-spin {
        to { transform: rotate(360deg); }
      }
      @keyframes lp-float {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-10px); }
      }

      .lp-nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 100;
        display: flex; align-items: center; justify-content: space-between;
        padding: 1.1rem 3.5rem;
        background: rgba(5,7,15,0.8);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--lp-border);
        animation: lp-slide-down 0.6s ease both;
      }
      .lp-logo {
        font-family: 'Outfit', sans-serif;
        font-weight: 700; font-size: 1.35rem; letter-spacing: -0.02em;
        text-decoration: none;
        display: flex; align-items: center; gap: 0.5rem;
      }

      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px #0c0f1e inset !important;
        -webkit-text-fill-color: #eef0ff !important;
        caret-color: #eef0ff;
        border-color: rgba(99,102,241,0.4) !important;
        transition: background-color 9999s ease-in-out 0s;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) { toast.error("Email is required"); return false; }
    if (!emailRegex.test(email)) { toast.error("Please enter a valid email"); return false; }
    if (!password.trim()) { toast.error("Password is required"); return false; }
    if (password.length < 8) { toast.error("Password must be at least 8 characters"); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      const { data } = await api.post("/user/login", {
        email: formData.email.trim(),
        password: formData.password,
      });
      if (data.success) {
        login(data.token, "user");
        toast.success(data.message);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "var(--lp-bg)",
        color: "var(--lp-text)",
        fontFamily: "'Outfit', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <ParticleCanvas />

      {/* ── Navbar ── */}
      <nav className="lp-nav">
        <a href="/" className="lp-logo">
          <img src="/Logo3.png" alt="ResuScan Logo" style={{ height: 30, width: "auto" }} />
          <span
            style={{
              background: "linear-gradient(135deg, var(--lp-accent), var(--lp-accent2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Resu<span style={{ WebkitTextFillColor: "var(--lp-accent3)" }}>Scan</span>
          </span>
        </a>
        <Link
          to="/register"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.25)",
            color: "var(--lp-accent)",
            padding: "0.55rem 1.2rem",
            borderRadius: 100,
            fontSize: "0.85rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "background 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(99,102,241,0.18)";
            e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(99,102,241,0.1)";
            e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)";
          }}
        >
          Create account <ArrowRight size={13} />
        </Link>
      </nav>

      {/* ── Main ── */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "7rem 1.5rem 4rem",
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            animation: "lp-float 7s ease-in-out infinite",
          }}
        />

        <div style={{ width: "100%", maxWidth: 440 }}>
          {/* Badge */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1.75rem",
              animation: "lp-fade-up 0.6s 0.1s ease both",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.25)",
                color: "var(--lp-accent)",
                padding: "0.38rem 1rem",
                borderRadius: 100,
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                animation: "lp-badge-glow 3s 1s ease infinite",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--lp-accent3)",
                  animation: "lp-blink 1.6s infinite",
                }}
              />
              Job Seeker Portal
            </div>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              textAlign: "center",
              marginBottom: "0.6rem",
              animation: "lp-fade-up 0.6s 0.2s ease both",
            }}
          >
            Welcome back
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "var(--lp-muted)",
              fontSize: "0.95rem",
              fontWeight: 300,
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              animation: "lp-fade-up 0.6s 0.3s ease both",
            }}
          >
            Sign in to continue your journey to the perfect role.
          </p>

          {/* Card */}
          <div
            style={{
              background: "var(--lp-surface)",
              border: "1px solid var(--lp-border)",
              borderRadius: 24,
              padding: "2.5rem",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px var(--lp-border)",
              animation: "lp-fade-up 0.6s 0.35s ease both",
            }}
          >
            {/* Top shimmer */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "15%",
                right: "15%",
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, var(--lp-accent), var(--lp-accent2), transparent)",
              }}
            />

            {/* Corner glow */}
            <div
              style={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <StyledInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                icon={Mail}
                required
              />

              <div>
                <StyledInput
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  icon={Lock}
                  required
                />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--lp-muted)",
                      textDecoration: "none",
                      fontWeight: 500,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--lp-accent)")}
                    onMouseLeave={(e) => (e.target.style.color = "var(--lp-muted)")}
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  background: loading
                    ? "rgba(99,102,241,0.5)"
                    : "linear-gradient(135deg, var(--lp-accent), var(--lp-accent2))",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "0.95rem 1.5rem",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: btnHovered && !loading
                    ? "0 0 40px rgba(99,102,241,0.5)"
                    : "0 0 20px rgba(99,102,241,0.25)",
                  transform: btnHovered && !loading ? "translateY(-2px)" : "translateY(0)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
                  marginTop: "0.25rem",
                }}
              >
                {loading ? (
                  <>
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "lp-spin 0.7s linear infinite",
                      }}
                    />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight
                      size={16}
                      style={{
                        transform: btnHovered ? "translateX(3px)" : "translateX(0)",
                        transition: "transform 0.25s ease",
                      }}
                    />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                margin: "1.75rem 0",
              }}
            >
              <div style={{ flex: 1, height: 1, background: "var(--lp-border)" }} />
              <span style={{ fontSize: "0.75rem", color: "var(--lp-muted)", fontWeight: 400 }}>
                or
              </span>
              <div style={{ flex: 1, height: 1, background: "var(--lp-border)" }} />
            </div>

            {/* Register link */}
            <p
              style={{
                textAlign: "center",
                fontSize: "0.85rem",
                color: "var(--lp-muted)",
              }}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "var(--lp-accent)",
                  fontWeight: 600,
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(99,102,241,0.4)",
                  paddingBottom: 1,
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.borderColor = "var(--lp-accent)")}
                onMouseLeave={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.4)")}
              >
                Register for free
              </Link>
            </p>
          </div>

          {/* Back link */}
          <div
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              animation: "lp-fade-up 0.6s 0.5s ease both",
            }}
          >
            <Link
              to="/login-choice"
              style={{
                fontSize: "0.8rem",
                color: "var(--lp-muted)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lp-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--lp-muted)")}
            >
              ← Back to portal selection
            </Link>
          </div>

          {/* Trust signals */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.75rem",
              marginTop: "2rem",
              flexWrap: "wrap",
              animation: "lp-fade-up 0.6s 0.6s ease both",
            }}
          >
            {["256-bit encrypted", "No data sold", "SOC 2 compliant"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.73rem",
                  color: "var(--lp-muted)",
                }}
              >
                <Sparkles size={11} style={{ color: "var(--lp-accent3)" }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          padding: "1.75rem 3.5rem",
          borderTop: "1px solid var(--lp-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          fontSize: "0.78rem",
          color: "var(--lp-muted)",
        }}
      >
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
          <span style={{ background: "linear-gradient(135deg, var(--lp-accent), var(--lp-accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Resu</span>
          <span style={{ WebkitTextFillColor: "var(--lp-accent3)" }}>Scan</span>
        </span>
        <span>© 2025 ResuScan. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              style={{ color: "var(--lp-muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.target.style.color = "var(--lp-text)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--lp-muted)")}
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;