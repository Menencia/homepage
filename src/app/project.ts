import { Status } from './status.enum';

export interface Project {
  name: string;
  code: string; // hashtag
  desc: string; // description
  link: string; // URL
  status: Status;
}
