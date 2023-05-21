// index.tsx
import Link from 'next/link';
import router from '../lib/router';
import { NextApiRequest, NextApiResponse } from "next";
import { SteamProfile } from '@/lib/passport';
import type { NextSteamAuthApiRequest } from '../lib/router';
import { steamID64ToSteamID3 } from "../lib/steamIDConverter";
import { getDota2Details } from "../lib/dotaAPI";

export default function Index({ user, dota2Details }: { user: SteamProfile, dota2Details: any }) {
  const steamID3 = user ? steamID64ToSteamID3(user.id) : null; // Convert SteamID64 to SteamID3
  console.log(user); // Shows the SteamProfile object in console.
  console.log(dota2Details); // Shows the Dota 2 details in console.

  return (
    <div style={{ textAlign: 'center' }}>
      {user ? (
        <div>
          <br />
          From logging in, your Steam64ID is {user.id}.
          <br />
          Your Steam32ID is {steamID3}. (Dota 2 API readable).
          <br />
          {dota2Details && (
            <div>
              Your Dota 2 Details:
              <br />
              Account ID: {dota2Details.profile.account_id}
              <br />
              Personaname: {dota2Details.profile.personaname}
              <br />
              Avatar: <img src={dota2Details.profile.avatarfull} alt="Avatar" />
              <br />
              MMR Estimate: {dota2Details.mmr_estimate.estimate}
            </div>
          )}
          <br />
          You can call other APIs to get more information within `getServerSideProps` or within `lib/passport.ts`.
          <br />
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      ) : (
        <div>
          Welcome!<br />
          <Link href="/api/auth/login">Login</Link>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ req, res }: { req: NextSteamAuthApiRequest; res: NextApiResponse }) {
  await router.run(req, res);

  let dota2Details = null;
  if (req.user) {
    const steamID3 = steamID64ToSteamID3(req.user.id);
    dota2Details = await getDota2Details(steamID3);
  }

  return { props: { user: req.user || null, dota2Details } };
}


// V2

// import Link from 'next/link';
// import router from '../lib/router';
// import { NextApiRequest, NextApiResponse } from "next";
// import { SteamProfile } from '@/lib/passport';
// import type { NextSteamAuthApiRequest } from '../lib/router';
// import { steamID64ToSteamID3 } from "../lib/steamIDConverter";
// import { getDota2Details } from "../lib/dotaAPI";

// export default function Index({ user, dota2Details }: { user: SteamProfile, dota2Details: any }) {
//   const steamID3 = user ? steamID64ToSteamID3(user.id) : null; // Convert SteamID64 to SteamID3
//   console.log(user); // Shows the SteamProfile object in console.
//   console.log(dota2Details); // Shows the Dota 2 details in console.

//   return (
//     <div style={{ textAlign: 'center' }}>
//       {user ? (
//         <div>
//           <br />
//           From logging in, your Steam64ID is {user.id}.
//           <br />
//           Your Steam32ID is {steamID3}. (Dota 2 API readable).
//           <br />
//           Your rank is {dota2Details.rank}. // Modify this line based on the actual property name in the Dota 2 response
//           <br />
//           You can call other APIs to get more information within `getServerSideProps` or within `lib/passport.ts`.
//           <br />
//           <Link href="/api/auth/logout">Logout</Link>
//         </div>
//       ) : (
//         <div>
//           Welcome!<br />
//           <Link href="/api/auth/login">Login</Link>
//         </div>
//       )}
//     </div>
//   );
// }

// export async function getServerSideProps({ req, res }: { req: NextSteamAuthApiRequest; res: NextApiResponse }) {
//   await router.run(req, res);

//   let dota2Details = null;
//   if (req.user) {
//     const steamID3 = steamID64ToSteamID3(req.user.id);
//     dota2Details = await getDota2Details(steamID3);
//   }

//   return { props: { user: req.user || null, dota2Details } };
// }


// V 1

// import Link from 'next/link';
// import router from '../lib/router';
// import { NextApiRequest, NextApiResponse } from "next";
// import { SteamProfile } from '@/lib/passport';
// import type { NextSteamAuthApiRequest } from '../lib/router';
// import { steamID64ToSteamID3 } from "../lib/steamIDConverter";

// export default function Index({ user }: { user: SteamProfile }) {
//   const steamID3 = user ? steamID64ToSteamID3(user.id) : null; // Convert SteamID64 to SteamID3
//   console.log(user) // Shows the SteamProfile object in console.

//   return (
//     <div style={{ textAlign: 'center' }}>
//       {user ? (
//         <div>
//           <br />
//           From logging in, your Steam64ID is {user.id}.
//           <br />
//           Your Steam32ID is {steamID3}. (Dota 2 API readable).
//           <br />
//           You can call other APIs to get more information within `getServerSideProps` or within `lib/passport.ts`.
//           <br />
//           <Link href="/api/auth/logout">Logout</Link>
//         </div>
//       ) : (
//         <div>
//           Welcome!<br />
//           <Link href="/api/auth/login">Login</Link>
//         </div>
//       )}
//     </div>
//   );
// }

// export async function getServerSideProps({ req, res }: { req: NextSteamAuthApiRequest; res: NextApiResponse }) {
//   await router.run(req, res);
//   return { props: { user: req.user || null } };
// }
