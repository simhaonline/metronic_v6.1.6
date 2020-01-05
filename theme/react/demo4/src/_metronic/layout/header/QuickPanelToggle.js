/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import KTOffcanvas from "../../_assets/js/offcanvas";
import { ReactComponent as Layout4BlocksIcon } from "../assets/layout-svg-icons/Layout-4-blocks.svg";

export default class QuickPanelToggler extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line
    const panel = document.getElementById("kt_quick_panel");

    // eslint-disable-next-line
    const offCanvas = new KTOffcanvas(panel, {
      overlay: true,
      baseClass: "kt-quick-panel",
      closeBy: "kt_quick_panel_close_btn",
      toggleBy: "kt_quick_panel_toggler_btn"
    });
  }

  render() {
    return (
      <>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="quick-panel-tooltip">Quick panel</Tooltip>}
        >
          <div
            className="kt-header__topbar-item"
            data-toggle="kt-tooltip"
            title="Quick panel"
            data-placement="right"
          >
            <div
              className="kt-header__topbar-wrapper"
              data-toggle="dropdown"
              data-offset="10px,0px"
            >
              <span
                className="kt-header__topbar-icon"
                id="kt_quick_panel_toggler_btn"
              >
                <Layout4BlocksIcon />
              </span>
            </div>
          </div>
        </OverlayTrigger>
      </>
    );
  }
}
