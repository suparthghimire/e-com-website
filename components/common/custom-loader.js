import Loader from "react-loader-spinner";
export default function CustomLoader(props) {
  if (props.padding === false) {
    return (
      <Loader
        type={props.type ? props.type : "Grid"}
        color={props.color ? props.color : "#00BFFF"}
        height={50}
        width={50}
      />
    );
  } else if (!props.padding)
    return (
      <div
        className="d-flex justify-content-center align-items-center pt-5 pb-5"
        style={{ minHeight: "500px" }}
      >
        <Loader
          type={props.type ? props.type : "Grid"}
          color={props.color ? props.color : "#00BFFF"}
          height={50}
          width={50}
        />
      </div>
    );
}
