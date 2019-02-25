import { ReportType } from '../model/report';

export interface GetReportsPath {
    identityID: string;
}

export interface GetReportsQuery {
    fromTime: Date;
    toTime: Date;
    type?: ReportType;
}
