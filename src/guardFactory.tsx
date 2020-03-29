import * as React from "react";

import Requirement from "./Requirement";
import Guard from "./Guard";

function guardFactory(requirement: Requirement): JSX.Element {
  if (!(requirement instanceof Requirement)) {
    throw new TypeError("requirement is expected to be Requirement instance");
  }

  return <Guard requirement={requirement}>{this.props.children}</Guard>;
}

export default guardFactory;
