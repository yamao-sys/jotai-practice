import { ReadingRecordDto } from '@/generated/reading_records/@types';
import { atom } from 'jotai';

export const displayableReadingRecords = atom<ReadingRecordDto[]>([]);
