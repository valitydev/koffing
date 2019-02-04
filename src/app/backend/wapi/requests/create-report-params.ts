import { ReportType } from '../model/report';

export interface CreateReportPath {
    identityID: string;
}

export interface CreateReportQuery {
    fromTime: Date;
    toTime: Date;
    type?: ReportType;
}
