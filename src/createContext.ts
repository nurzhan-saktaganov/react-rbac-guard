import * as React from "react";

import * as PropTypes from "prop-types";

function generateToken(length: number): string {
  const symbolSet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    const position = Math.floor(Math.random() * symbolSet.length);
    token += symbolSet.charAt(position);
  }

  return token;
}

let reservedToken: any = {};
function uniqueToken(length: number) {
  let token;
  do {
    token = generateToken(length);
  } while (reservedToken[token]);
  reservedToken[token] = true;
  return token;
}

type ConsumerProps = {
  children: any // TODO change to a true type
}

// This is just polyfill to emulate new context API using legacy API.
// NOTE: it does not support default value.
function createContext(defaultValue?: any) {
  const TOKEN_LENGTH = 32;
  const token = uniqueToken(TOKEN_LENGTH);
  let contextTypes: any = {};
  contextTypes[token] = PropTypes.any;

  class Consumer extends React.Component<ConsumerProps> {
    static contextTypes: any;
    render() {
      const credentials = this.context[token];

      const { children } = this.props;

      if (!children) {
        return null;
      }

      if (Array.isArray(children) || typeof children !== "function") {
        throw new TypeError("Consumer expected exactly one function child");
      }

      return this.props.children(credentials);
    }
  }

  Consumer.contextTypes = contextTypes;
  type ProviderProps = {
    value: any
  }
  class Provider extends React.Component<ProviderProps> {
    static childContextTypes: any;
    getChildContext() {
      let context: any = {};
      context[token] = this.props.value;
      return context;
    }

    render() {
      return this.props.children;
    }
  }

  Provider.childContextTypes = contextTypes;

  return { Provider, Consumer };
}

export default function (defaultValue?: any) {
  // Try to use new context API, fallback to legacy API otherwise.
  const func = React.createContext || createContext;
  return func(defaultValue);
}
