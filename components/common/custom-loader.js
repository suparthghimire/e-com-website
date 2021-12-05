import Loader from "react-loader-spinner";
export default function CustomLoader(props) {
  return (
    <div
      className="d-flex justify-content-center align-items-center pt-5 pb-5"
      style={{ minHeight: "100vh" }}
    >
      <div className="loading-image">
        <img src="./images/home/vamalogo_edit.png" alt="Rameti Logo" />
      </div>
      {/* <Loader
        type={props.type ? props.type : "Grid"}
        color={props.color ? props.color : "#00BFFF"}
        height={50}
        width={50}
      /> */}
    </div>
  );
}
