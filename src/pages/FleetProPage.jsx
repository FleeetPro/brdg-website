import { useState, useEffect, useRef } from "react";

const C = {
  neon: "#57E6E6",
  neonDim: "#3FD0D4",
  neonGlow: "#57E6E666",
  void: "#0B1120",
  deep: "#070C18",
  surface: "#0F1729",
  border: "#1A2744",
  white: "#E6EDF3",
  gray: "#9CA3AF",
  grayLight: "#E6EDF3",
};

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimatedNumber({ target, suffix = "", duration = 1600, trigger }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [trigger, target, duration]);
  return <>{count}{suffix}</>;
}

function CraneIcon({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 44V40H12V24L6 12V8H10L12 4H16L18 8H22V12L16 24V40H20V36H24V8H28V4H32V8H36V36H40V40H44V44H8Z" fill="#57E6E6"/>
      <rect x="26" y="12" width="8" height="2" fill="#3FD0D4"/>
      <rect x="26" y="18" width="8" height="2" fill="#3FD0D4"/>
      <rect x="26" y="24" width="8" height="2" fill="#3FD0D4"/>
      <rect x="26" y="30" width="8" height="2" fill="#3FD0D4"/>
    </svg>
  );
}

function Hero() {
  const [ref, visible] = useInView(0.05);
  return (
    <section ref={ref} style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center",
      position: "relative", overflow: "hidden",
      background: `linear-gradient(180deg, ${C.void} 0%, ${C.deep} 60%, ${C.void} 100%)`,
      padding: "120px 1.5rem 80px",
    }}>
      {/* Parallax orbs */}
      <div style={{
        position: "absolute", top: "12%", left: "8%",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.neon}07 0%, transparent 70%)`,
        filter: "blur(60px)", animation: "fpOrbFloat 9s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", right: "6%",
        width: 350, height: 350, borderRadius: "50%",
        background: `radial-gradient(circle, #3B82F607 0%, transparent 70%)`,
        filter: "blur(40px)", animation: "fpOrbFloat 11s ease-in-out infinite 2s",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 2, maxWidth: 820,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(0.16, 1, 0.32, 1)",
      }}>
        {/* Back link */}
        <div style={{ marginBottom: 48 }}>
          <a href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: C.gray, textDecoration: "none",
            fontFamily: "'Sora', sans-serif", fontSize: 11,
            letterSpacing: "0.18em", textTransform: "uppercase",
            transition: "color 0.3s",
          }}
            onMouseOver={(e) => { e.currentTarget.style.color = C.neon; }}
            onMouseOut={(e) => { e.currentTarget.style.color = C.gray; }}>
            ← Back to BRDG Group
          </a>
        </div>

        {/* Label chip */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "7px 18px",
          border: `1px solid ${C.border}`, background: `${C.neon}06`,
          marginBottom: 36,
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: "50%", background: C.neon,
            boxShadow: `0 0 6px ${C.neon}`,
            animation: "fpDotPulse 2s ease-in-out infinite",
            display: "inline-block", flexShrink: 0,
          }} />
          <span style={{
            color: C.neon, fontSize: 11, letterSpacing: "0.2em",
            textTransform: "uppercase", fontFamily: "'Sora', sans-serif", fontWeight: 600,
          }}>Fleet Management Platform</span>
        </div>

        {/* Logo */}
        <div style={{
          display: "flex", justifyContent: "center", marginBottom: 20,
          animation: "fpIconGlow 3s ease-in-out infinite",
        }}>
          <img src="/images/fleetpro-crane-icon.png" alt="FleetPro" style={{ height: 64 }} />
        </div>

        {/* App name */}
        <div style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 800,
          color: "#F1F5F9",
          letterSpacing: "-0.02em",
          marginBottom: 16,
        }}>
          FleetPro
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "clamp(2.6rem, 6vw, 4.75rem)",
          fontWeight: 900, lineHeight: 1.05,
          letterSpacing: "0.01em", margin: 0, color: C.white,
        }}>
          Manage your fleet.<br />
          <span style={{
            background: `linear-gradient(135deg, ${C.neon} 0%, #3B82F6 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Master your costs.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          color: C.gray, fontSize: 17, lineHeight: 1.75,
          maxWidth: 540, margin: "24px auto 0",
          fontFamily: "'Sora', sans-serif", letterSpacing: "0.015em",
        }}>
          Purpose-built for construction companies managing 20–500 equipment units.
        </p>

        {/* Metrics */}
        <div style={{
          display: "inline-flex", marginTop: 56,
          border: `1px solid ${C.border}`, background: C.surface,
        }}>
          {[
            { animated: true, target: 70, suffix: "%", label: "Less admin time" },
            { animated: false, display: "500+", label: "Equipment units supported" },
            { animated: false, display: "Days", label: "To deploy, not months" },
          ].map((m, i) => (
            <div key={i} style={{
              padding: "28px 40px", textAlign: "center",
              borderRight: i < 2 ? `1px solid ${C.border}` : "none",
              minWidth: 140,
            }}>
              <div style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 900, color: C.neon,
                textShadow: `0 0 20px ${C.neon}55`,
              }}>
                {m.animated
                  ? <AnimatedNumber target={m.target} suffix={m.suffix} trigger={visible} />
                  : m.display}
              </div>
              <div style={{
                fontFamily: "'Sora', sans-serif", fontSize: 11,
                color: C.gray, letterSpacing: "0.12em",
                textTransform: "uppercase", marginTop: 6, fontWeight: 500,
              }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{
          display: "flex", gap: 16, justifyContent: "center",
          marginTop: 48, flexWrap: "wrap",
        }}>
          <a href="#cta" style={{
            background: `linear-gradient(135deg, ${C.neon} 0%, #3B82F6 100%)`,
            color: "#0B1120", padding: "14px 36px",
            fontSize: 13, fontWeight: 700, textDecoration: "none",
            fontFamily: "'Sora', sans-serif", letterSpacing: "0.08em",
            textTransform: "uppercase", borderRadius: 4,
            boxShadow: `0 0 20px ${C.neon}44`,
            transition: "all 0.3s ease",
          }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px ${C.neon}55`; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 0 20px ${C.neon}44`; }}>
            Request a Demo →
          </a>
          <a href="/#start" style={{
            color: C.grayLight, padding: "14px 36px", fontSize: 13,
            textDecoration: "none", fontFamily: "'Sora', sans-serif",
            fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            border: "1px solid rgba(255,255,255,0.2)", background: "transparent",
            transition: "all 0.3s ease", borderRadius: 4,
          }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "transparent"; }}>
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Feature card ────────────────────────────────────────────────────────────

