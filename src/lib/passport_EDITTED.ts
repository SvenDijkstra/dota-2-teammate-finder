import passport from "passport";
import passportSteam from "passport-steam";
import fetch from "node-fetch";

const SteamStrategy = passportSteam.Strategy;

export interface SteamProfile {
  displayName: string;
  id: string;
  identifier: string;
  photos: Image[];
  provider: string;
  dota2?: Dota2Profile; // Make the Dota 2 profile optional
}

console.log("Setting inteface Image.");

interface Image {
  value: string;
}

console.log("Setting inteface Dota2Profile.");

interface Dota2Profile {
  rank: number;
  // Include other Dota 2 details you want to retrieve
}

console.log("Setting passport.serializeUser(.");

passport.serializeUser(function (user, done) {
  done(null, user);
});

console.log("Setting passport.deserializeUser(.");

passport.deserializeUser(function (obj: SteamProfile, done) {
  done(null, obj);
});

console.log("Setting passport.use(.");

passport.use(
  new SteamStrategy(
    {
      returnURL: `${process.env.DOMAIN}/api/auth/return`,
      realm: `${process.env.DOMAIN}`,
      apiKey: `${process.env.STEAM_API_KEY}`,
    },
    async (_: string, profile: SteamProfile, done: (a: null | string, b: SteamProfile) => typeof done) => {
      try {
        // Fetch additional Steam information using the Steam Web API
        const steamResponse = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API_KEY}&steamids=${profile.id}`);
        const steamData = await steamResponse.json();

        // Extract and populate Steam details
        const steamProfileData = steamData.response.players[0];
        profile.displayName = steamProfileData.personaname;
        profile.photos = steamProfileData.photos;

        // Fetch Dota 2 information using the OpenDota API
        const dota2Response = await fetch(`https://api.opendota.com/api/players/${profile.id}`);
        const dota2Data = await dota2Response.json();

        console.log("Dota 2 API Response:", dota2Data); // Add this line to log the Dota 2 data

        // Extract and populate Dota 2 details
        const dota2Profile: Dota2Profile = {
          rank: dota2Data.rank_tier || 0, // Use a default value of 0 if rank_tier is null or undefined
          // Assign other retrieved Dota 2 details
        };

        profile.dota2 = dota2Profile; // Assign Dota 2 details to the profile object
        console.log("https://api.opendota.com/api/players/" + profile.id);

        return done(null, profile);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

console.log("This is the log thingy you think it is, right?");

export default passport;
