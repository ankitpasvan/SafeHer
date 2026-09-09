import { NavLink } from "react-router-dom";
import { BellIcon, HomeIcon, MapPinIcon, UserIcon, UsersIcon } from "./Icons";

const TABS = [
  { to: "/", label: "Home", icon: HomeIcon, end: true },
  { to: "/explore", label: "Map", icon: MapPinIcon },
  { to: "/profile", label: "Circle", icon: UsersIcon },
  { to: "/alerts", label: "Alerts", icon: BellIcon },
  { to: "/safety", label: "Profile", icon: UserIcon },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {TABS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `bottom-nav__item ${isActive ? "is-active" : ""}`}
        >
          <span className="bottom-nav__pill">
            <Icon />
            <span>{label}</span>
          </span>
        </NavLink>
      ))}
    </nav>
  );
}
