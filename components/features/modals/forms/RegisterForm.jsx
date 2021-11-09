import { useState } from "react";
import { toast } from "react-toastify";
import { LOGIN, REGISTER } from "~/api/queries";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverErrors, setServerErrors] = useState({
    type: null,
    errors: null,
  });

  const handle_register = async (user) => {
    toast.info("Registering You. Please Wait...", {
      autoClose: 1200,
    });
    user.wholesaler = false;
    try {
      const [reg_user, reg_error] = await REGISTER(user);
      if (!reg_user) {
        throw { type: "reg", data: reg_error };
      }
      toast.success("Registered Successfully!", { autoClose: 1200 });
      const [tokens, login_error] = await LOGIN({
        email: user.email,
        password: user.password,
      });
      if (!tokens) throw { type: "login", data: login_error };
      toast.success("Login Successful!", { autoClose: 1200 });
      router.push("/");
      setServerErrors(null);
    } catch (error) {
      if (error.type === "reg") {
        let errors = [];
        Object.keys(error.data.data).forEach((err) => {
          error.data.data[err].forEach((item) => errors.push(item));
        });
        setServerErrors({ type: "reg", errors });
      } else if (error.type === "login") {
        setServerErrors({ type: "login", errors: error.data.data });
      }
    }
  };
  return (
    <div>
      {serverErrors && serverErrors.type === "reg" ? (
        <div className="alert alert-danger mb-2">
          Errors:
          {serverErrors.errors.map((err) => (
            <li>{err}</li>
          ))}
        </div>
      ) : serverErrors && serverErrors.type === "login" ? (
        <div className="alert alert-danger mb-2">
          Error: {serverError?.message.detail}
        </div>
      ) : (
        ""
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
            {...register("phone_number", {
              required: true,
              validate: (phone) => {
                if (isNaN(phone)) return false;
                if (phone.length === 10) return phone[0] == 9;
                else if (phone.length === 8) return phone[0] == 0;
                return false;
              },
            })}
            placeholder="Your Phone Number *"
          />
          {errors.phone_number ? (
            errors.phone_number.type === "validate" ? (
              <small className="error-msg">Phone Number Format Invalid</small>
            ) : (
              <small className="error-msg">Phone Number is Required</small>
            )
          ) : (
            ""
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
