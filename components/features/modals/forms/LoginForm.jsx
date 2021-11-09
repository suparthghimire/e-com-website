import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../config";
import { LOGIN } from "~/api/queries";
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
  const router = useRouter();
  const handle_login = async (data) => {
    toast.info("Logging You In. Please Wait", { autoClose: 1200 });
    try {
      const [tokens, error] = await LOGIN(data);
      if (!tokens) throw error;
      toast.success("Login Successful!", {
        autoClose: 1200,
      });
      setServerError({
        message: null,
      });
      router.push("/");
    } catch (error) {
      toast.error("Error", {
        autoClose: 1200,
      });
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
          <ALink href="/pages/forgot-password" className="lost-link">
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
