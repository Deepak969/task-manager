import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔐 Login logic (API / Firebase / Backend)
    console.log({
      email,
      password,
      rememberMe,
    });
  };

  return (
    <main className="auth-minimal-wrapper">
      <div className="auth-minimal-inner">
        <div className="minimal-card-wrapper">
          <div className="card mb-4 mt-5 mx-4 mx-sm-0 position-relative"> 
            <div className="card-body p-sm-5">
              <h2 className="fs-20 fw-bolder mb-4 text-center">Login</h2>              
              <form onSubmit={handleSubmit} className="w-100 mt-4 pt-2">
                <div className="mb-4">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email or Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label
                      className="custom-control-label c-pointer"
                      htmlFor="rememberMe"
                    >
                      Remember Me
                    </label>
                  </div>

                  <a href="/forgot-password" className="fs-11 text-primary">
                    Forget password?
                  </a>
                </div>

                <div className="mt-5">
                  <button type="submit" className="btn btn-lg btn-primary w-100">
                    Login
                  </button>
                </div>
              </form>

              {/* <div className="w-100 mt-5 text-center mx-auto">
                <div className="mb-4 border-bottom position-relative">
                  <span className="small py-1 px-3 text-uppercase text-muted bg-white position-absolute translate-middle">
                    or
                  </span>
                </div>

                <div className="d-flex align-items-center justify-content-center gap-2">
                  <button className="btn btn-light-brand flex-fill" title="Facebook">
                    <i className="feather-facebook"></i>
                  </button>
                  <button className="btn btn-light-brand flex-fill" title="Twitter">
                    <i className="feather-twitter"></i>
                  </button>
                  <button className="btn btn-light-brand flex-fill" title="Github">
                    <i className="feather-github"></i>
                  </button>
                </div>
              </div>

              <div className="mt-5 text-muted">
                <span> Don't have an account? </span>
                <a href="/register" className="fw-bold">
                  Create an Account
                </a>
              </div> */}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
