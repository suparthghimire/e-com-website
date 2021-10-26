import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../config";

function RegisterForm() {
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    gender: "M",
    state: "",
    district: "",
    city: "",
    address: "",
    wholesaler: false,
  });
  const handle_register = async (e) => {
    e.preventDefault();
    toast.info("Regestering You. Please Wait...", {
      autoClose: 1200,
    });
    try {
      const response = await fetch(`${BASE_URL}/register/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const response_user = await response.json();
      if (response.status == 400) {
        // Validation Error
        const error = new Error("Validation Error");
        error.status = 400;
        error.data = response_user;
        throw error;
      }
      if (!response_user) {
        //undefined user
        const error = new Error("Undefined Error");
        error.status = 500;
        error.data = "An Error Occured";
        throw error;
      }
      console.log("user:", response_user);
      toast.success("Registered Successfully!");
    } catch (error) {
      //error handeling
      console.log("Here");
      toast.error("Error!");
      console.error(error, error.data);
    }

    document
      .querySelectorAll("input[type='checkbox']")
      .forEach((item) => (item.checked = false));
    setUser({
      full_name: "",
      email: "",
      password: "",
      phone_number: "",
      gender: "M",
      state: "",
      district: "",
      city: "",
      address: "",
      wholesaler: false,
    });
  };
  return (
    <div>
      <form onSubmit={handle_register}>
        <div className="form-group">
          <label htmlFor="singin-name">Your Full Name:</label>
          <input
            type="text"
            className="form-control"
            id="signin-name"
            name="signin-name"
            placeholder="Your Full Name*"
            required
            value={user.full_name}
            onChange={(e) => setUser({ ...user, full_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="singin-email">Your email address:</label>
          <input
            type="email"
            className="form-control"
            id="singin-email"
            name="singin-email"
            placeholder="Your Email address *"
            required
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="singin-password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="register-password"
            name="register-password"
            placeholder="Password *"
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="singin-phone">Your Phone Number:</label>
          <input
            type="number"
            className="form-control"
            id="signin-phone"
            name="signin-phone"
            placeholder="Your Phone Number *"
            required
            value={user.phone_number}
            onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="singin-phone">Your Gender:</label>
          <select
            className="form-control"
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
            name=""
            id=""
          >
            <option value="M"> Male </option>
            <option value="F"> Female </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="singin-state">State:</label>
          <input
            type="text"
            className="form-control"
            id="signin-state"
            name="signin-state"
            placeholder="Your State*"
            required
            value={user.state}
            onChange={(e) => setUser({ ...user, state: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="singin-district">District:</label>
          <input
            type="text"
            className="form-control"
            id="signin-district"
            name="signin-district"
            placeholder="Your District*"
            required
            value={user.district}
            onChange={(e) => setUser({ ...user, district: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="singin-city">City:</label>
          <input
            type="text"
            className="form-control"
            id="signin-city"
            name="signin-city"
            placeholder="Your City*"
            required
            value={user.city}
            onChange={(e) => setUser({ ...user, city: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="singin-city">Address:</label>
          <input
            type="text"
            className="form-control"
            id="signin-city"
            name="signin-city"
            placeholder="Your City*"
            required
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          />
        </div>
        <div className="form-footer">
          <div className="form-checkbox">
            <input
              type="checkbox"
              className="custom-checkbox"
              id="register-agree"
              name="register-agree"
              value={user.wholesaler}
              onChange={(e) =>
                setUser({
                  ...user,
                  wholesaler: !user.wholesaler,
                })
              }
            />
            <label className="form-control-label" htmlFor="register-agree">
              I am Wholseller
            </label>
          </div>
        </div>
        <button className="btn btn-dark btn-block btn-rounded" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
