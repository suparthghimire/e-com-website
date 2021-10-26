import axios from "axios";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";

export const Register = (user) => {
  return (dispatch) => {
    axios
      .post(`${BASE_URL}/signup/`, user)
      .then((token) => {
        localStorage.setItem("token", token.data);

        dispatch({
          type: "REGISTER",
          token: token.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};