function FeatureCard({ icon, text, delay, visible }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `${C.neon}06` : C.surface,
        border: `1px solid ${hov ? C.neon + "44" : C.border}`,
        padding: "20px 24px",
        display: "flex", gap: 16, alignItems: "flex-start",
        position: "relative", overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.32, 1) ${delay}ms`,
        boxShadow: hov ? `0 0 20px ${C.neon}0F` : "none",
      }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 16, height: 1, background: hov ? C.neon : C.border, transition: "background 0.3s" }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: 16, background: hov ? C.neon : C.border, transition: "background 0.3s" }} />
      <span style={{
        color: hov ? C.neon : C.gray, fontSize: 16, flexShrink: 0,
        transition: "all 0.3s", marginTop: 2,
        textShadow: hov ? `0 0 10px ${C.neonGlow}` : "none",
      }}>{icon}</span>
      <span style={{
        fontFamily: "'Sora', sans-serif", fontSize: 15,
        color: C.grayLight, lineHeight: 1.65,
      }}>{text}</span>
    </div>
  );
}

// ─── Role card ────────────────────────────────────────────────────────────────

function RoleCard({ role, delay, visible }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `${C.neon}06` : C.surface,
        border: `1px solid ${hov ? C.neon + "55" : C.border}`,
        padding: "32px 28px", flex: 1, minWidth: 220,
        position: "relative", overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.32, 1) ${delay}ms`,
        boxShadow: hov ? `0 0 30px ${C.neon}15, inset 0 0 30px ${C.neon}05` : "none",
      }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: hov ? `linear-gradient(90deg, ${C.neon}88, transparent)` : "transparent",
        transition: "all 0.3s",
      }} />
      <div style={{
        fontSize: 22, marginBottom: 16, color: hov ? C.neon : C.neonDim,
        textShadow: hov ? `0 0 15px ${C.neonGlow}` : "none", transition: "all 0.3s",
      }}>{role.icon}</div>
      <h3 style={{
        fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 700,
        color: C.white, margin: "0 0 12px",
        letterSpacing: "0.1em", textTransform: "uppercase",
      }}>{role.title}</h3>
      <p style={{
        fontFamily: "'Sora', sans-serif", fontSize: 14,
        color: C.gray, lineHeight: 1.7, margin: 0,
      }}>{role.desc}</p>
    </div>
  );
}

