import { FileMeta } from './file-meta';

export class Report {
    public id: number;
    public createdAt: string;
    public fromTime: string;
    public toTime: string;
    public type: string;
    public files: FileMeta[];
}
