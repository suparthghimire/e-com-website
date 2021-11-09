import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../config";
import Cookie from "js-cookie";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [serverErrors, setServerErrors] = useState(null);
  const new_password = useRef({});
  new_password.current = watch("new_password", "");

  const handle_change_pwd = async (data) => {
    const body = {
      old_password: data.old_password,
      new_password: data.new_password,
    };
    toast.info("Changing your Password", {
      autoClose: 1200,
    });
    try {
      const access = Cookie.get("rameti_ec_access");
      const response = await fetch(`${BASE_URL}/changepassword/`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.status == 400) {
        //validation error
        const error = new Error("Validation Error");
        error.status = 400;
        error.data = data;
        throw error;
      } else if (response.status !== 200) {
        const error = new Error("Unexpected Error");
        error.status = 400;
        error.data = { message: ["Unexpected Error Occured"] };
        throw error;
      }
      toast.success("Password Changed Successfully!", {
        autoClose: 1200,
      });
      setServerErrors(null);
    } catch (error) {
      toast.error("Error. Passwords Reverted", {
        autoClose: 1200,
      });
      let errors = [];
      Object.keys(error.data).forEach((key) => {
        if (!Array.isArray(error.data[key]))
          error.data[key] = [error.data[key]];
        error.data[key].forEach((error) => {
          errors.push(error);
        });
      });
      setServerErrors(errors);
    } finally {
      document.querySelectorAll("input").forEach((input) => (input.value = ""));
    }
  };

  return (
    <div>
      <h3>Change Your Password</h3>
      <hr />
      <div className="row">
        <div className="col-6">
          {serverErrors && (
            <div className="alert alert-danger mb-2">
              Errors:
              {serverErrors.map((err) => (
                <li>{err}</li>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="ro">
        <div className="col-6">
          <hr />
        </div>
      </div>
      <form onSubmit={handleSubmit(handle_change_pwd)}>
        <div className="row">
          <div className="col-6">
            <div className="form-group mb-3">
              <label htmlFor="phone">Old Password *</label>
              <input
                type="password"
                className="form-control"
                placeholder="Old Password *"
                name="old_password"
                {...register("old_password", {
                  required: "Old Password is Required",
                })}
                id="old_password"
              />
              {errors.old_password && (
                <small className="error-msg">
                  {errors.old_password.message}
                </small>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group mb-3">
              <label htmlFor="address">New Password</label>
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
                <small className="error-msg">
                  {errors.new_password.message}
                </small>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group mb-3">
              <label htmlFor="address">Re Enter New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="New Password *"
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
          </div>
          <div className="row">
            <div className="col-6">
              <button
                className="btn btn-dark background-primary border-primary btn-block btn-rounded"
                type="submit"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
