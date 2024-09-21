import { ReadingRecordDto } from '@/generated/reading_records/@types';
import { createSlice } from '@reduxjs/toolkit';

const initialReadingRecords: ReadingRecordDto[] = [];

export const readingRecordSlice = createSlice({
  name: 'readingRecord',
  initialState: {
    readingRecords: initialReadingRecords,
  },
  reducers: {
    setReadingRecords: (state, action) => {
      state.readingRecords = action.payload;
    },
  },
});

export const { setReadingRecords } = readingRecordSlice.actions;

export default readingRecordSlice.reducer;
