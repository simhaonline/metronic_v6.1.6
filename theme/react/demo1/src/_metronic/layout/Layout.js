import React from "react";
import { connect } from "react-redux";
import objectPath from "object-path";
import Header from "./header/Header";
import SubHeader from "./sub-header/SubHeader";
import HeaderMobile from "./header/HeaderMobile";
import AsideLeft from "./aside/AsideLeft";
import Footer from "./footer/Footer";
import ScrollTop from "../../app/partials/layout/ScrollTop";
import StickyToolbar from "../../app/partials/layout/StickyToolbar";
import HTMLClassService from "./HTMLClassService";
import LayoutConfig from "./LayoutConfig";
import MenuConfig from "./MenuConfig";
import LayoutInitializer from "./LayoutInitializer";
import QuickPanel from "../../app/partials/layout/QuickPanel";
import KtContent from "./KtContent";
import "./assets/Base.scss";

const htmlClassService = new HTMLClassService();

function Layout({
  children,
  asideDisplay,
  subheaderDisplay,
  selfLayout,
  layoutConfig,
  contentContainerClasses
}) {
  htmlClassService.setConfig(layoutConfig);
  // scroll to top after location changes
  // window.scrollTo(0, 0);

  const contentCssClasses = htmlClassService.classes.content.join(" ");

  return selfLayout !== "blank" ? (
    <LayoutInitializer
      menuConfig={MenuConfig}
      layoutConfig={LayoutConfig}
      htmlClassService={htmlClassService}
    >
      {/* <!-- begin:: Header Mobile --> */}
      <HeaderMobile />
      {/* <!-- end:: Header Mobile --> */}

      <div className="kt-grid kt-grid--hor kt-grid--root">
        {/* <!-- begin::Body --> */}
        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
          {/* <!-- begin:: Aside Left --> */}
          {asideDisplay && (
            <>
              <AsideLeft />
            </>
          )}
          {/* <!-- end:: Aside Left --> */}
          <div
            className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper"
            id="kt_wrapper"
          >
            {/* <!-- begin:: Header READY --> */}

            <Header />
            {/* <!-- end:: Header --> */}

            {/* <!-- begin:: Content --> */}
            <div
              id="kt_content"
              className={`kt-content ${contentCssClasses} kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor`}
            >
              {/* <!-- begin:: Content Head --> */}
              {subheaderDisplay && (
                <SubHeader />
              )}
              {/* <!-- end:: Content Head --> */}

              {/* <!-- begin:: Content Body --> */}
              {/* TODO: add class to animate  kt-grid--animateContent-finished */}
              <KtContent>
                {children}
              </KtContent>
              {/*<!-- end:: Content Body -->*/}
            </div>
            {/* <!-- end:: Content --> */}
            <Footer />
          </div>
        </div>
        {/* <!-- end:: Body --> */}
      </div>
      <QuickPanel />
      <ScrollTop />
      <StickyToolbar />
    </LayoutInitializer>
  ) : (
    // BLANK LAYOUT
    <div className="kt-grid kt-grid--ver kt-grid--root">
      <KtContent>
        {children}
      </KtContent>
    </div>
  );
}

const mapStateToProps = ({ builder: { layoutConfig } }) => ({
  layoutConfig,
  selfLayout: objectPath.get(layoutConfig, "self.layout"),
  asideDisplay: objectPath.get(layoutConfig, "aside.self.display"),
  subheaderDisplay: objectPath.get(layoutConfig, "subheader.display"),
  desktopHeaderDisplay: objectPath.get(
    layoutConfig,
    "header.self.fixed.desktop"
  ),
  contentContainerClasses: ""
  // contentContainerClasses: builder.selectors.getClasses(store, {
  //   path: "content_container",
  //   toString: true
  // })
});

export default connect(mapStateToProps)(Layout);
