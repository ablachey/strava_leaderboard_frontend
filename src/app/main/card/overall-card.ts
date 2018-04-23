import { User } from '../../auth/user';

export class OverallCard {
  constructor(
    public value?: number,
    public unit?: string,
    public athlete?: User
  ) { }
}
