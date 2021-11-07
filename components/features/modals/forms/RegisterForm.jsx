import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../config";
import { useForm } from "react-hook-form";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverErrors, setServerErrors] = useState(null);

  const handle_register = async (user) => {
    toast.info("Registering You. Please Wait...", {
      autoClose: 1200,
    });
    user.wholesaler = false;
    try {
      const response = await fetch(`${BASE_URL}/register/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const response_user = await response.json();
      console.log("user:", response_user);
      if (response.status == 400) {
        // Validation Error
        const error = new Error("Validation Error");
        error.status = 400;
        error.data = response_user;
        throw error;
      } else if (response.status !== 201) {
        const error = new Error("Unexpected Error");
        error.status = response.status;
        error.data = {
          message: ["Unexpected Error Occured"],
        };
        throw error;
      }
      toast.success("Registered Successfully!", { autoClose: 1200 });
      const register_response = await fetch(`${BASE_URL}/token`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: user.email, password: user.password }),
      });
      const tokens = await register_response.json();
      if (register_response.status === 400) {
        //validation error
        const error = new Error("Validation Error");
        error.status = 400;
        error.data = tokens;
        throw error;
      }
      if (register_response.status === 401) {
        //validation error
        const error = new Error("Invalid Token Error");
        error.status = 401;
        error.data = tokens;
        throw error;
      } else if (register_response.status !== 200) {
        const error = new Error("Unexpected Error");
        error.status = register_response.status;
        error.data = { detail: "Unexpected Error Occured" };
        throw error;
      }
      if (!tokens) {
        // undefined error
        const error = new Error("Token Not Found Error");
        error.status = register_response.status;
        error.data = { detail: "Failed to Grab Tokens" };
        throw error;
      }
      Cookie.set("rameti_ec_access", tokens.access);
      Cookie.set("rameti_ec_refresh", tokens.refresh);
      toast.success("Login Successful!", {
        autoClose: 1200,
      });
      setServerErrors(null);

      router.push("/");
    } catch (error) {
      toast.error("Error While Registering!", { autoClose: 1200 });
      console.error(error, error.data);
      let errors = [];
      Object.keys(error.data).forEach((key) => {
        error.data[key].forEach((error) => {
          errors.push(error);
        });
      });
      setServerErrors(errors);
    } finally {
      document.querySelectorAll("input").forEach((item) => (item.value = ""));
      document
        .querySelectorAll("input[type='checkbox']")
        .forEach((item) => (item.checked = false));
    }
  };
  return (
    <div>
      {serverErrors && (
        <div className="alert alert-danger mb-2">
          Errors:
          {serverErrors.map((err) => (
            <li>{err}</li>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit(handle_register)}>
        <div className="form-group">
          <label htmlFor="singin-name">Your Full Name:</label>
          <input
            type="text"
            className="form-control"
            id="full_name"
            {...register("full_name", { required: true })}
            placeholder="Your Full Name *"
          />
          {errors.full_name && (
            <small className="error-msg">Full Name is Required</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="singin-email">Your email address:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email", { required: true })}
            placeholder="Your Email address *"
          />
          {errors.email && (
            <small className="error-msg">Email is Required</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="singin-password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password", { required: true })}
            placeholder="Password *"
          />
          {errors.email && (
            <small className="error-msg">Password is Required</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="singin-phone">Your Phone Number:</label>
          <input
            type="number"
            className="form-control"
            id="phone_number"
            {...register("phone_number", { required: true })}
            placeholder="Your Phone Number *"
          />
          {errors.phone_number && (
            <small className="error-msg">Phone Number is Required</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="singin-gender">Your Gender:</label>
          <select
            className="form-control"
            id="gender"
            {...register("gender", { required: true })}
          >
            <option value="M"> Male </option>
            <option value="F"> Female </option>
          </select>
          {errors.gender && (
            <small className="error-msg">Gender is Required</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="singin-state">State:</label>
          <select
            {...register("state", { required: true })}
            className="form-control"
            id="state"
          >
            <option value="province-1">Province 1</option>
            <option value="bagmati">Bagmati</option>
            <option value="gandaki">Gandaki</option>
            <option value="lumbini">Lumbini</option>
            <option value="karnali">Karnali</option>
            <option value="sudurpashchim">Sudurpashchim</option>
          </select>
          {errors.state && (
            <small className="error-msg">State is Required</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="singin-district">District:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Your District *"
            {...register("district", {
              required: true,
            })}
            id="district"
          />
          {errors.district && (
            <small className="error-msg">District is Required</small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="singin-city">City:</label>
          <input
            type="text"
            className="form-control"
            placeholder="City *"
            name="city"
            {...register("city", { required: true })}
            id="city"
          />
          {errors.city && <small className="error-msg">City is Required</small>}
        </div>
        <div className="form-group">
          <label htmlFor="singin-city">Address:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Address *"
            {...register("address", {
              required: true,
            })}
            id="address"
          />
          {errors.address && (
            <small className="error-msg">Address is Required</small>
          )}
        </div>
        <button className="btn btn-dark btn-block btn-rounded" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
