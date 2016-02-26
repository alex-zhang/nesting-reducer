'use strict';

let combineReducers = require('redux').combineReducers;
let handleActions = require('redux-actions')

exports.nestCombineReducers = nestCombineReducers(schema, keyValidator) {
  let results = {};

  let keyCount = 0;

  for(var key in schema) {
    if(keyValidator && !keyValidator(key)) continue;

    let val = schema[key];
    let reducer;

    if(val.__proto__ === Object.prototype) {//plain Object
      reducer = nestCombineReducers(val);
    } else if(typeof val === 'function') {//default state bind reducer.
      reducer = val;
    }

    if(!reducer) continue;

    results[key] = reducer;
    keyCount++;
  }

  return keyCount === 0 ?
    nullReducer :
    combineReducers(results);
}

//Reducor == Reduce Creator
exports.handleActionsReducor = function handleActionsReducor(defaultState, handleActionsObject) {
  return handleActions(handleActionsObject, defaultState);
}

exports.defaultStateReducor = function defaultStateReducor(defaultState, reducer) {
  return (state = defaultState, action) => reducer(state, action);
}

exports.valueReducor = function valueReducor(val) {
  return (state, action) => val;
}

exports.nullReducer = (state, action) => null;
exports.emptyStringdReducer = (state, action) => '';
exports.falseReducer = (state, action) => false;
exports.trueReducer = (state, action) => true;
exports.actionPayloadReducer =  (state, action) => action.payload;
exports.stateReducer =  (state, action) => state;
