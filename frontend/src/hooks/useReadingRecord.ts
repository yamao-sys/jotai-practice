import {
  CreateReadingRecordDto,
  ReadingRecordDto,
  UpdateReadingRecordDto,
} from '@/generated/reading_records/@types';
import { useCallback, useEffect } from 'react';
import {
  deleteReadingRecord,
  fetchReadingRecords,
  postCreateReadingRecord,
  updateReadingRecord,
} from '@/apis/readingRecordsApi';
import { useAuth } from './useAuth';
import { useSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { setReadingRecords } from '@/store/readingRecord';

export const useReadingRecord = () => {
  const { isSignedIn } = useAuth();

  const readingRecords = useSelector((state) => state.readingRecord.readingRecords);
  const dispatch = useDispatch();

  const handleFetchReadingRecords = useCallback(async () => {
    const data = await fetchReadingRecords();
    dispatch(setReadingRecords(data));
  }, [dispatch]);

  const handleCreateReadingRecord = useCallback(
    async (inputReadingRecord: CreateReadingRecordDto) => {
      const res = await postCreateReadingRecord(inputReadingRecord);
      dispatch(setReadingRecords([...readingRecords, res]));
    },
    [readingRecords, dispatch],
  );

  const handleUpdateReadingRecord = useCallback(
    async (id: string, inputReadingRecord: UpdateReadingRecordDto) => {
      const res = await updateReadingRecord(id, inputReadingRecord);
      const newReadingRecords = readingRecords.map((readingRecord) =>
        readingRecord.id === Number(id) ? res : readingRecord,
      );

      dispatch(setReadingRecords(newReadingRecords));
    },
    [readingRecords, dispatch],
  );

  const handleDeleteReadingRecord = useCallback(
    async (id: string) => {
      await deleteReadingRecord(id);

      const newReadingRecords = readingRecords.filter(
        (readingRecord: ReadingRecordDto) => readingRecord.id !== Number(id),
      );
      dispatch(setReadingRecords(newReadingRecords));
    },
    [readingRecords, dispatch],
  );

  useEffect(() => {
    if (isSignedIn) handleFetchReadingRecords();
  }, [isSignedIn, handleFetchReadingRecords]);

  return {
    readingRecords,
    handleCreateReadingRecord,
    handleUpdateReadingRecord,
    handleDeleteReadingRecord,
  };
};
