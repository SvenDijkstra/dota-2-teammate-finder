import Link from "next/link";
import router from "../lib/router";
import { NextApiRequest, NextApiResponse } from "next";

import { SteamProfile, Dota2Profile } from "@/lib/passport";
import type { NextSteamAuthApiRequest } from "../lib/router";

console.log("We are starting index.tsx");
export default function Index({ user }: { user: SteamProfile }) {
  console.log(user); // Shows the SteamProfile object in console.

  
  console.log("You should see the user above here! \ n and now we're starting the return!")
  return (
    <div style={{ textAlign: "center" }}>
      {user ? (
        <div>
          Welcome back!
          <br />
          From logging in, your SteamID is {user.id}.
          <br />
          {user.dota2 ? (
            <>
              Your Dota 2 Rank:{" "}
              {user.dota2.rank !== null && user.dota2.rank !== 0 ? (
                user.dota2.rank
              ) : (
                "Unranked"
              )}
              <br />
            </>
          ) : (
            "Loading Dota 2 data..."
          )}
          You can call other APIs to get more information within `getServerSideProps` or within `lib/passport.ts`.
          <br />
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      ) : (
        <div>
          Welcome!
          <br />
          <Link href="/api/auth/login">Login</Link>
        </div>
      )}
    </div>
  );
}

console.log("Dont with return. exporting data");
export async function getServerSideProps({ req, res }: { req: NextSteamAuthApiRequest; res: NextApiResponse }) {
  await router.run(req, res);
  return { props: { user: req.user || null } };
}
