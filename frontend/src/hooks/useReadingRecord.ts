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
import { useAtom } from 'jotai';
import { displayableReadingRecords } from '@/jotai/readingRecord';

export const useReadingRecord = () => {
  const { isLoggedIn } = useAuth();

  const [readingRecords, setReadingRecords] = useAtom(displayableReadingRecords);

  const handleFetchReadingRecords = useCallback(async () => {
    const data = await fetchReadingRecords();
    setReadingRecords(data);
  }, [setReadingRecords]);

  const handleCreateReadingRecord = useCallback(
    async (inputReadingRecord: CreateReadingRecordDto) => {
      const res = await postCreateReadingRecord(inputReadingRecord);
      setReadingRecords([...readingRecords, res]);
    },
    [readingRecords, setReadingRecords],
  );

  const handleUpdateReadingRecord = useCallback(
    async (id: string, inputReadingRecord: UpdateReadingRecordDto) => {
      const res = await updateReadingRecord(id, inputReadingRecord);
      const newReadingRecords = readingRecords.map((readingRecord) =>
        readingRecord.id === Number(id) ? res : readingRecord,
      );

      setReadingRecords(newReadingRecords);
    },
    [readingRecords, setReadingRecords],
  );

  const handleDeleteReadingRecord = useCallback(
    async (id: string) => {
      await deleteReadingRecord(id);

      const newReadingRecords = readingRecords.filter(
        (readingRecord: ReadingRecordDto) => readingRecord.id !== Number(id),
      );
      setReadingRecords(newReadingRecords);
    },
    [readingRecords, setReadingRecords],
  );

  useEffect(() => {
    if (isLoggedIn) handleFetchReadingRecords();
  }, [isLoggedIn, handleFetchReadingRecords]);

  return {
    readingRecords,
    handleCreateReadingRecord,
    handleUpdateReadingRecord,
    handleDeleteReadingRecord,
  };
};
