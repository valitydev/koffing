import { FileMeta } from 'koffing/backend/model/file-meta';

export enum ReportType {
    withdrawalRegistry = 'withdrawalRegistry'
}

export enum ReportStatus {
    pending = 'pending',
    created = 'created',
    canceled = 'canceled'
}

export interface Report {
    id: number;
    createdAt: string;
    fromTime: string;
    toTime: string;
    status: ReportStatus;
    type: ReportType;
    files: FileMeta[];
}

export interface SearchReportParams {
    fromTime: string;
    toTime: string;
    type: ReportType;
}
