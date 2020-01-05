/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import objectPath from "object-path";
import { withRouter } from "react-router-dom";
import { QuickActions } from "./components/QuickActions";
import * as builder from "../../ducks/builder";
import { LayoutContextConsumer } from "../LayoutContext";
// import BreadCrumbs from "./components/BreadCrumbs";

class SubHeader extends React.Component {
  render() {
    const {
      subheaderCssClasses,
      subheaderContainerCssClasses,
      subheaderMobileToggle
    } = this.props;
    const today = new Date();
    const short_months = dt => {
      Date.shortMonths = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      return Date.shortMonths[dt.getMonth()];
    };

    return (
      <div
        id="kt_subheader"
        className={`kt-subheader ${subheaderCssClasses} kt-grid__item`}
      >
        <div className={`kt-container ${subheaderContainerCssClasses}`}>
          <div className="kt-subheader__main">
            {subheaderMobileToggle && (
              <button
                className="kt-subheader__mobile-toggle kt-subheader__mobile-toggle--left"
                id="kt_subheader_mobile_toggle"
              >
                <span />
              </button>
            )}

            <LayoutContextConsumer>
              {/*{({ subheader: { title, breadcrumb } }) => (*/}
              {({ subheader: { title } }) => (
                  <>
                  <h3 className="kt-subheader__title">{title}</h3>
                  {/* <span className="kt-subheader__separator kt-subheader__separator--v" /> */}
                  {/*<BreadCrumbs items={breadcrumb} />*/}
                </>
              )}
            </LayoutContextConsumer>

            <span className="kt-subheader__separator kt-subheader__separator--v" />
            <span className="kt-subheader__desc">#XRS-45670</span>
            <a
              href="#"
              className="btn btn-label-warning btn-bold btn-sm btn-icon-h kt-margin-l-10"
            >
              Add New
            </a>
          </div>

          <div className="kt-subheader__toolbar">
            <div className="kt-subheader__wrapper">
              <a href="#" className="btn kt-subheader__btn-secondary">
                Today
              </a>
              &nbsp;
              <a href="#" className="btn kt-subheader__btn-secondary">
                Month
              </a>
              &nbsp;
              <a href="#" className="btn kt-subheader__btn-secondary">
                Year
              </a>
              &nbsp;
              <button type="button" className="btn kt-subheader__btn-daterange">
                <span
                  className="kt-subheader__btn-daterange-title"
                  id="kt_dashboard_daterangepicker_title"
                >
                  Today:
                </span>
                &nbsp;
                <span
                  className="kt-subheader__btn-daterange-date"
                  id="kt_dashboard_daterangepicker_date"
                >
                  {short_months(today)} {today.getDate().toString()}
                </span>
                &nbsp;
                <i className="flaticon2-calendar-1"></i>
              </button>
              &nbsp;
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  subheaderCssClasses: builder.selectors.getClasses(store, {
    path: "subheader",
    toString: true
  }),
  subheaderContainerCssClasses: builder.selectors.getClasses(store, {
    path: "subheader_container",
    toString: true
  }),
  config: store.builder.layoutConfig,
  menuConfig: store.builder.menuConfig,
  subheaderMobileToggle: objectPath.get(
    store.builder.layoutConfig,
    "subheader.mobile-toggle"
  )
});

export default withRouter(connect(mapStateToProps)(SubHeader));
