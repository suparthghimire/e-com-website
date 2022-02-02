import React from "react";
import SlideToggle from "react-slide-toggle";

import ALink from "~/components/features/custom-link";

export default function Card(props) {
  const {
    title,
    expanded = false,
    adClass,
    iconClass,
    type = "normal",
    url,
  } = props;

  return "normal" === type ? (
    <SlideToggle collapsed={expanded ? false : true}>
      {({ onToggle, setCollapsibleElement, toggleState }) => (
        <div className={`card ${adClass}`}>
          <div className={`card-header`} onClick={onToggle}>
            <ALink
              href="#"
              className={`toggle-button ${toggleState.toLowerCase()}`}
            >
              {iconClass ? <i className={iconClass}></i> : ""}
              {title ? title : ""}
            </ALink>
          </div>

          <div ref={setCollapsibleElement}>
            <div className="card-body overflow-hidden">{props.children}</div>
          </div>
        </div>
      )}
    </SlideToggle>
  ) : "parse" === type ? (
    <SlideToggle collapsed={expanded ? false : true}>
      {({ onToggle, setCollapsibleElement, toggleState }) => (
        <>
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              onToggle();
            }}
          >
            <ALink
              href={url ? url : "#"}
              content={title}
              className={`parse-content ${toggleState.toLowerCase()}`}
            ></ALink>
            {iconClass ? (
              <i
                className={
                  (toggleState.toLowerCase() === "expanded" ||
                  toggleState.toLowerCase() === "expanding"
                    ? " rotate-180 "
                    : " ") +
                  iconClass +
                  " mb-3 "
                }
                style={{ transition: "150ms ease-in-out" }}
              ></i>
            ) : (
              ""
            )}
          </div>

          <div ref={setCollapsibleElement} className="overflow-hidden">
            {props.children}
          </div>
        </>
      )}
    </SlideToggle>
  ) : (
    <SlideToggle collapsed={expanded ? false : true}>
      {({ onToggle, setCollapsibleElement, toggleState }) => (
        <>
          <ALink href={url ? url : "#"}>
            {title}
            <span
              className={`toggle-btn ${toggleState.toLowerCase()}`}
              onClick={(e) => {
                onToggle();
                e.preventDefault();
              }}
            ></span>
          </ALink>

          <div ref={setCollapsibleElement} className="overflow-hidden">
            {props.children}
          </div>
        </>
      )}
    </SlideToggle>
  );
  return "";
}
