import React from "react";
import { connect } from "react-redux";
import objectPath from "object-path";
import Brand from "../brand/Brand";
import Topbar from "./Topbar/Topbar";
import HMenu from "./HMenu/HMenu";
import AnimateLoading from "../../../app/partials/layout/AnimateLoading";
import KTHeader from "../../_assets/js/header";
import * as builder from "../../ducks/builder";

class Header extends React.Component {
  headerCommonRef = React.createRef();

  componentDidMount() {
    // animate the header minimize the height on scroll down
    const { headerFixedEnabled, headerFixedDesktop } = this.props;
    if (headerFixedEnabled || headerFixedDesktop) {
      // header minimize on scroll down
      this.headerCommonRef.current.setAttribute("data-ktheader-minimize", "1");
    }

    let options = {
      classic: {
        desktop: true,
        mobile: false
      }
    };
    if (
      this.headerCommonRef.current.getAttribute("data-ktheader-minimize") ===
      "1"
    ) {
      objectPath.set(options, "minimize", {
        desktop: {
          on: "kt-header--minimize"
        },
        mobile: {
          on: "kt-header--minimize"
        }
      });
      objectPath.set(options, "offset", {
        desktop: 200,
        mobile: 150
      });
    }

    new KTHeader(this.headerCommonRef.current, options);
  }

  render() {
    const {
      menuHeaderDisplay,
      headerContainerClasses,
      headerAttributes,
      headerClasses
    } = this.props;
    return (
      <div
        className={`kt-header kt-grid__item ${headerClasses}`}
        id="kt_header"
        {...headerAttributes}
        ref={this.headerCommonRef}
      >
        <AnimateLoading />
        <div className="kt-header__top">
          <div className={`kt-container ${headerContainerClasses}`}>
            <Brand />
            <Topbar />
          </div>
        </div>

        <div className="kt-header__bottom">
          <div className={`kt-container ${headerContainerClasses}`}>
            {/* <!-- begin: Header Menu --> */}
            {menuHeaderDisplay && <HMenu />}
            {/* <!-- end: Header Menu --> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  headerClasses: builder.selectors.getClasses(store, {
    path: "header",
    toString: true
  }),
  headerAttributes: builder.selectors.getAttributes(store, { path: "header" }),
  headerContainerClasses: builder.selectors.getClasses(store, {
    path: "header_container",
    toString: true
  }),
  menuHeaderDisplay: objectPath.get(
    store.builder.layoutConfig,
    "header.menu.self.display"
  ),
  headerFixedEnabled: objectPath.get(
    store.builder.layoutConfig,
    "header.self.fixed.desktop.enabled"
  ),
  headerFixedDesktop: objectPath.get(
    store.builder.layoutConfig,
    "header.self.fixed.desktop"
  )
});

export default connect(mapStateToProps)(Header);
