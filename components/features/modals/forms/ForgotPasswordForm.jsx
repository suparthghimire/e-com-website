import { useState } from "react";
import Router, { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../config";
import Cookie from "js-cookie";
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const handle_forgot_password = () => {};
  return (
    <div>
      <form onSubmit={handle_forgot_password}>
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            id="forgotpassword-email"
            name="forgotpassword-email"
            placeholder="Email Address *"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn btn-dark btn-block btn-rounded" type="submit">
          Send Password Reset Link
        </button>
      </form>
    </div>
  );
}
