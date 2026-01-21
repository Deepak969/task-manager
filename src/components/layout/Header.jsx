import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
    const navigate = useNavigate();
    const { currentUser, userData } = useAuth(); 
    console.log(userData);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    return (
        <header className="nxl-header">
            <div className="header-wrapper">
                <div className="header-left d-flex align-items-center gap-4">
                    <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-head-mobile-toggler" id="mobile-collapse">
                        <div className="hamburger hamburger--arrowturn">
                            <div className="hamburger-box">
                                <div className="hamburger-inner"></div>
                            </div>
                        </div>
                    </a>
                    <div className="nxl-navigation-toggle">
                        <a href="/#" onClick={(e) => e.preventDefault()} id="menu-mini-button">
                            <i className="feather-align-left"></i>
                        </a>
                        <a href="/#" onClick={(e) => e.preventDefault()} id="menu-expend-button" style={{ display: "none" }}
                        >
                            <i className="feather-arrow-right"></i>
                        </a>
                    </div>
                    <div className="nxl-lavel-mega-menu-toggle d-flex d-lg-none">
                        <a href="/#" onClick={(e) => e.preventDefault()} id="nxl-lavel-mega-menu-open">
                            <i className="feather-align-left"></i>
                        </a>
                    </div>
                </div>
                <div className="header-right ms-auto">
                    <div className="d-flex align-items-center">
                        <div className="dropdown nxl-h-item nxl-header-search">
                            <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-head-link me-0" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                                <i className="feather-search"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-search-dropdown">
                                <div className="input-group search-form">
                                    <span className="input-group-text">
                                        <i className="feather-search fs-6 text-muted"></i>
                                    </span>
                                    <input type="text" className="form-control search-input-field" placeholder="Search...." />
                                    <span className="input-group-text">
                                        <button type="button" className="btn-close"></button>
                                    </span>
                                </div>
                                <div className="dropdown-divider mt-0"></div>
                            </div>
                        </div>

                        <div className="nxl-h-item d-none d-sm-flex">
                            <div className="full-screen-switcher">
                                <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-head-link me-0" onclick="$('body').fullScreenHelper('toggle');">
                                    <i className="feather-maximize maximize"></i>
                                    <i className="feather-minimize minimize"></i>
                                </a>
                            </div>
                        </div>
                        <div className="nxl-h-item dark-light-theme">
                            <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-head-link me-0 dark-button">
                                <i className="feather-moon"></i>
                            </a>
                            <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-head-link me-0 light-button" style={{ display: "none" }}             >
                                <i className="feather-sun"></i>
                            </a>
                        </div>
                        <div className="dropdown nxl-h-item">
                            <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-head-link me-0" data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
                                <i className="feather-clock"></i>
                                <span className="badge bg-success nxl-h-badge">2</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-timesheets-menu">
                                <div className="d-flex justify-content-between align-items-center timesheets-head">
                                    <h6 className="fw-bold text-dark mb-0">Timesheets</h6>
                                    <a href="/#" onClick={(e) => e.preventDefault()} className="fs-11 text-success text-end ms-auto" data-bs-toggle="tooltip" title="Upcomming Timers">
                                        <i className="feather-clock"></i>
                                        <span>3 Upcomming</span>
                                    </a>
                                </div>
                                <div className="d-flex justify-content-between align-items-center flex-column timesheets-body">
                                    <i className="feather-clock fs-1 mb-4"></i>
                                    <p className="text-muted">No started timers found yes!</p>
                                    <a href="/#" onClick={(e) => e.preventDefault()} className="btn btn-sm btn-primary">Started Timer</a>
                                </div>
                                <div className="text-center timesheets-footer">
                                    <a href="/#" onClick={(e) => e.preventDefault()} className="fs-13 fw-semibold text-dark">Alls Timesheets</a>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown nxl-h-item">
                            <a className="nxl-head-link me-3" data-bs-toggle="dropdown" href="#" role="button" data-bs-auto-close="outside">
                                <i className="feather-bell"></i>
                                <span className="badge bg-danger nxl-h-badge">3</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-notifications-menu">
                                <div className="d-flex justify-content-between align-items-center notifications-head">
                                    <h6 className="fw-bold text-dark mb-0">Notifications</h6>
                                    <a href="/#" onClick={(e) => e.preventDefault()} className="fs-11 text-success text-end ms-auto" data-bs-toggle="tooltip" title="Make as Read">
                                        <i className="feather-check"></i>
                                        <span>Make as Read</span>
                                    </a>
                                </div>
                                <div className="notifications-item">
                                    <img src="assets/images/avatar/2.png" alt="" className="rounded me-3 border" />
                                    <div className="notifications-desc">
                                        <a href="/#" onClick={(e) => e.preventDefault()} className="font-body text-truncate-2-line"> <span className="fw-semibold text-dark">Malanie Hanvey</span> We should talk about that at lunch!</a>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="notifications-date text-muted border-bottom border-bottom-dashed">2 minutes ago</div>
                                            <div className="d-flex align-items-center float-end gap-2">
                                                <a href="/#" onClick={(e) => e.preventDefault()} className="d-block wd-8 ht-8 rounded-circle bg-gray-300" data-bs-toggle="tooltip" title="Make as Read"></a>
                                                <a href="/#" onClick={(e) => e.preventDefault()} className="text-danger" data-bs-toggle="tooltip" title="Remove">
                                                    <i className="feather-x fs-12"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="notifications-item">
                                    <img src="assets/images/avatar/3.png" alt="" className="rounded me-3 border" />
                                    <div className="notifications-desc">
                                        <a href="/#" onClick={(e) => e.preventDefault()} className="font-body text-truncate-2-line"> <span className="fw-semibold text-dark">Valentine Maton</span> You can download the latest invoices now.</a>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="notifications-date text-muted border-bottom border-bottom-dashed">36 minutes ago</div>
                                            <div className="d-flex align-items-center float-end gap-2">
                                                <a href="/#" onClick={(e) => e.preventDefault()} className="d-block wd-8 ht-8 rounded-circle bg-gray-300" data-bs-toggle="tooltip" title="Make as Read"></a>
                                                <a href="/#" onClick={(e) => e.preventDefault()} className="text-danger" data-bs-toggle="tooltip" title="Remove">
                                                    <i className="feather-x fs-12"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="notifications-item">
                                    <img src="assets/images/avatar/4.png" alt="" className="rounded me-3 border" />
                                    <div className="notifications-desc">
                                        <a href="/#" onClick={(e) => e.preventDefault()} className="font-body text-truncate-2-line"> <span className="fw-semibold text-dark">Archie Cantones</span> Don't forget to pickup Jeremy after school!</a>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="notifications-date text-muted border-bottom border-bottom-dashed">53 minutes ago</div>
                                            <div className="d-flex align-items-center float-end gap-2">
                                                <a href="/#" onClick={(e) => e.preventDefault()} className="d-block wd-8 ht-8 rounded-circle bg-gray-300" data-bs-toggle="tooltip" title="Make as Read"></a>
                                                <a href="/#" onClick={(e) => e.preventDefault()} className="text-danger" data-bs-toggle="tooltip" title="Remove">
                                                    <i className="feather-x fs-12"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center notifications-footer">
                                    <a href="/#" onClick={(e) => e.preventDefault()} className="fs-13 fw-semibold text-dark">Alls Notifications</a>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown nxl-h-item">
                            <a href="/#" onClick={(e) => e.preventDefault()} data-bs-toggle="dropdown" role="button" data-bs-auto-close="outside">
                                <img src="assets/images/avatar/1.png" alt="user-image" className="img-fluid user-avtar me-0" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-end nxl-h-dropdown nxl-user-dropdown">
                                <div className="dropdown-header">
                                    <div className="d-flex align-items-center">
                                        <img src="assets/images/avatar/1.png" alt="user-image" className="img-fluid user-avtar" />
                                        <div>
                                            <h6 className="text-dark mb-0">
                                                {userData?.name || "User"}
                                                <span className={`badge ms-1 ${userData?.role === "admin"
                                                    ? "bg-soft-danger text-danger"
                                                    : "bg-soft-primary text-primary"
                                                    }`}>
                                                    {userData?.role === "admin" ? "Admin" : "User"}
                                                </span>
                                            </h6>
                                            <span className="fs-12 fw-medium text-muted">
                                                {currentUser?.email}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="dropdown-item" onClick={handleLogout}>
                                    <i className="feather-log-out"></i>
                                    <span className="ms-2">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
