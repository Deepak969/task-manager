import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();

    return (
        <header class="nxl-header">
            <div class="header-wrapper">
                <div class="header-left d-flex align-items-center gap-4">
                    <a href="/#" role="button" onClick={(e) => e.preventDefault()} className="nxl-head-mobile-toggler"
                        id="mobile-collapse">
                        <div class="hamburger hamburger--arrowturn">
                            <div class="hamburger-box">
                                <div class="hamburger-inner"></div>
                            </div>
                        </div>
                    </a>
                    <div class="nxl-navigation-toggle">
                        <a href="/#" role="button" onClick={(e) => e.preventDefault()} id="menu-mini-button">
                            <i class="feather-align-left"></i>
                        </a>
                        <a href="/#" role="button" onClick={(e) => e.preventDefault()} id="menu-expend-button" style={{ display: "none" }}>
                            <i class="feather-arrow-right"></i>
                        </a>
                    </div>
                    <div class="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                       <a href="/#" role="button" onClick={(e) => e.preventDefault()} id="nxl-lavel-mega-menu-open">
                            <i class="feather-align-left"></i>
                        </a>
                    </div>
                    <div class="nxl-drp-link nxl-lavel-mega-menu">
                        <div class="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                            <a href="/#" role="button" onClick={(e) => e.preventDefault()} id="nxl-lavel-mega-menu-hide">
                                <i class="feather-arrow-left me-2"></i>
                                <span>Back</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="header-right ms-auto">
                    <div class="d-flex align-items-center">
                        <div class="dropdown nxl-h-item">
                            <a href="/#" role="button" onClick={(e) => e.preventDefault()} data-bs-toggle="dropdown"  data-bs-auto-close="outside">
                                <img src="assets/images/avatar/1.png" alt="user-image" class="img-fluid user-avtar me-0" />
                            </a>
                            <div class="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
                                <div class="dropdown-header">
                                    <div class="d-flex align-items-center">
                                        <img src="assets/images/avatar/1.png" alt="user-image" class="img-fluid user-avtar" />
                                        <div>
                                            <h6 class="text-dark mb-0">Alexandra Della <span class="badge bg-soft-success text-success ms-1">PRO</span></h6>
                                            <span class="fs-12 fw-medium text-muted">alex@example.com</span>
                                        </div>
                                    </div>
                                </div>
                                <a  onClick={() => navigate("/login")} class="dropdown-item">
                                    <i class="feather-log-out"></i>
                                    <span>Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
