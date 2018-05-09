import { createStore, applyMiddleware } from "redux";
import mainReducer from "./mainReducer";
import promiseMiddleware from "redux-promise-middleware";

const middleware = applyMiddleware(promiseMiddleware());

export default createStore(mainReducer, middleware);