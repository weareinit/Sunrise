const AVATARS = [
    "Crab (R)",
    "Dolphin (B)",
    "Mahi-mahi (G)",
    "Octopus (O)",
    "Manatee (Y)",
    "Diver (P)"
];

export let getWave = waveId => {
    return AVATARS[waveId];
};

export const ENDPOINTS = {
    TOKEN: "https://api.shellhacks.net/token",
    CHECK_IN: "https://api.shellhacks.net/admin/hacker_checkIn",
    EVENT_CHECK_IN: "https://api.shellhacks.net/admin/event_checkIn",
    HACKER_DATA: "https://api.shellhacks.net/admin/readOne",
    SCHEDULE: "https://api.shellhacks.net/schedule"
}