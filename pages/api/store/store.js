"use client";
import { configureStore } from "@reduxjs/toolkit";
import interviewSlice from "./interviewSlice";
import createContactSlice from "./createContactSlice";

const store = configureStore({
  reducer: {
    interviews: interviewSlice,
    contact: createContactSlice,
  },
});

export default store;
