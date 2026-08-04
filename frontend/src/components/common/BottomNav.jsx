import { NavLink } from "react-router-dom";
import { HomeIcon, ShieldIcon, BellIcon, UserIcon } from "./Icons";

const TABS = [
  { to: "/", label: "Home", icon: HomeIcon, end: true },
  { to: "/safety", label: "Safety", icon: ShieldIcon },
  { to: "/alerts", label: "Alerts", icon: BellIcon },
  { to: "/profile", label: "Profile", icon: UserIcon },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? "is-active" : ""}`
          }
        >
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
