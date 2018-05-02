export class User {
  constructor(public id?:number, public strava_id?: number, public firstname?: string, public lastname?: string, public email?:string, public image?: {medium: string, large: string}, public active?: boolean, public admin?: boolean) {}
}
