import { useNavigate, useLocation } from "react-router-dom";

export default function SlideQuickSwitcher({ currentSlide }) {
  const navigate = useNavigate();
  const location = useLocation();

  const slides = [
    { num: 1, label: "Slide 1: Split Auth", path: "/login" },
    { num: 2, label: "Slide 2: Dashboard", path: "/dashboard" },
    { num: 3, label: "Slide 3: Live Tracking", path: "/tracking" },
    { num: 4, label: "Slide 4: Panic Flow", path: "/flow" },
    { num: 5, label: "Slide 5: Contacts", path: "/contacts" },
    { num: 6, label: "Slide 6: Safety Score", path: "/safety-score" },
    { num: 7, label: "Slide 7: Recent Alerts", path: "/alerts" },
    { num: 8, label: "Slide 8: Safe Zones", path: "/safe-zones" },
    { num: 9, label: "Slide 9: Tips & Tools", path: "/tips" },
  ];

  return (
    <div className="slide-quick-switcher" aria-label="Slide Selector Navigation">
      <div className="slide-switcher-label">
        <span className="slide-switcher-dot" />
        <span className="slide-switcher-text">Suite Navigator:</span>
      </div>

      <div className="slide-pill-scroller">
        {slides.map((s) => {
          const isActive = currentSlide === s.num;
          return (
            <button
              key={s.num}
              type="button"
              className={`slide-nav-pill ${isActive ? "is-active" : ""}`}
              onClick={() => navigate(s.path)}
              title={`Switch to ${s.label}`}
            >
              Slide {s.num}
            </button>
          );
        })}
      </div>
    </div>
  );
}
