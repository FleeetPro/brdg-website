import { useState, useEffect, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const C = {
  neon: "#57E6E6",
  neonDim: "#3FD0D4",
  neonGlow: "#57E6E666",
  neonHot: "#6AEAEA",
  void: "#0B1120",
  deep: "#070C18",
  surface: "#0F1729",
  surfaceLight: "#141D2E",
  border: "#1A2744",
  borderGlow: "#57E6E622",
  white: "#E6EDF3",
  gray: "#9CA3AF",
  grayLight: "#E6EDF3",
};

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const linkStyle = {
    color: C.grayLight, textDecoration: "none", fontSize: 13, fontFamily: "'Sora', sans-serif",
    letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500,
    transition: "color 0.3s, text-shadow 0.3s", cursor: "pointer",
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(4,11,20,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
      borderBottom: `1px solid ${scrolled ? C.borderGlow : "transparent"}`,
      transition: "all 0.5s ease", padding: "0 clamp(1.5rem, 5vw, 4rem)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <a href="#hero" style={{ textDecoration: "none" }}>
          <span className="neon-breathe" style={{
            fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 900, letterSpacing: "0.08em",
            color: C.neon,
          }}>BRDG</span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 36 }} className="nav-desktop">
          <div style={{ position: "relative" }}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}>
            <a href="#" style={linkStyle}
              onMouseOver={(e) => { e.target.style.color = C.neon; e.target.style.textShadow = `0 0 12px ${C.neonGlow}`; }}
              onMouseOut={(e) => { e.target.style.color = C.grayLight; e.target.style.textShadow = "none"; }}>
              Products ▾
            </a>
            {dropdownOpen && (
              <div style={{
                position: "absolute", top: "100%", left: -16, marginTop: 12,
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 4, padding: 6, minWidth: 220,
                boxShadow: `0 0 30px ${C.neon}11, 0 20px 60px rgba(0,0,0,0.7)`,
              }}>
                <a href="#fleetpro" style={{
                  display: "block", padding: "12px 16px", borderRadius: 3, textDecoration: "none",
                  borderLeft: "2px solid transparent", transition: "all 0.2s",
                }}
                  onMouseOver={(e) => { e.currentTarget.style.background = `${C.neon}08`; e.currentTarget.style.borderLeftColor = C.neon; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderLeftColor = "transparent"; }}>
                  <div style={{ color: C.neonHot, fontSize: 14, fontWeight: 600, fontFamily: "'Sora', sans-serif", letterSpacing: "0.05em" }}>FLEET PRO</div>
                  <div style={{ color: C.gray, fontSize: 11, marginTop: 3, fontFamily: "'Sora', sans-serif", letterSpacing: "0.04em" }}>Fleet Management SaaS</div>
                </a>
              </div>
            )}
          </div>

          {[
            { label: "Services", href: "#services" },
            { label: "Why BRDG", href: "#why" },
          ].map((item) => (
            <a key={item.label} href={item.href} style={linkStyle}
              onMouseOver={(e) => { e.target.style.color = C.neon; e.target.style.textShadow = `0 0 12px ${C.neonGlow}`; }}
              onMouseOut={(e) => { e.target.style.color = C.grayLight; e.target.style.textShadow = "none"; }}>
              {item.label}
            </a>
          ))}

          <a href="#start" className="nav-cta" style={{
            background: "transparent", color: C.neon, padding: "8px 24px",
            border: `1px solid ${C.neon}66`, borderRadius: 2,
            fontSize: 12, fontWeight: 700, textDecoration: "none",
            fontFamily: "'Sora', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase",
            boxShadow: `0 0 10px rgba(87, 230, 230, 0.3), 0 0 25px rgba(87, 230, 230, 0.15)`,
            transition: "all 0.3s ease",
          }}
            onMouseOver={(e) => { e.target.style.background = `${C.neon}15`; e.target.style.boxShadow = `0 0 15px rgba(87, 230, 230, 0.5), 0 0 35px rgba(87, 230, 230, 0.25)`; e.target.style.borderColor = C.neon; }}
            onMouseOut={(e) => { e.target.style.background = "transparent"; e.target.style.boxShadow = `0 0 10px rgba(87, 230, 230, 0.3), 0 0 25px rgba(87, 230, 230, 0.15)`; e.target.style.borderColor = `${C.neon}66`; }}>
            Start a project
          </a>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="nav-mobile-btn" style={{
          display: "none", background: "none", border: `1px solid ${C.border}`,
          color: C.neon, fontSize: 20, cursor: "pointer", padding: "6px 10px",
          fontFamily: "'Sora', sans-serif",
        }}>{mobileOpen ? "✕" : "☰"}</button>
      </div>

      {mobileOpen && (
        <div className="nav-mobile-menu" style={{
          background: C.deep, padding: "1rem 2rem 2rem",
          borderTop: `1px solid ${C.border}`,
        }}>
          {[
            { label: "Fleet Pro", href: "#fleetpro" },
            { label: "Services", href: "#services" },
            { label: "Why BRDG", href: "#why" },
          ].map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
              style={{ display: "block", padding: "14px 0", color: C.grayLight, textDecoration: "none", fontSize: 14, fontFamily: "'Sora', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", borderBottom: `1px solid ${C.border}` }}>
              {item.label}
            </a>
          ))}
          <a href="#start" onClick={() => setMobileOpen(false)} style={{
            display: "inline-block", marginTop: 20, color: C.neon, padding: "10px 24px",
            border: `1px solid ${C.neon}66`, fontWeight: 700, textDecoration: "none",
            fontFamily: "'Sora', sans-serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
          }}>Start a project</a>
        </div>
      )}
    </nav>
  );
}

