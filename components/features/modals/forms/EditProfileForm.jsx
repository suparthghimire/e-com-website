import Cookies from "js-cookie";
import { useState } from "react";
import { BASE_URL } from "../../../../config";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
export default function EditProfileForm({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverErrors, setServerErrors] = useState(null);

  const handle_edit = async (data) => {
    const formUser = {
      address: data.address,
      city: data.city,
      district: data.district,
      full_name: data.fullname,
      gender: data.gender,
      phone_number: data.phone,
      state: data.state,
    };
    toast.info("Saving Changes", {
      autoClose: 2000,
    });
    try {
      const response = await fetch(`${BASE_URL}/me/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Cookies.get("rameti_ec_access")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(formUser),
      });
      const data = await response.json();
      if (response.status === 400) {
        //validation error
        const error = new Error("Validation Error");
        error.status = 400;
        error.data = data;
        throw error;
      } else if (response.status !== 200) {
        const error = new Error("Unexpected Error");
        error.status = response.status;
        error.data = {
          message: ["Unexpected Error Occured"],
        };
        throw error;
      }
      toast.success("Changes Saved Successfully!", {
        autoClose: 1200,
      });
      toast.info("Reload to See the Changes", {
        autoClose: 1200,
      });
    } catch (error) {
      toast.error("Error While Saving Changes!", {
        autoClose: 1200,
      });
      let errors = [];
      Object.keys(error.data).forEach((key) => {
        error.data[key].forEach((error) => {
          errors.push(error);
        });
      });
      setServerErrors(errors);
    }
  };
  return (
    <div>
      <h3>Account Details</h3>
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
      <form onSubmit={handleSubmit(handle_edit)}>
        <div className="row">
          <div className="col-12">
            <div className="form-group mb-3">
              <label htmlFor="fullname">Full Name*</label>
              <input
                type="text"
                className="form-control"
                placeholder="Full Name *"
                {...register("fullname", {
                  required: true,
                  value: user.full_name,
                })}
                id="fullname"
              />
              {errors.fullname && (
                <small className="error-msg">Full Name is Required</small>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group mb-3">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="number"
                className="form-control"
                placeholder="Phone Number *"
                {...register("phone", {
                  required: true,
                  value: user.phone_number,
                  validate: (phone_no) => {
                    if (isNaN(phone_no)) return false;
                    if (phone_no.length === 10) return phone_no[0] == 9;
                    else if (phone_no.length === 8) return phone_no[0] == 0;
                    return false;
                  },
                })}
                id="phone"
              />
              {errors.phone ? (
                errors.phone.type === "validate" ? (
                  <small className="error-msg">
                    Phone Number Format Invalid
                  </small>
                ) : (
                  <small className="error-msg">Phone Number is Required</small>
                )
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="form-group mb-3">
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Address *"
                {...register("address", {
                  required: true,
                  value: user.address,
                })}
                id="address"
              />
              {errors.address && (
                <small className="error-msg">Address is Required</small>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group mb-3">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                className="form-control"
                placeholder="City *"
                name="city"
                {...register("city", { required: true, value: user.city })}
                id="city"
              />
              {errors.city && (
                <small className="error-msg">City is Required</small>
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="form-group mb-3">
              <label htmlFor="gender">Gender *</label>
              <select
                className="form-control"
                {...register("gender", { required: true, value: user.gender })}
                id="gender"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              {errors.gender && (
                <small className="error-msg">Gender is Required</small>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group mb-3">
              <label htmlFor="state">State *</label>
              <select
                {...register("state", { required: true, value: user.state })}
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
          </div>
          <div className="col-6">
            <div className="form-group mb-3">
              <label htmlFor="Edit District">District *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your District *"
                {...register("district", {
                  required: true,
                  value: user.district,
                })}
                id="district"
              />
              {errors.district && (
                <small className="error-msg">District is Required</small>
              )}
            </div>
          </div>
          <button
            className="btn btn-dark background-primary border-primary btn-block btn-rounded"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
