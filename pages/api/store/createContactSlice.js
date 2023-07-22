import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../config/supabaseClient";

export const fetchContactAsync = createAsyncThunk(
  "contact/fetchContact",
  async () => {
    try {
      const { data } = await supabase.from("contact_info").select();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const createContactAsync = createAsyncThunk(
  "contact/createContact",
  async ({ name, email, message, ip_address }) => {
    try {
      const { data } = await supabase
        .from("contact_info")
        .insert([{ name, email, message, ip_address }])
        .single();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const createContactSlice = createSlice({
  name: "contact",
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchContactAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createContactAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const { setContact } = createContactSlice.actions;
export const selectContact = state => state.contact;
export default createContactSlice.reducer;
