import { Signature } from './signature';

export class FileMeta {
    public id: string;
    public filename: string;
    public signatures?: Signature[];
}
