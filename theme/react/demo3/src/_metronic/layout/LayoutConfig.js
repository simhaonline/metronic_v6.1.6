export const initLayoutConfig = {
  demo: "demo3",
  // Base Layout
  colors: {
    state: {
      brand: "#2c77f4",
      light: "#ffffff",
      dark: "#282a3c",

      primary: "#5867dd",
      success: "#34bfa3",
      info: "#36a3f7",
      warning: "#ffb822",
      danger: "#fd3995"
    },
    base: {
      label: ["#c5cbe3", "#a1a8c3", "#3d4465", "#3e4466"],
      shape: ["#f0f3ff", "#d9dffa", "#afb4d4", "#646c9a"]
    }
  },
  loader: {
    type: ""
  },
  // Page toolbar
  toolbar: {
    display: true
  },
  header: {
    self: {
      width: "fluid", // fixed|fluid
      skin: "light", // light
      layout: "layout-1", // layout-1, layout-2, layout-3, layout-4
      fixed: {
        desktop: true,
        mobile: true
      }
    },
    menu: {
      self: {
        display: true,
        "root-arrow": false,
        "icon-style": "bold",
        layout: "tab" //tab|default
      },
      desktop: {
        arrow: true,
        toggle: "click",
        submenu: {
          skin: "light",
          arrow: true
        }
      },
      mobile: {
        submenu: {
          skin: "dark",
          accordion: true
        }
      }
    }
  },
  subheader: {
    display: true,
    fixed: true,
    layout: "subheader-3",
    width: "fluid", //fixed|fluid
    layouts: {
      "subheader-v1": "Subheader v1",
      "subheader-v2": "Subheader v2",
      "subheader-v3": "Subheader v3",
      "subheader-v4": "Subheader v4"
    },
    style: "bold" // transparent|solid
  },
  // Content
  content: {
    width: "fluid"
  },
  brand: {
    self: {
      skin: "navy"
    }
  },
  aside: {
    self: {
      display: true,
      fixed: true,
      minimize: {
        toggle: true, // allow toggle
        default: false // default state
      }
    },
    footer: {
      self: {
        display: true
      }
    },
    menu: {
      "root-arrow": false,
      dropdown: "true", // ok
      submenu: {
        accordion: false,
        dropdown: {
          arrow: "false",
          "hover-timeout": 500 // in milliseconds
        }
      }
    }
  },
  footer: {
    self: {
      width: "fluid" // fixed|fluid
    }
  }
};

let LayoutConfig = JSON.parse(JSON.stringify(initLayoutConfig)); // deep object copy
export default LayoutConfig;
