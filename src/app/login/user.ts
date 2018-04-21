export class User {
  constructor(public id:number, public strava_id: number, firstname: string, lastname: string, email:string, image: {medium: string, large: string}) {}
}
