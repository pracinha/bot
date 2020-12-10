type Status = {
  name: string;
  description: string;
  time: number;
  god: string;
};

const weak: Status = {
  name: "Weak",
  description: `For at least 3 Seconds, victim deals at least 30% less damage.`,
  time: 3,
  god: `Aphrodite`,
};
const ruptured: Status = {
  name: "Ruptured",
  description: `For 3 Seconds, victim takes rapid damage every 0.2 seconds while moving.`,
  time: 3,
  god: `Poseidon`,
};
const hangover: Status = {
  name: "Hangover",
  description: `For 4 Seconds, victim takes damage every 0.5 seconds. Effect can stack up to 5 times by default.`,
  time: 4,
  god: `Dionysus`,
};
const marked: Status = {
  name: "Marked",
  description: `For 2.5 Seconds, victim has a higher chance of taking Critical damage from any attack.`,
  time: 2,
  god: `seconds	Artemis`,
};
const jolted: Status = {
  name: "Jolted",
  description: `Victim's next attack self-inflicts lightning
damage that harms itself and nearby foes.`,
  time: 10,
  god: "Zeus",
};
const exposed: Status = {
  name: "Exposed",
  description: `For 5 Seconds, victim takes more damage when
struck from behind.`,
  time: 5,
  god: `Athena`,
};
const doom: Status = {
  name: "Doom",
  description: `After at least 1 Second, victim takes a burst of
damage.`,
  time: 1,
  god: `Ares`,
};
const chill: Status = {
  name: "Chill",
  description: `Victim is slowed by 4%. Effect can stack up to 10
times.`,
  time: 8,
  god: `Demeter`,
};

/**
 * A map that, given a status name, return the full status object.
 *
 * Keys are Title case
 **/
export const statuses = [
  weak,
  ruptured,
  hangover,
  marked,
  jolted,
  exposed,
  doom,
  chill,
].reduce((statusMap, currentStatus) => {
  statusMap.set(currentStatus.name, currentStatus);
  return statusMap;
}, new Map<string, Status>());
