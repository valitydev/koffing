import { FileMeta } from './file-meta';

export enum ReportType {
    provisionOfService = 'provisionOfService',
    paymentRegistry = 'paymentRegistry'
}

export class Report {
    public id: number;
    public createdAt: string;
    public fromTime: string;
    public toTime: string;
    public type: ReportType;
    public files: FileMeta[];
}
