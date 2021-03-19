import { Link } from "react-router-dom";

interface Page{
    label: string;
    link: string;
}

const pages: Page[] = [
  {
    label: "System Data",
    link: "/",
  },
  {
    label: "System Diagnostics Manager",
    link: "/diagnostics",
  },
  {
    label: "System State",
    link: "/state",
  },
];

function Navbar() {
  return (
    <div
      style={{
        width: "100%",
        background: "#0D56FE",
        height: "3rem",
        color: "white",

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {pages.map((page) => (
        <Link to={page.link} key={page.label}>
          <div style={{ padding: "8px" }}> {page.label}</div>
        </Link>
      ))}
    </div>
  );
}

export default Navbar;
