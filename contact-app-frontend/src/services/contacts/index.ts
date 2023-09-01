import axios from "@/config/axios";
import { PAGINATION_LIMIT } from "@/config/constant";
import { generateFilterQuery } from "@/lib/generateQuery";
import { RootState } from "@/redux/store";
import {
  ContactFormData,
  ContactState,
  CreateContactResponse,
  DeleteContactResponse,
  GetAllContactArguments,
  GetAllContactsResponse,
  UpdateContactResponse,
} from "@/types/contacts";
import { DeleteFormData } from "@/types/globals";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllContacts = createAsyncThunk<
  GetAllContactsResponse,
  GetAllContactArguments,
  { state: RootState; dispatch: any }
>("contacts/getAllContacts", async ({ params }, { getState, dispatch }) => {
  const response = await axios.get(`/contacts?${generateFilterQuery(params)}`);
  return response.data;
});

export const createContact = createAsyncThunk<
  CreateContactResponse,
  ContactFormData,
  { state: RootState; dispatch: any }
>("contacts/createContact", async (formData, { getState, dispatch }) => {
  const response = await axios.post(`/contacts`, formData);
  return response.data;
});

export const updateContact = createAsyncThunk<
  UpdateContactResponse,
  ContactFormData,
  { state: RootState; dispatch: any }
>("contacts/updateContact", async (formData, { getState, dispatch }) => {
  const contactId = formData.id;
  delete formData.id;
  const response = await axios.put(`/contacts/${contactId}`, formData);
  return response.data;
});

export const deleteContact = createAsyncThunk<
  DeleteContactResponse,
  DeleteFormData,
  { state: RootState; dispatch: any }
>("contacts/deleteContact", async (formData, { getState, dispatch }) => {
  const response = await axios.delete(`/contacts/${formData.id}`);
  return response.data;
});

const initialState: ContactState = {
  data: [],
  editData: null,
  pageInfo: {
    count: 0,
  },
  params: {
    limit: PAGINATION_LIMIT,
    offset: 0,
  },
  loading: "idle",
  message: null,
  currentRequestId: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setParams: (state, action) => {
      state.params = {
        ...state.params,
        ...action.payload,
      };
    },
    setEdit: (state, action) => {
      state.editData = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearParams: (state) => {
      state.params = {
        limit: PAGINATION_LIMIT,
        offset: 0
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllContacts.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        if (
          state.loading === "pending" &&
          state.currentRequestId === action.meta.requestId
        ) {
          state.loading = "idle";
          state.currentRequestId = null;
          state.data = action.payload.data;
          state.pageInfo = {
            count: action.payload.count,
          };
        }
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        if (
          state.loading === "pending" &&
          state.currentRequestId === action.meta.requestId
        ) {
          state.loading = "idle";
          state.currentRequestId = null;
        }
      })
      .addCase(createContact.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(createContact.fulfilled, (state, action) => {
        if (
          state.loading === "pending" &&
          state.currentRequestId === action.meta.requestId
        ) {
          state.loading = "idle";
          state.currentRequestId = null;
          state.message = action.payload.message;
        }
      })
      .addCase(createContact.rejected, (state, action) => {
        if (
          state.loading === "pending" &&
          state.currentRequestId === action.meta.requestId
        ) {
          state.loading = "idle";
          state.currentRequestId = null;
        }
      })
      .addCase(updateContact.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        if (
          state.loading === "pending" &&
          state.currentRequestId === action.meta.requestId
        ) {
          state.loading = "idle";
          state.currentRequestId = null;
          state.message = action.payload.message;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        if (
          state.loading === "pending" &&
          state.currentRequestId === action.meta.requestId
        ) {
          state.loading = "idle";
          state.currentRequestId = null;
        }
      })
      .addCase(deleteContact.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        if (
          state.loading === "pending" &&
          state.currentRequestId === action.meta.requestId
        ) {
          state.loading = "idle";
          state.currentRequestId = null;
          state.message = action.payload.message;
        }
      })
      .addCase(deleteContact.rejected, (state, action) => {
        if (
          state.loading === "pending" &&
          state.currentRequestId === action.meta.requestId
        ) {
          state.loading = "idle";
          state.currentRequestId = null;
        }
      });
  },
});

export const { setMessage, clearMessage, setParams, setEdit, clearParams } =
  contactSlice.actions;
export default contactSlice.reducer;
