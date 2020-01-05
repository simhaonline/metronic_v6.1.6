import React from "react";
import { connect } from "react-redux";
import objectPath from "object-path";
import Header from "./header/Header";
import SubHeader from "./sub-header/SubHeader";
import { withRouter } from "react-router-dom";
import HeaderMobile from "./header/HeaderMobile";
import AsideLeft from "./aside/AsideLeft";
import Footer from "./footer/Footer";
import ScrollTop from "../../app/partials/layout/ScrollTop";
import StickyToolbar from "../../app/partials/layout/StickyToolbar";
import HTMLClassService from "./HTMLClassService";
import LayoutConfig from "./LayoutConfig";
import MenuConfig from "./MenuConfig";
import LayoutInitializer from "./LayoutInitializer";
import KtContent from "./KtContent";
import QuickPanel from "../../app/partials/layout/QuickPanel";
import "./assets/Base.scss";

const htmlClassService = new HTMLClassService();

function Layout({
  children,
  asideDisplay,
  subheaderDisplay,
  selfLayout,
  layoutConfig
}) {
  htmlClassService.setConfig(layoutConfig);
  // scroll to top after location changes
  window.scrollTo(0, 0);

  const contentCssClasses = htmlClassService.classes.content.join(" ");
  const contentContainerCssClasses = htmlClassService.classes.content_container.join(
    " "
  );
  return selfLayout !== "blank" ? (
    <LayoutInitializer
      styles={[]}
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
          <div
            className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper"
            id="kt_wrapper"
          >
            <Header />
            {/* <!-- end:: Header --> */}
            <div
              className="kt-body kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-grid--stretch"
              id="kt_body"
            >
              {/* <!-- begin:: Aside Left --> */}
              {asideDisplay && (
                <>
                  <div
                    className={`kt-container ${contentContainerCssClasses} kt-container--fit kt-grid kt-grid--ver`}
                  >
                    <AsideLeft />
                    <div
                      className="kt-content kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
                      id="kt_content"
                    >
                      <KtContent>{children}</KtContent>
                    </div>
                  </div>
                </>
              )}
              {!asideDisplay && (
                <>
                  {/* <!-- begin:: Content --> */}
                  <div
                    id="kt_content"
                    className={`kt-content ${contentCssClasses} kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor`}
                  >
                    {/* <!-- begin:: Content Head --> */}
                    {subheaderDisplay && <SubHeader />}
                    {/* <!-- end:: Content Head --> */}

                    {/* <!-- begin:: Content Body --> */}
                    <KtContent>{children}</KtContent>
                    {/*<!-- end:: Content Body -->*/}
                  </div>
                  {/* <!-- end:: Content --> */}
                </>
              )}

              {/* <!-- end:: Aside Left --> */}
            </div>
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
    <div className="kt-grid kt-grid--ver kt-grid--root kt-page">
      <KtContent>{children}</KtContent>
    </div>
  );
}

const mapStateToProps = ({ builder: { layoutConfig } }) => ({
  layoutConfig,
  selfLayout: objectPath.get(layoutConfig, "self.layout"),
  asideDisplay: objectPath.get(layoutConfig, "aside.self.display"),
  subheaderDisplay: objectPath.get(layoutConfig, "subheader.display")
});

export default withRouter(connect(mapStateToProps)(Layout));
