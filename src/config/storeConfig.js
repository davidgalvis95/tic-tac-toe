import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../reducers/gameReducer";

const store = configureStore({
  reducer: { gameReducer: gameReducer },
});

export default store;
