[![](https://data.jsdelivr.com/v1/package/npm/react-rbac-guard/badge)](https://www.jsdelivr.com/package/npm/react-rbac-guard)

# React RBAC Guard #

`react-rbac-guard` is a module allowing to manage visibility of particular components depending on user credentials (or current permissions set). Module uses approach that was inspired by "react-redux-connect" module.

__The package currently in the early development stage.__

## Dependensies ##

React RBAC requires either React [new context API](https://reactjs.org/docs/context.html) or React [legacy context API](https://reactjs.org/docs/legacy-context.html) support.
Module tries to use new context API (React version >= 16.3) if available. Otherwise fallbacks to legacy context API. Legacy context API has problem with returning `false` from `shouldComponentUpdate` in intermediate components (see docs).

## Installation ##

```bash
$> npm install react-rbac-guard
```

## Integration in 5 easy steps ##

1. Define your own class derived from `Requirement` class. It must implement `isSatisfied` method that takes credentials as parameter. The method must return `true` if requirement is satisfied by credentials and `false` otherwise
```js
import { Requirement } from "react-rbac-guard";

class Need extends Requirement {
  constructor(permission) {
    super();
    this.permission = permission;
  }

  isSatisfied(credentials) {
    // assume credentials is an object
    return credentials[this.permission] ? true : false;
  }
}

```

2. Create requirements
```js
const NeedManagePost = new Need("CanManagePost");
const NeedManageComment = new Need("CanManageComment");
const NeedManageUser = new Need("CanManageUser");
```

3. Create guards
```js
import { guardFactory } from "react-rbac-guard";

const PostManager = guardFactory(NeedManagePost);
const CommentManager = guardFactory(NeedManageComment);
const UserManager = guardFactory(NeedManageUser);
```

4. Provide credentials via `CredentialProvider` and use guards as components
```jsx
import { CredentialProvider } from "react-rbac-guard";

class App extends Component {
  render() {
    const credentials = {}; // you have to provide it

    return (
      <CredentialProvider value={credentials}>

        <PostManager>
          <button>Edit Post</button>
          <button>Delete Post</button>
        </PostManager>

        <CommentManager>
          <button>Edit Comment</button>
          <button>Delete Comment</button>
        </CommentManager>

        <UserManager>
          <button>Block User</button>
        </UserManager>

      </CredentialProvider>
    );
  }
}

```

5. Enjoy!

## Capabilities ##

1. You can use `all`, `any`, `not` functions to combine requirements.
```jsx
// Let's assume we have NeedAdmin, NeedManager, NeedUser, NeedGuest requirements.
// You can produce new ones by combining them.
import { any, not } from "react-rbac-gurad";

const NeedAuthorized = not(NeedGuest);
const NeedExtendedRights = any(NeedAdmin, NeedManager);

```
In other words, you can define arbitrary predicate (in terms of mathematical logic) based on your _requirements_.

2. You can use Guard component directly (without guardFactory).
```jsx
  <Guard requirement={NeedAdmin}>
    <button>Restart Server</button>
  </Guard>
```

3. You can use `protect` to protect your components (it behaves like `connect` from `react-redux-connect` ).
```jsx
import { protect } from "react-rbac-guard";

class CustomersList extends Component {
  ...
}

// exports decorated component (like connect in "react-redux-connect")
export default protect(NeedExtendedRights)(CustomersList);
```
or to protect external components
```jsx
import { Button } from "react-bootstrap";
import { protect } from "react-rbac-guard";

const SignUpButton = protect(NeedGuest)(Button);
const SignOutButton = protect(NeedAuthrized)(Button);
```

4. It's also possible to make a decision inside credentials object
```jsx
class Credentials {
  satisfies(requirement) {
    return ...// return boolean depending on requirement
  }
}

class MyRequirement extends Requirement {
  ...
  isSatisfied(credentials) {
    return credentials.satisfies(this);
  }
}

const credentials = new Credentials(...);

<CredentialProvider value={credentials}>
  ...
</CredentialProvider>

```

## Demo ##

To see demos please visit [https://codesandbox.io/s/znmxlw59jm](https://codesandbox.io/s/znmxlw59jm).


## License ##
[MIT](./LICENSE.md)
