import { Activity } from './activity';
import { User } from '../../auth/user';

export class FastCard {
  constructor(
    public id?: number, 
    public strava_id?: number, 
    public elapsed_time?: number, 
    public moving_time?: number, 
    public distance?: number,
    public activity?: Activity,
    public user?: User
  ) { }
}
