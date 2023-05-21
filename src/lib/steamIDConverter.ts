// steamIDConverter.ts
export function steamID64ToSteamID3(steamID64: string): string {
    const steamID32 = convertSteamID64To32(steamID64);
    return convertSteamID32To3(steamID32);
  }
  
  function convertSteamID64To32(steamID64: string): string {
    const steamID64BigInt = BigInt(steamID64);
    const steamID32 = steamID64BigInt & BigInt('4294967295'); // Extract the lower 32 bits (account number)
    return steamID32.toString();
  }
  
  function convertSteamID32To3(steamID32: string): string {
    const accountID = parseInt(steamID32);
    const universe = 1; // Assuming Public universe for Dota 2
  
    return `${accountID}`;
    // return `[U:1:${accountID}]`;
  }
  
//   // Example usage
//   const steam64ID = '76561198268966313';
//   const steam3ID = steamID64ToSteamID3(steam64ID);
//   console.log(steam3ID);
  


  