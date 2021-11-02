export default function OrderMessage() {
  return (
    <div className="order-message mr-auto ml-auto">
      <div className="icon-box d-inline-flex align-items-center">
        <div className="icon-box-icon mb-0">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 50 50"
            enableBackground="new 0 0 50 50"
            xmlSpace="preserve"
          >
            <g>
              <path
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="bevel"
                strokeMiterlimit="10"
                d="
                            M33.3,3.9c-2.7-1.1-5.6-1.8-8.7-1.8c-12.3,0-22.4,10-22.4,22.4c0,12.3,10,22.4,22.4,22.4c12.3,0,22.4-10,22.4-22.4
                            c0-0.7,0-1.4-0.1-2.1"
              ></path>
              <polyline
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="bevel"
                strokeMiterlimit="10"
                points=" 48,6.9 24.4,29.8 17.2,22.3"
              ></polyline>
            </g>
          </svg>
        </div>
        <div className="icon-box-content text-left">
          <h5 className="icon-box-title font-weight-bold lh-1 mb-1">
            Thank You!
          </h5>
          <p className="lh-1 ls-m">Your order has been received</p>
        </div>
      </div>
    </div>
  );
}
