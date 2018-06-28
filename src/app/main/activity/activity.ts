import { User } from '../../auth/user';

export class Activity {
  constructor(
    public id?: number,
    public strava_id?: number,
    public user_id?: number,
    public name?: string,
    public distance?: number,
    public moving_time?: number,
    public elapsed_time?: number,
    public type?: string,
    public start_date_local?: string,
    public athlete?: User,
  ) { }
}
