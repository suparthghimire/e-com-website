import { useState } from "react";
import Router from "next/router";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../config";
import Cookie from "js-cookie";
import ALink from "~/components/features/custom-link";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handle_login = async (e) => {
    e.preventDefault();
    toast.info("Logging You In. Please Wait", { autoClose: 1200 });
    console.log(credentials);
    try {
      const response = await fetch(`${BASE_URL}/token`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const tokens = await response.json();
      if (response.status === 400) {
        //validation error
        const error = new Error("Validation Error");
        error.status = 400;
        error.data = tokens;
        throw error;
      }
      if (!tokens) {
        // undefined error
        const error = new Error("Undefined Error");
        error.status = 500;
        error.data = "Undefined Token";
        throw error;
      }
      console.log("Tokens: ", tokens);
      Cookie.set("rameti_ec_access", tokens.access);
      Cookie.set("rameti_ec_refresh", tokens.refresh);

      toast.success("Login Successful!");
      Router.reload("/");
    } catch (error) {
      toast.error("Error");
      console.error(error.data);
      console.error(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handle_login}>
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            id="singin-email"
            name="singin-email"
            placeholder="Email Address *"
            required
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="singin-password"
            placeholder="Password *"
            name="singin-password"
            required
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        <div className="form-footer">
          <ALink href="#" className="lost-link">
            Lost your password?
          </ALink>
        </div>
        <button className="btn btn-dark btn-block btn-rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
