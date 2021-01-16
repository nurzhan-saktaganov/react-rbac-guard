import * as React from "react";

import createReactContext from "./createContext";
import Requirement from "./Requirement";

const { Consumer } = createReactContext();

type GuardProps = {
  requirement: Requirement
}
export default class Guard extends React.Component<GuardProps> {
  render() {
    const { requirement } = this.props;

    if (!(requirement instanceof Requirement)) {
      throw new TypeError("requirement is expected to be Requirement instance");
    }

    return (
      <Consumer>
        {(credentials: any) =>
          requirement.isSatisfied(credentials) ? this.props.children : null
        }
      </Consumer>
    );
  }
}

// export { Guard, Provider };