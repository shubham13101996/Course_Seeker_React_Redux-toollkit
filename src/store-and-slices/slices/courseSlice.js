import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchCourseData from "../../database/courseData";

export const fetchData = createAsyncThunk("courses/fetchCourses", async () => {
  try {
    const { courseData } = await fetchCourseData(
      "https://example.com/api/courses"
    );

    return courseData;
  } catch (err) {
    console.error(err);
  }
});

const courseSlice = createSlice({
  name: "Courses",

  initialState: {
    status: "",
    error: null,
    courses: [],
    filteredCourses: [],
  },

  reducers: {
    searchCourses: (state, action) => {
      const payload = action.payload.toLowerCase().trim();

      const doesValueHavePayload = (value) =>
        value.toLowerCase().includes(payload);

      state.filteredCourses = state.courses.filter(
        ({ name, instructor }) =>
          doesValueHavePayload(name) || doesValueHavePayload(instructor)
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "Success";
        state.courses = action.payload;
        state.filteredCourses = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "Error";
        state.error = action.error.message;
      });
  },
});

export const { searchCourses } = courseSlice.actions;

export default courseSlice.reducer;
