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

export const NON_EVENTS = [
    "5d82fd812f5cff2b0fa2f8da",
    "5d82fd812f5cff2b0fa2f8db",
    "5d82fd812f5cff2b0fa2f8dd",
    "5d82fd812f5cff2b0fa2f8de",
    "5d82fd812f5cff2b0fa2f8e1",
    "5d82fd812f5cff2b0fa2f8ff",
    "5d82fd812f5cff2b0fa2f906",
    "5d82fd812f5cff2b0fa2f904",
    "5d82fd812f5cff2b0fa2f8ec",
    "5d82fd812f5cff2b0fa2f8fd",
    "5d82fd812f5cff2b0fa2f90b",
    "5d82fd812f5cff2b0fa2f905",
    "5d82fd812f5cff2b0fa2f8f5"
]