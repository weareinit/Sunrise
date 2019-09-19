export let getWave = waveId => {
    const avatars = [
        "Crab",
        "Dolphin",
        "Mahi-mahi",
        "Octopus",
        "Manatee",
        "Diver"
    ];
    return avatars[waveId];
};

export const ENDPOINTS = {
    TOKEN: "https://api.shellhacks.net/token",
    CHECK_IN: "https://api.shellhacks.net/admin/hacker_checkIn",
    HACKER_DATA: "https://api.shellhacks.net/admin/readOne"
}