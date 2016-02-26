# nesting-reducer
=========================

What is it
----------------------

nesting-reducer is used for combine reducer as a nesting structure.

we aways use redux's to combineReducers, and we lost the big picture of state tree.

if u use `nesting-reducer` u can nesting-combine the reducers.

Install
----------------------

``` bash
npm install nesting-reducer
```

How to Use
----------------------

```js
  import {nestCombineReducers, handleActionsReducor, defaultStateReducor,
  actionPayloadReducer} from 'nesting-reducer';

 let stateTree = {
  config: {
    lng: handleActionsReducor('en-US', handleActionsObject)
  },

  user: {
    friend: {
      tag: handleActionsReducor([], handleActionsObject),
      list: handleActionsReducor([], handleActionsObject)
    },
    current: handleActionsReducor(null, handleActionsObject)
  },
 }

 let rootReducer = nestCombineReducers(stateTree);
```