// ─── Section data ─────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "fleet",
    label: "01 — Fleet & Site Management",
    title: "Every unit. Every site. Under control.",
    items: [
      { icon: "▦", text: "Equipment registry with lifecycle tracking, auto-generated IDs, multi-image gallery" },
      { icon: "◉", text: "Interactive satellite map with GPS and geocoding" },
      { icon: "◈", text: "Hierarchical equipment types linked to billing rates" },
      { icon: "▥", text: "Equipment Gantt chart and utilisation timelines" },
      { icon: "◷", text: "Working day calendar with Australian public holidays" },
    ],
  },
  {
    id: "billing",
    label: "02 — Billing & Rate Agreements",
    title: "Automated billing. Zero ambiguity.",
    items: [
      { icon: "◎", text: "Two-tier pricing: Master (company-wide) and Project Specific (site-override)" },
      { icon: "▣", text: "Centralised rate resolution with automatic fallback" },
      { icon: "△", text: "Three invoice generation modes: Provisional, Accrual, Actual" },
      { icon: "◆", text: "Approval workflow: Draft → Submitted → Accepted/Rejected → Paid" },
      { icon: "▤", text: "Invoice adjustments (credits/debits) with independent approval" },
      { icon: "◈", text: "MYOB and Xero compatible CSV exports" },
    ],
  },
  {
    id: "forecasting",
    label: "03 — Forecasting & Analytics",
    title: "Know your numbers before the quarter ends.",
    items: [
      { icon: "◉", text: "Four-curve revenue and cost forecast charts" },
      { icon: "▦", text: "Global Forecast Table: all sites, fiscal year columns, drill-down to equipment level" },
      { icon: "◷", text: "Financial logic: paid invoices = truth, future = working days × rate" },
      { icon: "▣", text: "Excel export with embedded formulas and Rate Agreement traceability" },
    ],
  },
  {
    id: "requests",
    label: "04 — Requests & Workflows",
    title: "Structured approvals. Full audit trail.",
    items: [
      { icon: "△", text: "Plant Requests: SM requests equipment → PM approves → allocation created" },
      { icon: "◆", text: "Change Requests: SM requests date change → PM approves with override option" },
      { icon: "▥", text: "Delivery tracking with arrival/departure confirmation" },
      { icon: "◎", text: "Invoice review by Site Managers with accept/reject and reasons" },
    ],
  },
  {
    id: "dashboards",
    label: "05 — Dashboards",
    title: "The right data for the right person.",
    items: [
      { icon: "▦", text: "Plant Manager: Operations tab (KPIs, requests, map, conflicts) + Finance tab (forecast, invoices, revenue)" },
      { icon: "◈", text: "Site Manager: site-filtered KPIs, cost forecast, timelines, calendar" },
      { icon: "▣", text: "Drag-and-drop widget reordering with server-persisted layout" },
    ],
  },
  {
    id: "security",
    label: "06 — Roles & Security",
    title: "Enterprise-grade access control.",
    roles: [
      {
        icon: "◆",
        title: "Administrator",
        desc: "Full system access. Manages users, company settings, rate agreements, and has visibility across all sites and financial data.",
      },
      {
        icon: "▦",
        title: "Plant Manager",
        desc: "Manages equipment fleet, approves requests, generates invoices, and views cross-site forecasts and revenue dashboards.",
      },
      {
        icon: "◈",
        title: "Site Manager",
        desc: "Access limited to assigned sites. Reviews allocations, approves invoices, submits change requests and delivery confirmations.",
      },
    ],
    badges: [
      "API enforcement on all 153 endpoints",
      "Route guards on all frontend pages",
      "CSRF protection",
      "Multi-tenant isolated environments",
    ],
  },
];

// ─── Feature section ──────────────────────────────────────────────────────────

