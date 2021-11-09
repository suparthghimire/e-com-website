import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../config";
import { useState } from "react";
import { useRouter } from "next/router";
export default function CancelForm(props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState([]);
  const handle_cancel = async (data) => {
    data = { ...data, order_status: "CANCELED" };
    try {
      toast.info("Cancelling Your Order", { autoClose: 1200 });
      const response = await fetch(`${BASE_URL}/order/${props.id}/cancel/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${props.access}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response_data = await response.json();
      if (response.status === 400) {
        //validation error
        const error = new Error("Validation Error");
        error.message = [
          {
            message: `Your Order Cannot be Cancelled as it already is in ${props.order_status} Stage`,
          },
        ];
        error.data = response_data;
        error.status = response.status;
        throw error;
      } else if (response.status !== 200) {
        const error = new Error("Unexpected Error");
        error.message = [{ message: "Unexpected Error Occured" }];
        error.data = response_data;
        error.status = response.status;
        throw error;
      }
      setServerError([]);
      toast.success("Order Cancelled Successfully!", {
        autoClose: 1200,
      });
      router.push("/pages/order/");
    } catch (error) {
      setServerError(error);
    } finally {
      document.querySelector("textarea").value = "";
    }
  };
  return (
    <>
      {serverError.length > 0 ? (
        <ul>
          {serverError.map((error, index) => {
            return <li key={"error-" + index}>{error.message}</li>;
          })}
        </ul>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit(handle_cancel)}>
        <div className="row">
          <div>
            <span className="font-weight-bold">Cancelling Order </span>
            {props.id}
          </div>
          <div className="col-md-10">
            <h3>Cancellation Details</h3>
            <div className="row">
              <label htmlFor="cancel_remarks">Cancellation Remarks *</label>
              <textarea
                className="form-control w-100"
                placeholder="Your Remarks *"
                {...register("cancel_remarks", { required: true })}
              ></textarea>
              {errors.cancel_remarks && (
                <small className="error-msg">Cancel Remarks is Required</small>
              )}

              <button className="mt-2 btn btn-danger btn-sm" type="submit">
                Cancel Order &nbsp;{" "}
                <i className="fas fa-trash" style={{ fontSize: "1.5rem" }}></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
