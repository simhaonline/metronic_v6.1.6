import React from "react";
import { connect } from "react-redux";
import objectPath from "object-path";
import Topbar from "./Topbar";
import Brand from "../brand/Brand";
import HMenu from "./HMenu/HMenu";
import AnimateLoading from "../../../app/partials/layout/AnimateLoading";
import KTHeader from "../../_assets/js/header";
import * as builder from "../../ducks/builder";

class Header extends React.Component {
  headerCommonRef = React.createRef();

  componentDidMount() {
    let options = {
      minimize: {
        desktop: {}
      }
    };
    if (
      this.headerCommonRef.current.getAttribute("data-ktheader-minimize") ===
      "1"
    ) {
      options.minimize.desktop.on = "kt-header--minimize";
      options["offset.desktop"] = 130;
    }

    // eslint-disable-next-line no-undef  
    new KTHeader(this.headerCommonRef.current, options);
  }

  render() {
    const {
      menuHeaderDisplay,  
      headerAttributes,
      headerClasses,
      headerContainerClasses
    } = this.props;
    return (
      <div
        ref={this.headerCommonRef}
        className={`kt-header ${headerClasses}`}
        id="kt_header"
        {...headerAttributes}
      >
        <div className={`kt-container ${headerContainerClasses}`}>
          <AnimateLoading />
          <Brand />
          {/* <!-- begin: Header Menu --> */}
          {menuHeaderDisplay && <HMenu />}
          {/* <!-- end: Header Menu --> */}
          {/* <!-- begin:: Header Topbar --> */}
          {/* <!-- empty div to fix topbar to stay on the right when menu-horizontal is hidden --> */}
          {!menuHeaderDisplay && <div />}
          <Topbar />
          {/* <!-- end:: Header Topbar --> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  headerAttributes: builder.selectors.getAttributes(store, { path: "header" }),
  headerClasses: builder.selectors.getClasses(store, {
    path: "header",
    toString: true
  }),
  headerContainerClasses: builder.selectors.getClasses(store, {
    path: "header_container",
    toString: false
  }),
  menuHeaderDisplay: objectPath.get(
    store.builder.layoutConfig,
    "header.menu.self.display"
  ),
  fluid:
    objectPath.get(store.builder.layoutConfig, "header.self.width") === "fluid"
});

export default connect(mapStateToProps)(Header);
