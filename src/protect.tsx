import * as React from "react";

import Requirement from "./Requirement";
import Guard from "./Guard";

function protect(requirement: Requirement) {
  if (!(requirement instanceof Requirement)) {
    throw new TypeError("requirement is expected to be Requirement instance");
  }

  return function (ComponentToProtect: React.ComponentClass) {
    const isComponent = true ||
      ComponentToProtect &&
      ComponentToProtect.prototype &&
      ComponentToProtect.prototype instanceof React.Component;

    if (!isComponent) {
      throw new TypeError("expected a class derived from React.Component");
    }

    return (
      <Guard requirement={requirement}>
        <ComponentToProtect {...this.props}>
          {this.props.children}
        </ComponentToProtect>
      </Guard>
    );
  };
}

export default protect;
