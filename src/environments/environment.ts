// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiBase: "https://leaderboard-api.clayapps.com/api/",
  stravaAuth: "https://www.strava.com/oauth/authorize?client_id=24837&response_type=code&redirect_uri=http://localhost:4200/auth/authorize&approval_prompt=force&scope=public",
  titleBase: 'Leaderboard'
};
