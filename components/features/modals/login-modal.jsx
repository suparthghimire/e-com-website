import React, { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import Modal from "react-modal";
import Cookie from "js-cookie";

import ALink from "~/components/features/custom-link";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
  },
};

let index = 0;

Modal.setAppElement("#__next");

function LoginModal(props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  function closeModal() {
    document.querySelector(".ReactModal__Overlay").classList.add("removed");
    document
      .querySelector(".login-popup.ReactModal__Content")
      .classList.remove("ReactModal__Content--after-open");
    document
      .querySelector(".login-popup-overlay.ReactModal__Overlay")
      .classList.remove("ReactModal__Overlay--after-open");
    setTimeout(() => {
      setOpen(false);
    }, 330);
  }

  function openModal(e, loginIndex = 0) {
    e.preventDefault();
    index = loginIndex;
    setOpen(true);
  }
  const handle_logout = () => {
    Cookie.set("rameti_ec_access", "", {
      expires: 0.000000001,
    });
    router.push("/");
    toast.success("Successfully Logged Out", { autoClose: 1200 });
  };
  let auth_nav;
  if (!props.auth) {
    auth_nav = (
      <>
        <a className="login-link" href="#" onClick={openModal}>
          <i className="d-icon-user"></i>Sign in
        </a>
        <span className="delimiter">/</span>
        <a
          className="register-link ml-0"
          onClick={(e) => openModal(e, 1)}
          href="#"
        >
          Register
        </a>
      </>
    );
  } else {
    auth_nav = (
      <div className="dropdown">
        <ALink href="#">
          <span>Hello {props.user.full_name}</span>
        </ALink>
        <ul className="dropdown-box">
          <li>
            <ALink href="/pages/account">Profile</ALink>
          </li>
          <li>
            <a href="#" onClick={handle_logout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <>
      {auth_nav}
      {open ? (
        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Login Modal"
          className="login-popup"
          overlayClassName="login-popup-overlay"
          shouldReturnFocusAfterClose={false}
          id="login-modal"
        >
          <div className="form-box">
            <div className="tab tab-nav-simple tab-nav-boxed form-tab">
              <Tabs
                selectedTabClassName="active"
                selectedTabPanelClassName="active"
                defaultIndex={index}
              >
                <TabList className="nav nav-tabs nav-fill align-items-center border-no justify-content-center mb-5">
                  <Tab className="nav-item">
                    <span className="nav-link border-no lh-1 ls-normal">
                      Sign in
                    </span>
                  </Tab>
                  <li className="delimiter">or</li>
                  <Tab className="nav-item">
                    <span className="nav-link border-no lh-1 ls-normal">
                      Register
                    </span>
                  </Tab>
                </TabList>

                <div className="tab-content">
                  <TabPanel className="tab-pane">
                    <LoginForm />
                  </TabPanel>

                  <TabPanel className="tab-pane">
                    <RegisterForm />
                  </TabPanel>
                </div>
              </Tabs>
            </div>
          </div>

          <button
            title="Close (Esc)"
            type="button"
            className="mfp-close"
            onClick={closeModal}
          >
            <span>×</span>
          </button>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default LoginModal;
