import Navbar from "./Navbar";

function Layout({ children, navItems = [], activeNavKey, onNavSelect }) {
  return (
    <>
      <Navbar
        navItems={navItems}
        activeNavKey={activeNavKey}
        onNavSelect={onNavSelect}
      />
      <div className="container mt-4">
        {children}
      </div>
    </>
  );
}

export default Layout;
