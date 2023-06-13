"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../config/supabaseClient";

export const fetchQuestionAndAnswerAsync = createAsyncThunk(
  "questionAndAnswer/fetchquestionAndAnswer",
  async () => {
    try {
      const { data } = await supabase.from(`interview_data`).select();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const createQuestionsAndAnswerAsync = createAsyncThunk(
  "questionAndAnswer/createQuestionsAndAnswer",
  async ({ question, answer, category }) => {
    try {
      const { data } = await supabase
        .from(`interview_data`)
        .insert([{ question, answer, category }])
        .single();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const importFileAsync = createAsyncThunk(
  "interviews/importFile",
  async file => {
    try {
      const fileContents = await readFile(file);

      const parsedData = parseFileContents(fileContents);

      const { data, error } = await supabase
        .from("interview_data")
        .insert(parsedData);
      if (error) {
        throw new Error("Error inserting...");
      }

      return data;
    } catch (error) {
      throw new Error("Error import");
    }
  }
);

const interviewSlice = createSlice({
  name: "interviews",
  initialState: [],
  reducers: { displayCartItems: (state, action) => {} },
  extraReducers: builder => {
    builder.addCase(fetchQuestionAndAnswerAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(importFileAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(
      createQuestionsAndAnswerAsync.fulfilled,
      (state, action) => {
        state.push(action.payload);
      }
    );
  },
});

export const { setQuestionAndAnswer } = interviewSlice.actions;
export const selectQuestionAndAnswer = state => {
  return state.interviews;
};
export default interviewSlice.reducer;
