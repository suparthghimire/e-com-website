import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../config";
import Cookie from "js-cookie";
import { useForm } from "react-hook-form";
import { useState } from "react";
export default function ForgotPasswordForm() {
  const [serverError, setServerError] = useState(null);
  const [loadingSend, setLoadingSend] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handle_forgot_password = async (data) => {
    try {
      setLoadingSend(true);
      toast.info("Validating Your Email Address", { autoClose: 1200 });
      const response = await fetch(`${BASE_URL}/password_reset/`, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });
      const response_data = await response.json();
      if (response.status === 400) {
        //validation error
        const error = new Error("Validation Error");
        error.data = response_data;
        error.status = response.status;
        throw error;
      } else if (response.status !== 200) {
        const error = new Error("Unexpected Error Occured");
        error.data = { detail: ["Unexpected Error"] };
        error.status = response.status;
        throw error;
      }
      setServerError(null);
      toast.info("Password Reset Token Sent to Your Email Address", {
        autoClose: 5000,
      });
    } catch (error) {
      toast.error("Error", { autoClose: 1200 });
      let errors = [];
      Object.keys(error.data).forEach((key) => {
        error.data[key].forEach((item) => {
          errors.push(item);
        });
      });
      setServerError(errors);
    } finally {
      setLoadingSend(false);
      document.querySelectorAll("input").forEach((inp) => (inp.value = ""));
    }
  };
  return (
    <div>
      {serverError && (
        <div className="alert alert-danger mb-2">
          {serverError.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </div>
      )}
      <form onSubmit={handleSubmit(handle_forgot_password)}>
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email", { required: true })}
            placeholder="Email Address *"
          />
          {errors.email && (
            <small className="error-msg">Email is Required</small>
          )}
        </div>
        {loadingSend === false ? (
          <button className="btn btn-dark btn-block btn-rounded" type="submit">
            Send Password Reset Link
          </button>
        ) : (
          <button disabled={true} className="btn btn-warning btn-block">
            Loading
          </button>
        )}
      </form>
    </div>
  );
}
