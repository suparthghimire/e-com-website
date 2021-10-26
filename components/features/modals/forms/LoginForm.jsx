import { useState } from "react";
import Router from "next/router";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../config";
import Cookie from "js-cookie";
import ALink from "~/components/features/custom-link";
import { useForm } from "react-hook-form";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState({
    message: null,
  });

  const handle_login = async (data) => {
    toast.info("Logging You In. Please Wait", { autoClose: 1200 });
    try {
      const response = await fetch(`${BASE_URL}/token`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const tokens = await response.json();
      if (response.status === 400) {
        //validation error
        const error = new Error("Validation Error");
        error.status = 400;
        error.data = tokens;
        throw error;
      }
      if (response.status === 401) {
        //validation error
        const error = new Error("Invalid Token Error");
        error.status = 401;
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
      toast.success("Login Successful!", {
        autoClose: 1200,
      });
      setServerError({
        message: null,
      });
      Router.reload("/");
    } catch (error) {
      toast.error("Error", {
        autoClose: 1200,
      });
      console.error(error.data);
      console.error(error.message);
      setServerError({
        message: error.data,
      });
    } finally {
      document.querySelectorAll("input").forEach((ipt) => {
        ipt.value = "";
      });
    }
  };

  return (
    <div>
      {serverError.message && (
        <div className="alert alert-danger mb-2">
          Error: {serverError?.message.detail}
        </div>
      )}
      <form onSubmit={handleSubmit(handle_login)}>
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email", { required: true })}
            placeholder="Email Address *"
          />
          {errors.email && (
            <small className="error-msg">Email Cannot be Empty</small>
          )}
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            {...register("password", { required: true })}
            placeholder="Password *"
          />
          {errors.email && (
            <small className="error-msg">Password Cannot be Empty</small>
          )}
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