function FeatureSection({ section, index }) {
  const [ref, visible] = useInView(0.08);
  const bg = index % 2 === 0
    ? `linear-gradient(180deg, ${C.void} 0%, ${C.deep} 100%)`
    : `linear-gradient(180deg, ${C.deep} 0%, ${C.void} 100%)`;

  return (
    <section ref={ref} style={{
      padding: "100px 1.5rem",
      background: bg,
      borderTop: `1px solid ${C.border}`,
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${C.neon}1A, transparent)`,
      }} />
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          marginBottom: 48,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.32, 1)",
        }}>
          <span style={{
            color: C.neon, fontSize: 11, letterSpacing: "0.25em",
            textTransform: "uppercase", fontFamily: "'Sora', sans-serif", fontWeight: 600,
          }}>{section.label}</span>
          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
            fontWeight: 700, color: C.white,
            marginTop: 10, lineHeight: 1.2, letterSpacing: "0.03em",
          }}>{section.title}</h2>
        </div>

        {section.roles ? (
          <>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {section.roles.map((role, i) => (
                <RoleCard key={role.title} role={role} delay={i * 80 + 200} visible={visible} />
              ))}
            </div>
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 10, marginTop: 32,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.6s ease 0.5s",
            }}>
              {section.badges.map((badge) => (
                <span key={badge} style={{
                  padding: "6px 16px",
                  border: `1px solid ${C.neon}33`,
                  background: `${C.neon}08`,
                  color: C.neon,
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 11, letterSpacing: "0.08em", fontWeight: 600,
                }}>✓ {badge}</span>
              ))}
            </div>
          </>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 12,
          }}>
            {section.items.map((item, i) => (
              <FeatureCard key={i} icon={item.icon} text={item.text} delay={i * 60 + 200} visible={visible} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Footer CTA ───────────────────────────────────────────────────────────────

function FooterCTA() {
  const [ref, visible] = useInView();
  return (
    <section id="cta" ref={ref} style={{
      padding: "100px 1.5rem 80px",
      background: `linear-gradient(180deg, ${C.deep} 0%, ${C.void} 100%)`,
      borderTop: `1px solid ${C.border}`,
      textAlign: "center", position: "relative",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${C.neon}44, transparent)`,
        boxShadow: `0 0 20px ${C.neon}22`,
      }} />
      <div style={{
        maxWidth: 600, margin: "0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.32, 1)",
      }}>
        <div style={{
          display: "flex", justifyContent: "center",
          marginBottom: 28, animation: "fpIconGlow 3s ease-in-out infinite",
        }}>
          <CraneIcon size={48} />
        </div>
        <h2 style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
          fontWeight: 700, color: C.white, margin: 0, letterSpacing: "0.04em",
        }}>
          Ready to streamline<br />
          <span style={{ color: C.neon }}>your fleet?</span>
        </h2>
        <p style={{
          color: C.gray, fontSize: 15, lineHeight: 1.75,
          marginTop: 16, fontFamily: "'Sora', sans-serif",
        }}>
          FleetPro is actively deployed across major infrastructure projects in Australia.
          Get a personalised walkthrough of the platform.
        </p>
        <div style={{
          display: "flex", gap: 16, justifyContent: "center",
          marginTop: 40, flexWrap: "wrap",
        }}>
          <a href="/#start" style={{
            background: `linear-gradient(135deg, ${C.neon} 0%, #3B82F6 100%)`,
            color: "#0B1120", padding: "14px 36px",
            fontSize: 13, fontWeight: 700, textDecoration: "none",
            fontFamily: "'Sora', sans-serif", letterSpacing: "0.08em",
            textTransform: "uppercase", borderRadius: 4,
            boxShadow: `0 0 20px ${C.neon}44`,
            transition: "all 0.3s ease",
          }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px ${C.neon}55`; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 0 20px ${C.neon}44`; }}>
            Request a Demo →
          </a>
          <a href="/#start" style={{
            color: C.grayLight, padding: "14px 36px", fontSize: 13,
            textDecoration: "none", fontFamily: "'Sora', sans-serif",
            fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            border: "1px solid rgba(255,255,255,0.2)", background: "transparent",
            transition: "all 0.3s ease", borderRadius: 4,
          }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "transparent"; }}>
            Contact Us
          </a>
        </div>
        <div style={{ marginTop: 60 }}>
          <a href="/" style={{
            color: C.gray, textDecoration: "none",
            fontFamily: "'Sora', sans-serif", fontSize: 11,
            letterSpacing: "0.18em", textTransform: "uppercase",
            transition: "color 0.3s",
          }}
            onMouseOver={(e) => { e.currentTarget.style.color = C.neon; }}
            onMouseOut={(e) => { e.currentTarget.style.color = C.gray; }}>
            ← Back to BRDG Group
          </a>
          <p style={{
            color: C.gray, fontSize: 11, fontFamily: "'Sora', sans-serif",
            margin: "20px 0 0", opacity: 0.5, letterSpacing: "0.1em",
          }}>
            © {new Date().getFullYear()} BRDG — SYDNEY, AUSTRALIA
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FleetProPage() {
  useEffect(() => {
    document.title = "FleetPro — Fleet Management Platform | BRDG";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: C.void, color: C.white, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 40px; }
        body { background: #0B1120; overflow-x: hidden; }
        ::selection { background: #57E6E633; color: #E6EDF3; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0B1120; }
        ::-webkit-scrollbar-thumb { background: #1A2744; }
        ::-webkit-scrollbar-thumb:hover { background: #57E6E644; }

        @keyframes fpOrbFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-28px) scale(1.04); }
        }
        @keyframes fpDotPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #57E6E6, 0 0 12px rgba(87,230,230,0.6); }
          50% { opacity: 0.3; box-shadow: 0 0 2px rgba(87,230,230,0.4); }
        }
        @keyframes fpIconGlow {
          0%, 100% { filter: drop-shadow(0 0 14px rgba(87,230,230,0.5)) drop-shadow(0 0 28px rgba(87,230,230,0.25)); }
          50% { filter: drop-shadow(0 0 22px rgba(87,230,230,0.7)) drop-shadow(0 0 44px rgba(87,230,230,0.4)); }
        }
      `}</style>
      <Hero />
      {SECTIONS.map((section, i) => (
        <FeatureSection key={section.id} section={section} index={i} />
      ))}
      <FooterCTA />
    </div>
  );
}
