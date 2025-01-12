import { useState } from "react";
import { NavLink } from "react-router-dom";

interface IPage {
  name: string;
  path: string;
  isActive: boolean;
}

const routerPages = [
  { name: "Home", path: "/", isActive: true },
  { name: "Favorites", path: "/favorites", isActive: false },
];

const Nav = () => {
  const [pages, setPages] = useState<IPage[]>(routerPages);

  return (
    <section className="nav-wrap">
      {pages.map((page) => (
        <NavLink
          to={page.path}
          key={page.name}
          className={({ isActive }) =>
            isActive ? "nav-content active-nav-content" : "nav-content"
          }
        >
          {page.name}
        </NavLink>
      ))}
    </section>
  );
};

export default Nav;
