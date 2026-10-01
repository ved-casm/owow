/**
 * Places we capture in — one famous landmark per country, pinned on the
 * footer's world map. `photo` is the file name in /public/img/places
 * (AVIF + JPEG; CC0 / Public Domain, see CREDITS.md there).
 */
export type Place = {
  name: string;
  country: string;
  lat: number;
  lon: number;
  photo: string;
};

// ordered so consecutive pings hop between regions
export const PLACES: Place[] = [
  { name: "Golden Gate Bridge", country: "USA", lat: 37.8199, lon: -122.4783, photo: "usa" },
  { name: "Eiffel Tower", country: "France", lat: 48.8584, lon: 2.2945, photo: "france" },
  { name: "Taj Mahal", country: "India", lat: 27.1751, lon: 78.0421, photo: "india" },
  { name: "Christ the Redeemer", country: "Brazil", lat: -22.9519, lon: -43.2105, photo: "brazil" },
  { name: "Zuma Rock", country: "Nigeria", lat: 9.1306, lon: 7.2306, photo: "nigeria" },
  { name: "Sydney Opera House", country: "Australia", lat: -33.8568, lon: 151.2153, photo: "australia" },
  { name: "Niagara Falls", country: "Canada", lat: 43.0896, lon: -79.0849, photo: "canada" },
  { name: "Colosseum", country: "Italy", lat: 41.8902, lon: 12.4922, photo: "italy" },
  { name: "Great Wall", country: "China", lat: 40.4319, lon: 116.5704, photo: "china" },
  { name: "Table Mountain", country: "South Africa", lat: -33.9628, lon: 18.4098, photo: "south-africa" },
  { name: "Guatapé", country: "Colombia", lat: 6.2333, lon: -75.1586, photo: "colombia" },
  { name: "Burj Khalifa", country: "UAE", lat: 25.1972, lon: 55.2744, photo: "dubai" },
  { name: "Big Ben", country: "United Kingdom", lat: 51.5007, lon: -0.1246, photo: "uk" },
  { name: "Marina Bay", country: "Singapore", lat: 1.2834, lon: 103.8607, photo: "singapore" },
  { name: "Arenal Volcano", country: "Costa Rica", lat: 10.4626, lon: -84.7032, photo: "costa-rica" },
];
