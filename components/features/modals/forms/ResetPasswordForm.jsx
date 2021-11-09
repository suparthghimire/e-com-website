import router, { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../config";
import Cookie from "js-cookie";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
export default function ForgotPasswordForm(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState(null);
  const new_password = useRef({});
  new_password.current = watch("new_password", "");

  const handle_reset_password = async (data) => {
    const submit_data = {
      password: data.new_password,
      token: props.token,
    };
    try {
      const response = await fetch(`${BASE_URL}/password_reset/confirm/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(submit_data),
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
      toast.success("Password Changed Successfully!", { autoClose: 1200 });
      router.push("/pages/login");
    } catch (error) {
      let errors = [];
      Object.keys(error.data).forEach((key) => {
        error.data[key].forEach((item) => {
          errors.push(item);
        });
      });
      toast.error("Looks Like Token has Exipred. Try Again", {
        autoClose: 1200,
      });
      setServerError(errors);
    } finally {
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
      <form onSubmit={handleSubmit(handle_reset_password)}>
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="New Password *"
            {...register("new_password", {
              required: "New Password is Required",
              minLength: {
                value: 5,
                message: "Password Must be Atleast 5 Characters Long",
              },
            })}
            id="new_password"
          />
          {errors.new_password && (
            <small className="error-msg">{errors.new_password.message}</small>
          )}
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Re Enter New Password *"
            {...register("re_new_password", {
              validate: (value) =>
                value === new_password.current || "Passwords Donot Match",
            })}
            id="re_new_password"
          />
          {errors.re_new_password && (
            <small className="error-msg">
              {errors.re_new_password.message}
            </small>
          )}
        </div>

        <button className="btn btn-dark btn-block btn-rounded" type="submit">
          Change Password
        </button>
      </form>
    </div>
  );
}
