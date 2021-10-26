import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../../../config";
import { toast } from "react-toastify";
import { useRouter, userouter } from "next/router";
export default function EditProfileForm({ user }) {
  const [formUser, setFormUser] = useState({
    full_name: user.full_name,
    phone_number: user.phone_number,
    address: user.address,
    city: user.city,
    district: user.district,
    gender: user.gender,
    state: user.state,
  });
  const router = useRouter();
  const handle_edit = async (e) => {
    e.preventDefault();
    try {
      toast.info("Saving Changes", {
        autoClose: 2000,
      });
      const response = await fetch(`${BASE_URL}/me/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${Cookies.get("rameti_ec_access")}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(formUser),
      });
      const data = await response.json();
      console.log(data);
      toast.success("Changes Saved Successfully!", {
        autoClose: 2000,
      });
      router.push("/");
    } catch (error) {
      toast.error("Error While Saving Changes!", {
        autoClose: 1200,
      });
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handle_edit}>
        <div className="row">
          <div className="col-12">
            <div className="form-group mb-3">
              <label htmlFor="edit-fullname">Full Name*</label>
              <input
                type="text"
                className="form-control"
                placeholder="Full Name *"
                name="edit-fullname"
                id="edit-fullname"
                value={formUser.full_name}
                onChange={(e) =>
                  setFormUser({ ...formUser, full_name: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group mb-3">
              <label htmlFor="edit-phone">Phone Number *</label>
              <input
                type="number"
                className="form-control"
                placeholder="Phone Number *"
                name="edit-phone"
                id="edit-phone"
                value={formUser.phone_number ? formUser.phone_number : ""}
                onChange={(e) =>
                  setFormUser({ ...formUser, phone_number: e.target.value })
                }
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group mb-3">
              <label htmlFor="edit-address">Address *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Address *"
                name="edit-address"
                id="edit-address"
                value={formUser.address ? formUser.address : ""}
                onChange={(e) =>
                  setFormUser({ ...formUser, address: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group mb-3">
              <label htmlFor="edit-city">City *</label>
              <input
                type="text"
                className="form-control"
                placeholder="City *"
                name="edit-city"
                id="edit-city"
                value={formUser.city ? formUser.city : ""}
                onChange={(e) =>
                  setFormUser({ ...formUser, city: e.target.value })
                }
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group mb-3">
              <label htmlFor="edit-gender">Gender *</label>
              <select
                className="form-control"
                name="edit-gender"
                id="edit-gender"
                value={formUser.gender}
                onChange={(e) =>
                  setFormUser({ ...formUser, gender: e.target.value })
                }
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="form-group mb-3">
              <label htmlFor="edit-state">State *</label>
              <select
                name="edit-state"
                className="form-control"
                id="edit-state"
                value={formUser.state ? formUser.state : ""}
                onChange={(e) => {
                  setFormUser({ ...formUser, state: e.target.value });
                }}
              >
                <option value="">None</option>
                <option value="province-1">Province 1</option>
                <option value="bagmati">Bagmati</option>
                <option value="gandaki">Gandaki</option>
                <option value="lumbini">Lumbini</option>
                <option value="karnali">Karnali</option>
                <option value="sudurpashchim">Sudurpashchim</option>
              </select>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group mb-3">
              <label htmlFor="Edit District">District *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your District *"
                name="edit-district"
                id="edit-district"
                value={formUser.district ? formUser.district : ""}
                onChange={(e) =>
                  setFormUser({ ...formUser, district: e.target.value })
                }
              />
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
