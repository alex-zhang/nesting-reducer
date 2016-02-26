'use strict';

let combineReducers = require('redux').combineReducers;
let handleActions = require('redux-actions')

exports.nestCombineReducers = function nestCombineReducers(schema, keyValidator) {
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
exports.handleActionsReducor = function(defaultState, handleActionsObject) {
  return handleActions(handleActionsObject, defaultState);
}

exports.defaultStateReducor = function(defaultState, reducer) {
  return function(state, action) {
    if(state === undefined) state = defaultState;
    return reducer(state, action);
  }
}

exports.valueReducor = function(val) {
  return function(state, action) {
    return val;
  }
}

exports.nullReducer = function(state, action) {return null};
exports.emptyStringdReducer = function(state, action) {return ''};
exports.falseReducer = function(state, action) {return false};
exports.trueReducer = function(state, action) {return true};
exports.actionPayloadReducer = function(state, action) {return action.payload};
exports.stateReducer = function(state, action) {return state};
