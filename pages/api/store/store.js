"use client";
import { configureStore } from "@reduxjs/toolkit";
import interviewSlice from "./interviewSlice";

const store = configureStore({
  reducer: {
    interviews: interviewSlice,
  },
});

export default store;
