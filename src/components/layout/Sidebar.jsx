import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {

    const navigate = useNavigate();
     const { role } = useAuth();

    return (
        <nav className="nxl-navigation">
            <div className="navbar-wrapper">
                <div className="m-header">
                    <a href="/#" className="b-brand">
                        <h4 className="logo logo-lg" >Task Management</h4>
                         <h4 className="logo logo-sm" >Task Management</h4>
                    </a>
                </div>
                <div className="navbar-content">
                    <ul className="nxl-navbar">
                        <li className="nxl-item nxl-caption">
                            <label>Navigation</label>
                        </li>
                        <li className="nxl-item nxl-hasmenu">
                            <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-link">
                                <span className="nxl-micon"><i className="feather-airplay"></i></span>
                                <span className="nxl-mtext">Dashboards</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                            </a>
                            <ul className="nxl-submenu">
                                <li className="nxl-item"><a className="nxl-link" href="index.html">CRM</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="analytics.html">Analytics</a></li>
                            </ul>
                        </li>
                         {role === "admin" && (
                            <>
                        <li className="nxl-item nxl-hasmenu">
                            <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-link">
                                <span className="nxl-micon"><i className="feather-cast"></i></span>
                                <span className="nxl-mtext">Reports</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                            </a>
                            <ul className="nxl-submenu">
                                <li className="nxl-item"><a className="nxl-link" href="reports-sales.html">Sales Report</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="reports-leads.html">Leads Report</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="reports-project.html">Project Report</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="reports-timesheets.html">Timesheets Report</a></li>
                            </ul>
                        </li>
                        <li className="nxl-item nxl-hasmenu">
                            <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-link">
                                <span className="nxl-micon"><i className="feather-send"></i></span>
                                <span className="nxl-mtext">Applications</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                            </a>
                            <ul className="nxl-submenu">
                                <li className="nxl-item"><a className="nxl-link" href="apps-chat.html">Chat</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="apps-email.html">Email</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="apps-tasks.html">Tasks</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="apps-notes.html">Notes</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="apps-storage.html">Storage</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="apps-calendar.html">Calendar</a></li>
                            </ul>
                        </li>
                        <li className="nxl-item nxl-hasmenu">
                            <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-link">
                                <span className="nxl-micon"><i className="feather-at-sign"></i></span>
                                <span className="nxl-mtext">Proposal</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                            </a>
                            <ul className="nxl-submenu">
                                <li className="nxl-item"><a className="nxl-link" href="proposal.html">Proposal</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="proposal-view.html">Proposal View</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="proposal-edit.html">Proposal Edit</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="proposal-create.html">Proposal Create</a></li>
                            </ul>
                        </li>
                        <li className="nxl-item nxl-hasmenu">
                            <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-link">
                                <span className="nxl-micon"><i className="feather-dollar-sign"></i></span>
                                <span className="nxl-mtext">Payment</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                            </a>
                            <ul className="nxl-submenu">
                                <li className="nxl-item"><a className="nxl-link" href="payment.html">Payment</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="invoice-view.html">Invoice View</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="invoice-create.html">Invoice Create</a></li>
                            </ul>
                        </li>
                        <li className="nxl-item nxl-hasmenu">
                            <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-link">
                                <span className="nxl-micon"><i className="feather-users"></i></span>
                                <span className="nxl-mtext">Customers</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                            </a>
                            <ul className="nxl-submenu">
                                <li className="nxl-item"><a className="nxl-link" href="customers.html">Customers</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="customers-view.html">Customers View</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="customers-create.html">Customers Create</a></li>
                            </ul>
                        </li>
                        <li className="nxl-item nxl-hasmenu">
                            <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-link">
                                <span className="nxl-micon"><i className="feather-alert-circle"></i></span>
                                <span className="nxl-mtext">Leads</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                            </a>
                            <ul className="nxl-submenu">
                                <li className="nxl-item"><a className="nxl-link" href="leads.html">Leads</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="leads-view.html">Leads View</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="leads-create.html">Leads Create</a></li>
                            </ul>
                        </li>
                        <li className="nxl-item nxl-hasmenu">
                            <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-link">
                                <span className="nxl-micon"><i className="feather-briefcase"></i></span>
                                <span className="nxl-mtext">Projects</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                            </a>
                            <ul className="nxl-submenu">
                                <li className="nxl-item"><a className="nxl-link" href="projects.html">Projects</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="projects-view.html">Projects View</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="projects-create.html">Projects Create</a></li>
                            </ul>
                        </li>
                        <li className="nxl-item nxl-hasmenu">
                            <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-link">
                                <span className="nxl-micon"><i className="feather-layout"></i></span>
                                <span className="nxl-mtext">Widgets</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                            </a>
                            <ul className="nxl-submenu">
                                <li className="nxl-item"><a className="nxl-link" href="widgets-lists.html">Lists</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="widgets-tables.html">Tables</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="widgets-charts.html">Charts</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="widgets-statistics.html">Statistics</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="widgets-miscellaneous.html">Miscellaneous</a></li>
                            </ul>
                        </li>
                        <li className="nxl-item nxl-hasmenu">
                            <a href="/#" onClick={(e) => e.preventDefault()} className="nxl-link">
                                <span className="nxl-micon"><i className="feather-settings"></i></span>
                                <span className="nxl-mtext">Settings</span><span className="nxl-arrow"><i className="feather-chevron-right"></i></span>
                            </a>
                            <ul className="nxl-submenu">
                                <li className="nxl-item"><a className="nxl-link" href="settings-general.html">General</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="settings-seo.html">SEO</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="settings-tags.html">Tags</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="settings-email.html">Email</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="settings-tasks.html">Tasks</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="settings-leads.html">Leads</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="settings-support.html">Support</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="settings-finance.html">Finance</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="settings-gateways.html">Gateways</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="settings-customers.html">Customers</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="settings-localization.html">Localization</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="settings-recaptcha.html">reCAPTCHA</a></li>
                                <li className="nxl-item"><a className="nxl-link" href="settings-miscellaneous.html">Miscellaneous</a></li>
                            </ul>
                        </li>   
                        </>
                         )}
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Sidebar;
