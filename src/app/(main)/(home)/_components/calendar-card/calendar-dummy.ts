export type GymVisit = {
  id: number;
  date: string;
  gymName: string;
  gymLogoUrl: string;
};

export const dummyVisits: GymVisit[] = [
  {
    id: 1,
    date: "2026-05-03",
    gymName: "The Climb",
    gymLogoUrl: "https://placehold.co/40x40/65699a/ffffff?text=T",
  },
  {
    id: 2,
    date: "2026-05-07",
    gymName: "Boulder Lab",
    gymLogoUrl: "https://placehold.co/40x40/41636f/ffffff?text=B",
  },
  {
    id: 3,
    date: "2026-05-07",
    gymName: "Peak Gym",
    gymLogoUrl: "https://placehold.co/40x40/46566f/ffffff?text=P",
  },
  {
    id: 4,
    date: "2026-05-14",
    gymName: "Summit",
    gymLogoUrl: "https://placehold.co/40x40/ba1a1a/ffffff?text=S",
  },
  {
    id: 5,
    date: "2026-05-21",
    gymName: "Crux",
    gymLogoUrl: "https://placehold.co/40x40/111827/ffffff?text=C",
  },
];
