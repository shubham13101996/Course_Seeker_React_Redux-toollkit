import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchCourseData from "../../database/courseData";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const { user } = await fetchCourseData("https://example.com/api/courses");
    return user;
  } catch (err) {
    console.error(err);
  }
});

const userSlice = createSlice({
  name: "User",

  initialState: {
    status: "",
    error: null,
    user: {},
  },

  reducers: {
    enrollToCourse: (state, action) => {
      state.user.enrolledCourses.push(action.payload);
    },

    markCourseAsComplete: (state, action) => {
      state.user.completedCourses.push(action.payload);
    },

    likeCourse: (state, action) => {
      const isCourseAlreadyLiked = state.user.likedCourses.find(
        (course) => course.name === action.payload
      );
      !isCourseAlreadyLiked && state.user?.likedCourses.push(action.payload);
    },

    dislikeCourse: (state, action) => {
      state.user.likedCourses = state.user.likedCourses.filter(
        (course) => course !== action.payload
      );
    },

    unEnrollFromCourse: (state, action) => {
      state.user.enrolledCourses = state.user.enrolledCourses.filter(
        (course) => course !== action.payload
      );
    },

    markCourseAsIncomplete: (state, action) => {
      state.user.completedCourses = state.user.completedCourses.filter(
        (course) => course !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "Success";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "Error";
        state.error = action.error.message;
      });
  },
});

export const {
  enrollToCourse,
  dislikeCourse,
  markCourseAsComplete,
  likeCourse,
  unEnrollFromCourse,
  markCourseAsIncomplete,
} = userSlice.actions;

export default userSlice.reducer;