function ParticlesBg() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: false,
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          color: { value: "#57E6E6" },
          links: { color: "#57E6E6", distance: 150, enable: true, opacity: 0.15, width: 1 },
          move: { enable: true, speed: 0.8, direction: "none", random: true, straight: false, outModes: { default: "out" } },
          number: { density: { enable: true, area: 900 }, value: 60 },
          opacity: { value: { min: 0.1, max: 0.4 }, animation: { enable: true, speed: 0.5, minimumValue: 0.1 } },
          size: { value: { min: 1, max: 3 } },
        },
        interactivity: { events: { onHover: { enable: true, mode: "grab" } }, modes: { grab: { distance: 140, links: { opacity: 0.4 } } } },
        detectRetina: true,
      }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "auto", overflow: "hidden" }}
    />
  );
}

function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      textAlign: "center", position: "relative", overflow: "hidden",
      background: `linear-gradient(180deg, ${C.void} 0%, ${C.deep} 40%, #051020 70%, ${C.deep} 100%)`,
      padding: "0 1.5rem",
    }}>
      <ParticlesBg />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-title-glow" style={{ isolation: "isolate" }}>
          <h1 style={{
            fontFamily: "'Sora', sans-serif", fontSize: "clamp(4.5rem, 14vw, 12rem)", fontWeight: 900,
            lineHeight: 0.9, letterSpacing: "0.06em", margin: 0,
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, #57E6E6 40%, #3FD0D4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>BRDG</h1>
        </div>

        <div style={{
          width: "60%", height: 2, margin: "16px auto 0",
          background: `linear-gradient(90deg, transparent, ${C.neon}, transparent)`,
          boxShadow: `0 0 12px ${C.neon}88, 0 0 30px ${C.neonGlow}`,
        }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10, marginTop: 28,
          padding: "8px 20px", border: `1px solid ${C.border}`, background: `${C.neon}06`,
        }}>
          <span className="dot-pulse" style={{ width: 6, height: 6, background: C.neon }} />
          <span style={{ color: C.gray, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Sora', sans-serif", fontWeight: 500 }}>
            Bridging Real-World Data with Ground Operations
          </span>
        </div>

        <p style={{
          color: C.grayLight, fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", lineHeight: 1.8,
          maxWidth: 540, margin: "28px auto 0", fontFamily: "'Sora', sans-serif", fontWeight: 400, letterSpacing: "0.02em",
        }}>
          We build high-performance SaaS products and custom software that solve real business challenges. From our own tools to bespoke solutions — built for impact.
        </p>

        <div style={{
          display: "flex", gap: 20, justifyContent: "center", marginTop: 44, flexWrap: "wrap",
        }}>
          <a href="#start" style={{
            background: `linear-gradient(135deg, #57E6E6 0%, #3FD0D4 100%)`,
            color: "#0B1120", padding: "14px 36px", border: "none",
            fontSize: 13, fontWeight: 700, textDecoration: "none",
            fontFamily: "'Sora', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase",
            boxShadow: `0 0 15px rgba(87, 230, 230, 0.4), 0 0 40px rgba(87, 230, 230, 0.2), 0 0 80px rgba(63, 208, 212, 0.1)`,
            transition: "all 0.3s ease", borderRadius: 4,
          }}
            onMouseOver={(e) => { e.target.style.boxShadow = `0 0 20px rgba(87, 230, 230, 0.6), 0 0 50px rgba(87, 230, 230, 0.3), 0 0 100px rgba(63, 208, 212, 0.15)`; e.target.style.transform = "translateY(-2px)"; }}
            onMouseOut={(e) => { e.target.style.boxShadow = `0 0 15px rgba(87, 230, 230, 0.4), 0 0 40px rgba(87, 230, 230, 0.2), 0 0 80px rgba(63, 208, 212, 0.1)`; e.target.style.transform = "translateY(0)"; }}>
            Start a project →
          </a>
          <a href="#services" style={{
            color: "#E6EDF3", padding: "14px 36px", fontSize: 13, textDecoration: "none",
            fontFamily: "'Sora', sans-serif", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            border: "1px solid rgba(255,255,255,0.2)", background: "transparent",
            transition: "all 0.3s ease", borderRadius: 4,
          }}
            onMouseOver={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.4)"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
            onMouseOut={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.background = "transparent"; }}>
            Explore services
          </a>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  const [ref, visible] = useInView();
  return (
    <section ref={ref} style={{ padding: "100px 1.5rem", textAlign: "center", background: C.deep, borderTop: `1px solid ${C.border}`, position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.neon}33, transparent)`, boxShadow: `0 0 20px ${C.neon}22` }} />
      <div style={{ maxWidth: 700, margin: "0 auto", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.32, 1)" }}>
        <h2 className="neon-breathe" style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: C.neon, letterSpacing: "0.06em", margin: 0 }}>BRDG</h2>
        <p style={{ color: C.grayLight, fontSize: "clamp(1rem, 2vw, 1.1rem)", lineHeight: 1.8, marginTop: 24, fontFamily: "'Sora', sans-serif", letterSpacing: "0.02em" }}>
          We don't just write code — we <strong style={{ color: C.neonHot }}>bridge the gap</strong> between the data you collect and the teams who need it most.
          <br />Your operations deserve software built with purpose.
        </p>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: "◆", title: "Custom Software", desc: "Tailored solutions that transform your business processes — not generic templates." },
  { icon: "◈", title: "Data Systems", desc: "Capture, store and visualise your field data in real time." },
  { icon: "▣", title: "Web & Mobile Apps", desc: "High-performance interfaces that teams actually enjoy using." },
  { icon: "◎", title: "SaaS Products", desc: "Our own tools like Fleet Pro, ready to deploy for your industry." },
  { icon: "⬡", title: "Security & Compliance", desc: "Enterprise-grade security and full regulatory compliance." },
  { icon: "⚡", title: "Automation", desc: "Remove bottlenecks so your team can focus on what matters." },
];

function ServiceCard({ service, delay, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${C.neon}06` : C.surface,
        border: `1px solid ${hovered ? C.neon + "44" : C.border}`,
        padding: 28, position: "relative", overflow: "hidden",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.32, 1) ${delay}ms`,
        boxShadow: hovered ? `0 0 30px ${C.neon}11, inset 0 0 30px ${C.neon}05` : "none",
      }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 20, height: 1, background: hovered ? C.neon : C.border, transition: "background 0.3s", boxShadow: hovered ? `0 0 8px ${C.neonGlow}` : "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: 20, background: hovered ? C.neon : C.border, transition: "background 0.3s", boxShadow: hovered ? `0 0 8px ${C.neonGlow}` : "none" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 1, background: hovered ? C.neon : C.border, transition: "background 0.3s" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 1, height: 20, background: hovered ? C.neon : C.border, transition: "background 0.3s" }} />
      <div style={{ fontSize: 20, marginBottom: 16, color: hovered ? C.neon : C.gray, textShadow: hovered ? `0 0 12px ${C.neonGlow}` : "none", transition: "all 0.3s" }}>{service.icon}</div>
      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: C.white, margin: "0 0 10px", letterSpacing: "0.04em" }}>{service.title}</h3>
      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, color: C.gray, lineHeight: 1.6, margin: 0 }}>{service.desc}</p>
    </div>
  );
}

function Services() {
  const [ref, visible] = useInView();
  return (
    <section id="services" ref={ref} style={{ padding: "100px 1.5rem", position: "relative", background: `linear-gradient(180deg, ${C.deep} 0%, ${C.void} 100%)` }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          <span style={{ color: C.neon, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Sora', sans-serif", fontWeight: 600 }}>What we do</span>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 700, color: C.white, marginTop: 12, letterSpacing: "0.04em" }}>
            Tools that drive <span className="neon-breathe-inline">real impact</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {SERVICES.map((s, i) => <ServiceCard key={s.title} service={s} delay={i * 80} visible={visible} />)}
        </div>
      </div>
    </section>
  );
}

function WhyBrdg() {
  const [ref, visible] = useInView();
  return (
    <section id="why" ref={ref} style={{ padding: "100px 1.5rem", background: C.deep, position: "relative", borderTop: `1px solid ${C.border}` }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.neon}22, transparent)` }} />
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 60, alignItems: "center" }}>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.32, 1)" }}>
          <span style={{ color: C.neon, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Sora', sans-serif", fontWeight: 600 }}>Why BRDG</span>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: C.white, marginTop: 12, lineHeight: 1.3, letterSpacing: "0.03em" }}>
            The bridge between your <span className="neon-breathe-inline">data and the field</span>
          </h2>
          <p style={{ color: C.gray, fontSize: 15, lineHeight: 1.7, marginTop: 20, fontFamily: "'Sora', sans-serif" }}>
            Businesses collect mountains of data but struggle to turn it into operational truth. BRDG closes that gap — both through our own SaaS products and custom-built software that connects real-world data directly to your ground teams.
          </p>
          <p style={{ color: C.gray, fontSize: 15, lineHeight: 1.7, marginTop: 16, fontFamily: "'Sora', sans-serif" }}>
            No generic solutions. No compromises. Every line of code is designed to solve <span style={{ color: C.neon, fontWeight: 600 }}>your</span> problem.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(30px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.32, 1) 0.2s" }}>
          {[{ value: "100%", label: "Custom-built" }, { value: "24/7", label: "Dedicated support" }, { value: "10x", label: "Faster delivery" }].map((s) => (
            <div key={s.value} style={{ background: C.surface, border: `1px solid ${C.border}`, padding: "22px 28px", display: "flex", alignItems: "center", gap: 20, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: C.neon, boxShadow: `0 0 10px ${C.neonGlow}, 0 0 20px ${C.neon}22` }} />
              <span className="neon-breathe" style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 900, color: C.neon, minWidth: 80 }}>{s.value}</span>
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, color: C.grayLight, letterSpacing: "0.04em" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FleetPro() {
  const [ref, visible] = useInView();
  const features = [
    { icon: "▦", title: "Real-time Dashboard", desc: "KPIs, revenue forecasts, and fleet status at a glance." },
    { icon: "▥", title: "Controlled Equipment Allocation", desc: "Drag-and-drop assignment with approval workflows and full audit history." },
    { icon: "◈", title: "Financial Period Billing", desc: "Automated billing based on approved allocations and validated site presence. Aligned with financial periods and internal agreements." },
    { icon: "▤", title: "Approval & Validation Workflow", desc: "Structured request → plant approval → site confirmation. Every movement is logged and accountable." },
    { icon: "◎", title: "Audit & Governance", desc: "Full historical record of requests, approvals, transfers and financial impact. Built for multi-project environments and joint ventures." },
    { icon: "△", title: "Revenue Forecasting", desc: "Accurately forecast equipment revenue across projects and financial periods — based on approved, validated allocations." },
  ];
  return (
    <section id="fleetpro" ref={ref} style={{ padding: "100px 1.5rem", position: "relative", background: `linear-gradient(180deg, ${C.void} 0%, ${C.deep} 100%)`, borderTop: `1px solid ${C.border}` }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.neon}33, transparent)`, boxShadow: `0 0 15px ${C.neon}15` }} />
      <div style={{ maxWidth: 1000, margin: "0 auto", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.32, 1)" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ color: C.neon, fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'Sora', sans-serif", fontWeight: 600 }}>Our Products</span>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 700, color: C.white, marginTop: 12, letterSpacing: "0.04em", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <img src="/images/fleetpro-crane-icon.png" alt="" style={{ height: "40px", marginTop: "4px" }} />
            <span>FLEET <span className="neon-breathe-inline">PRO</span></span>
          </h2>
          <p style={{ color: C.gray, fontSize: 15, lineHeight: 1.7, maxWidth: 580, margin: "16px auto 0", fontFamily: "'Sora', sans-serif" }}>
            Enterprise equipment allocation & governance for construction. Track allocations. Control approvals. Validate transfers. Ensure financial transparency across every project.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
          {features.map((f, i) => <ServiceCard key={f.title} service={f} delay={i * 60 + 200} visible={visible} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a href="#start" style={{ color: C.neon, padding: "12px 28px", border: `1px solid ${C.neon}44`, fontSize: 12, fontWeight: 700, textDecoration: "none", fontFamily: "'Sora', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", transition: "all 0.3s" }}
            onMouseOver={(e) => { e.target.style.boxShadow = `0 0 20px ${C.neon}33`; e.target.style.borderColor = C.neon; }}
            onMouseOut={(e) => { e.target.style.boxShadow = "none"; e.target.style.borderColor = `${C.neon}44`; }}>
            Request a demo →
          </a>
        </div>
      </div>
    </section>
  );
}

function StartProject() {
  const [ref, visible] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://brdg-contact-form.legalljp.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", background: C.void, border: `1px solid ${C.border}`,
    color: C.white, fontSize: 14, fontFamily: "'Sora', sans-serif", letterSpacing: "0.02em",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.3s, box-shadow 0.3s",
  };

  return (
    <section id="start" ref={ref} style={{ padding: "100px 1.5rem 80px", background: `linear-gradient(180deg, ${C.deep} 0%, ${C.void} 100%)`, borderTop: `1px solid ${C.border}`, position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.neon}33, transparent)` }} />
      <div style={{ maxWidth: 600, margin: "0 auto", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.32, 1)" }}>
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, padding: "clamp(32px, 5vw, 56px)", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: `0 0 60px ${C.neon}08` }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 40, height: 1, background: C.neon, boxShadow: `0 0 10px ${C.neonGlow}` }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: 1, height: 40, background: C.neon, boxShadow: `0 0 10px ${C.neonGlow}` }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 40, height: 1, background: C.neon, boxShadow: `0 0 10px ${C.neonGlow}` }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: 1, height: 40, background: C.neon, boxShadow: `0 0 10px ${C.neonGlow}` }} />

          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", fontWeight: 700, color: C.white, margin: 0, letterSpacing: "0.04em" }}>
            Ready to build<br /><span className="neon-breathe-inline">the tool you're missing?</span>
          </h2>
          <p style={{ color: C.gray, fontSize: 14, lineHeight: 1.7, marginTop: 12, fontFamily: "'Sora', sans-serif" }}>
            Let's talk about your project. From idea to deployment, we've got you — every step of the way.
          </p>

          {status !== 'success' ? (
            <div style={{ marginTop: 32, textAlign: "left" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <input type="text" placeholder="Your name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = C.neon; e.target.style.boxShadow = `0 0 15px ${C.neon}22`; }}
                  onBlur={(e) => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }} />
                <input type="email" placeholder="Email address" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = C.neon; e.target.style.boxShadow = `0 0 15px ${C.neon}22`; }}
                  onBlur={(e) => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }} />
              </div>
              <textarea placeholder="Tell us about your project..." rows={4} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: "vertical", marginBottom: 20 }}
                onFocus={(e) => { e.target.style.borderColor = C.neon; e.target.style.boxShadow = `0 0 15px ${C.neon}22`; }}
                onBlur={(e) => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }} />
              {status === 'error' && (
                <p style={{ color: '#ff6b6b', fontSize: 13, fontFamily: "'Sora', sans-serif", marginBottom: 12, textAlign: 'center' }}>
                  Something went wrong. Please try again.
                </p>
              )}
              <button onClick={handleSubmit} disabled={status === 'sending'} style={{
                width: "100%", background: status === 'sending' ? '#4a5568' : `linear-gradient(135deg, #57E6E6 0%, #3FD0D4 100%)`,
                color: "#0B1120", padding: "14px 0", border: "none",
                fontSize: 13, fontWeight: 700, cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                fontFamily: "'Sora', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase",
                boxShadow: status === 'sending' ? 'none' : `0 0 15px rgba(87, 230, 230, 0.4), 0 0 40px rgba(87, 230, 230, 0.2), 0 0 80px rgba(63, 208, 212, 0.1)`,
                transition: "all 0.3s", borderRadius: 4, opacity: status === 'sending' ? 0.7 : 1,
              }}
                onMouseOver={(e) => { if (status !== 'sending') { e.target.style.boxShadow = `0 0 20px rgba(87, 230, 230, 0.6), 0 0 50px rgba(87, 230, 230, 0.3), 0 0 100px rgba(63, 208, 212, 0.15)`; e.target.style.transform = "translateY(-2px)"; } }}
                onMouseOut={(e) => { if (status !== 'sending') { e.target.style.boxShadow = `0 0 15px rgba(87, 230, 230, 0.4), 0 0 40px rgba(87, 230, 230, 0.2), 0 0 80px rgba(63, 208, 212, 0.1)`; e.target.style.transform = "translateY(0)"; } }}>
                {status === 'sending' ? 'Sending...' : 'Start a project →'}
              </button>
            </div>
          ) : (
            <div style={{ marginTop: 32, padding: 24, background: `${C.neon}08`, border: `1px solid ${C.neon}33` }}>
              <p className="neon-breathe" style={{ color: C.neon, fontSize: 15, fontWeight: 600, fontFamily: "'Sora', sans-serif", margin: 0, letterSpacing: "0.05em" }}>✓ TRANSMISSION RECEIVED</p>
              <p style={{ color: C.gray, fontSize: 13, fontFamily: "'Sora', sans-serif", marginTop: 8 }}>We'll be in touch shortly.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "40px 1.5rem", background: C.void, textAlign: "center", borderTop: `1px solid ${C.border}`, position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${C.neon}15, transparent)` }} />
      <p style={{ color: C.gray, fontSize: 12, fontFamily: "'Sora', sans-serif", margin: 0, letterSpacing: "0.08em" }}>
        © {new Date().getFullYear()} BRDG — BRIDGING REAL-WORLD DATA WITH GROUND OPERATIONS
      </p>
      <p style={{ color: C.gray, fontSize: 11, fontFamily: "'Sora', sans-serif", margin: "6px 0 0", opacity: 0.5, letterSpacing: "0.1em" }}>
        SYDNEY, AUSTRALIA
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ background: C.void, color: C.white, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
        body {
          background: #0B1120;
          overflow-x: hidden;
        }
        ::selection { background: #57E6E633; color: #E6EDF3; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0B1120; }
        ::-webkit-scrollbar-thumb { background: #1A2744; }
        ::-webkit-scrollbar-thumb:hover { background: #57E6E644; }

        @keyframes neonBreathe {
          0%, 100% { text-shadow: 0 0 20px rgba(87, 230, 230, 0.6), 0 0 40px rgba(63, 208, 212, 0.4); }
          50% { text-shadow: 0 0 10px rgba(87, 230, 230, 0.3), 0 0 20px rgba(63, 208, 212, 0.2); }
        }
        @keyframes heroGlow {
          0%, 100% {
            filter: drop-shadow(0 0 12px rgba(87, 230, 230, 0.4))
                    drop-shadow(0 0 30px rgba(87, 230, 230, 0.2))
                    drop-shadow(0 0 60px rgba(63, 208, 212, 0.1));
          }
          50% {
            filter: drop-shadow(0 0 18px rgba(87, 230, 230, 0.5))
                    drop-shadow(0 0 40px rgba(87, 230, 230, 0.3))
                    drop-shadow(0 0 80px rgba(63, 208, 212, 0.15));
          }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #57E6E6, 0 0 12px rgba(87, 230, 230, 0.6); }
          50% { opacity: 0.3; box-shadow: 0 0 2px rgba(87, 230, 230, 0.4); }
        }
        .neon-breathe { animation: neonBreathe 3s ease-in-out infinite; }
        .hero-title-glow { animation: heroGlow 4s ease-in-out infinite; }
        .neon-breathe-inline { color: #57E6E6; animation: neonBreathe 3s ease-in-out infinite; }
        .dot-pulse { animation: dotPulse 2s ease-in-out infinite; }

        #tsparticles {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          overflow: hidden !important;
        }
        #tsparticles canvas {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
        }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Mission />
      <Services />
      <WhyBrdg />
      <FleetPro />
      <StartProject />
      <Footer />
    </div>
  );
}
