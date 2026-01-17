const Footer = () => {
  return (
    <footer className="footer">
      <p className="fs-11 text-muted fw-medium text-uppercase mb-0">
        © {new Date().getFullYear()} Task Management
      </p>     
    </footer>
  );
};

export default Footer;
