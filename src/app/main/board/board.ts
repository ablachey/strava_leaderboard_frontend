import { User } from '../../auth/user';
export class Board {
  constructor(public id: number, public name: string, public athletes: User[], public active?: boolean, public admin?: boolean) {}
}
