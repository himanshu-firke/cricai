export const teams = {
  batting: {
    name: "Mumbai Indians",
    short: "MI",
    color: "#004BA0",
    logo: "🔵",
  },
  bowling: {
    name: "Chennai Super Kings",
    short: "CSK",
    color: "#FFCC00",
    logo: "🟡",
  },
};

export const players = {
  MI: {
    batsmen: [
      { name: "Rohit Sharma", role: "Opener", style: "Aggressive", avgSR: 140, avg: 32, fantasyBase: 35 },
      { name: "Ishan Kishan", role: "Opener", style: "Aggressive", avgSR: 135, avg: 28, fantasyBase: 30 },
      { name: "Suryakumar Yadav", role: "Middle Order", style: "360°", avgSR: 155, avg: 35, fantasyBase: 40 },
      { name: "Tilak Varma", role: "Middle Order", style: "Anchor", avgSR: 130, avg: 30, fantasyBase: 25 },
      { name: "Hardik Pandya", role: "Finisher", style: "Power", avgSR: 145, avg: 27, fantasyBase: 38 },
      { name: "Tim David", role: "Finisher", style: "Power", avgSR: 160, avg: 22, fantasyBase: 28 },
      { name: "Nehal Wadhera", role: "Middle Order", style: "Anchor", avgSR: 125, avg: 24, fantasyBase: 20 },
    ],
    bowlers: [
      { name: "Jasprit Bumrah", role: "Fast", economy: 6.5, wicketRate: 0.25, fantasyBase: 42 },
      { name: "Trent Boult", role: "Fast", economy: 7.8, wicketRate: 0.2, fantasyBase: 30 },
      { name: "Piyush Chawla", role: "Spin", economy: 7.5, wicketRate: 0.18, fantasyBase: 22 },
    ],
  },
  CSK: {
    batsmen: [
      { name: "Ruturaj Gaikwad", role: "Opener", style: "Classical", avgSR: 130, avg: 38, fantasyBase: 36 },
      { name: "Devon Conway", role: "Opener", style: "Anchor", avgSR: 125, avg: 35, fantasyBase: 32 },
      { name: "Shivam Dube", role: "Middle Order", style: "Power", avgSR: 140, avg: 28, fantasyBase: 26 },
      { name: "Ravindra Jadeja", role: "All-rounder", style: "Left-hand", avgSR: 130, avg: 26, fantasyBase: 38 },
      { name: "MS Dhoni", role: "Finisher", style: "Calm", avgSR: 135, avg: 25, fantasyBase: 30 },
    ],
    bowlers: [
      { name: "Matheesha Pathirana", role: "Fast", economy: 7.2, wicketRate: 0.22, fantasyBase: 32 },
      { name: "Deepak Chahar", role: "Fast (Swing)", economy: 7.0, wicketRate: 0.2, fantasyBase: 28 },
      { name: "Ravindra Jadeja", role: "Spin", economy: 6.8, wicketRate: 0.18, fantasyBase: 38 },
      { name: "Maheesh Theekshana", role: "Spin", economy: 7.0, wicketRate: 0.19, fantasyBase: 26 },
    ],
  },
};

export const firstInningsScore = {
  team: "CSK",
  runs: 178,
  wickets: 6,
  overs: 20,
  topScorer: "Ruturaj Gaikwad 62(41)",
  keyBowler: "Bumrah 4-0-28-2",
};

export const ballByBall = [
  // Over 1 — Deepak Chahar to Rohit Sharma
  { over: 0.1, bowler: "Deepak Chahar", batsman: "Rohit Sharma", result: "dot", runs: 0, commentary: "Good length outside off, left alone." },
  { over: 0.2, bowler: "Deepak Chahar", batsman: "Rohit Sharma", result: "4", runs: 4, commentary: "Short and wide, punched through covers! FOUR!" },
  { over: 0.3, bowler: "Deepak Chahar", batsman: "Rohit Sharma", result: "1", runs: 1, commentary: "Worked off the pads for a single." },
  { over: 0.4, bowler: "Deepak Chahar", batsman: "Ishan Kishan", result: "dot", runs: 0, commentary: "Big inswinger, beaten outside edge." },
  { over: 0.5, bowler: "Deepak Chahar", batsman: "Ishan Kishan", result: "6", runs: 6, commentary: "Dances down the track, massive SIX over long-on!" },
  { over: 1.0, bowler: "Deepak Chahar", batsman: "Ishan Kishan", result: "2", runs: 2, commentary: "Flicked to deep mid-wicket, good running." },

  // Over 2 — Pathirana to Rohit
  { over: 1.1, bowler: "Pathirana", batsman: "Rohit Sharma", result: "dot", runs: 0, commentary: "Yorker, dug out back to the bowler." },
  { over: 1.2, bowler: "Pathirana", batsman: "Rohit Sharma", result: "4", runs: 4, commentary: "Full toss on leg, whipped through mid-wicket! FOUR!" },
  { over: 1.3, bowler: "Pathirana", batsman: "Rohit Sharma", result: "1", runs: 1, commentary: "Slower ball, tapped to point for one." },
  { over: 1.4, bowler: "Pathirana", batsman: "Ishan Kishan", result: "dot", runs: 0, commentary: "Bouncer! Kishan ducks under it." },
  { over: 1.5, bowler: "Pathirana", batsman: "Ishan Kishan", result: "4", runs: 4, commentary: "Short ball, pulled in front of square! FOUR!" },
  { over: 2.0, bowler: "Pathirana", batsman: "Ishan Kishan", result: "1", runs: 1, commentary: "Pushed to cover for a quick single." },

  // Over 3 — Chahar to Rohit
  { over: 2.1, bowler: "Deepak Chahar", batsman: "Rohit Sharma", result: "6", runs: 6, commentary: "Steps out and launches it over long-off! HUGE SIX!" },
  { over: 2.2, bowler: "Deepak Chahar", batsman: "Rohit Sharma", result: "1", runs: 1, commentary: "Driven to long-off for one." },
  { over: 2.3, bowler: "Deepak Chahar", batsman: "Ishan Kishan", result: "WICKET", runs: 0, commentary: "BOWLED! Chahar gets Kishan! Ball nips back and hits middle stump.", dismissal: "Ishan Kishan b Chahar 13(8)", newBatsman: "Suryakumar Yadav" },
  { over: 2.4, bowler: "Deepak Chahar", batsman: "Suryakumar Yadav", result: "4", runs: 4, commentary: "First ball FOUR! SKY flicks it off his pads!" },
  { over: 2.5, bowler: "Deepak Chahar", batsman: "Suryakumar Yadav", result: "dot", runs: 0, commentary: "Good length, defended solidly." },
  { over: 3.0, bowler: "Deepak Chahar", batsman: "Suryakumar Yadav", result: "1", runs: 1, commentary: "Nudged to mid-on." },

  // Over 4 — Theekshana to Rohit
  { over: 3.1, bowler: "Theekshana", batsman: "Rohit Sharma", result: "1", runs: 1, commentary: "Swept fine for a single." },
  { over: 3.2, bowler: "Theekshana", batsman: "Suryakumar Yadav", result: "6", runs: 6, commentary: "Reverse sweep for SIX! SKY at his innovative best!" },
  { over: 3.3, bowler: "Theekshana", batsman: "Suryakumar Yadav", result: "4", runs: 4, commentary: "Stepped out and driven past mid-off. FOUR!" },
  { over: 3.4, bowler: "Theekshana", batsman: "Suryakumar Yadav", result: "1", runs: 1, commentary: "Tapped to short third for one." },
  { over: 3.5, bowler: "Theekshana", batsman: "Rohit Sharma", result: "dot", runs: 0, commentary: "Quicker ball, defended." },
  { over: 4.0, bowler: "Theekshana", batsman: "Rohit Sharma", result: "2", runs: 2, commentary: "Pulled to deep square, quick couple." },

  // Over 5 — Jadeja to SKY
  { over: 4.1, bowler: "Ravindra Jadeja", batsman: "Suryakumar Yadav", result: "dot", runs: 0, commentary: "Flight and turn, beaten outside edge." },
  { over: 4.2, bowler: "Ravindra Jadeja", batsman: "Suryakumar Yadav", result: "4", runs: 4, commentary: "Inside out over extra cover! Class shot. FOUR!" },
  { over: 4.3, bowler: "Ravindra Jadeja", batsman: "Suryakumar Yadav", result: "1", runs: 1, commentary: "Worked to midwicket." },
  { over: 4.4, bowler: "Ravindra Jadeja", batsman: "Rohit Sharma", result: "6", runs: 6, commentary: "Down on one knee, slog-swept for SIX! Into the stands!" },
  { over: 4.5, bowler: "Ravindra Jadeja", batsman: "Rohit Sharma", result: "1", runs: 1, commentary: "Pushed to long-on." },
  { over: 5.0, bowler: "Ravindra Jadeja", batsman: "Suryakumar Yadav", result: "2", runs: 2, commentary: "Cut to deep point, two taken." },

  // Over 6 — Pathirana to Rohit (end of powerplay)
  { over: 5.1, bowler: "Pathirana", batsman: "Rohit Sharma", result: "4", runs: 4, commentary: "Full and swinging, driven through the gap! FOUR!" },
  { over: 5.2, bowler: "Pathirana", batsman: "Rohit Sharma", result: "dot", runs: 0, commentary: "Yorker, jammed out." },
  { over: 5.3, bowler: "Pathirana", batsman: "Rohit Sharma", result: "WICKET", runs: 0, commentary: "CAUGHT! Rohit goes for the big one and holes out to deep midwicket!", dismissal: "Rohit Sharma c Conway b Pathirana 38(22)", newBatsman: "Tilak Varma" },
  { over: 5.4, bowler: "Pathirana", batsman: "Tilak Varma", result: "dot", runs: 0, commentary: "New batsman, good length, defended." },
  { over: 5.5, bowler: "Pathirana", batsman: "Tilak Varma", result: "1", runs: 1, commentary: "Off the mark with a push to mid-on." },
  { over: 6.0, bowler: "Pathirana", batsman: "Suryakumar Yadav", result: "4", runs: 4, commentary: "POWERPLAY ENDS with a FOUR! Slashed over point!" },

  // Over 7 — Jadeja to Tilak
  { over: 6.1, bowler: "Ravindra Jadeja", batsman: "Tilak Varma", result: "1", runs: 1, commentary: "Swept to fine leg." },
  { over: 6.2, bowler: "Ravindra Jadeja", batsman: "Suryakumar Yadav", result: "dot", runs: 0, commentary: "Tossed up, defended back." },
  { over: 6.3, bowler: "Ravindra Jadeja", batsman: "Suryakumar Yadav", result: "1", runs: 1, commentary: "Single to long-on." },
  { over: 6.4, bowler: "Ravindra Jadeja", batsman: "Tilak Varma", result: "4", runs: 4, commentary: "Charging down the track, lofted over mid-on! FOUR!" },
  { over: 6.5, bowler: "Ravindra Jadeja", batsman: "Tilak Varma", result: "dot", runs: 0, commentary: "Arm ball, beaten on the inside edge." },
  { over: 7.0, bowler: "Ravindra Jadeja", batsman: "Tilak Varma", result: "1", runs: 1, commentary: "Nudged to midwicket." },

  // Over 8 — Theekshana to SKY
  { over: 7.1, bowler: "Theekshana", batsman: "Suryakumar Yadav", result: "6", runs: 6, commentary: "SCOOPED for SIX! Audacious from SKY!" },
  { over: 7.2, bowler: "Theekshana", batsman: "Suryakumar Yadav", result: "dot", runs: 0, commentary: "Quicker, beats the attempted reverse." },
  { over: 7.3, bowler: "Theekshana", batsman: "Suryakumar Yadav", result: "1", runs: 1, commentary: "Pushed to cover." },
  { over: 7.4, bowler: "Theekshana", batsman: "Tilak Varma", result: "2", runs: 2, commentary: "Swept behind square, two runs." },
  { over: 7.5, bowler: "Theekshana", batsman: "Tilak Varma", result: "dot", runs: 0, commentary: "Flighted, defended." },
  { over: 8.0, bowler: "Theekshana", batsman: "Tilak Varma", result: "1", runs: 1, commentary: "Turned to leg for one." },

  // Over 9 — Pathirana to SKY
  { over: 8.1, bowler: "Pathirana", batsman: "Suryakumar Yadav", result: "4", runs: 4, commentary: "Slower ball, but SKY reads it and drives through covers! FOUR!" },
  { over: 8.2, bowler: "Pathirana", batsman: "Suryakumar Yadav", result: "1", runs: 1, commentary: "Back of a length, steered to third man." },
  { over: 8.3, bowler: "Pathirana", batsman: "Tilak Varma", result: "WICKET", runs: 0, commentary: "GONE! Tilak inside-edges onto the stumps! Pathirana strikes!", dismissal: "Tilak Varma b Pathirana 10(12)", newBatsman: "Hardik Pandya" },
  { over: 8.4, bowler: "Pathirana", batsman: "Hardik Pandya", result: "6", runs: 6, commentary: "First ball SIX! Pandya smashes it over long-on! Statement!" },
  { over: 8.5, bowler: "Pathirana", batsman: "Hardik Pandya", result: "dot", runs: 0, commentary: "Good yorker, dug out." },
  { over: 9.0, bowler: "Pathirana", batsman: "Hardik Pandya", result: "2", runs: 2, commentary: "Driven to long-off, two taken." },

  // Over 10 — Jadeja to SKY
  { over: 9.1, bowler: "Ravindra Jadeja", batsman: "Suryakumar Yadav", result: "WICKET", runs: 0, commentary: "STUMPED! SKY dances out but misses, Dhoni whips the bails off in a flash!", dismissal: "Suryakumar Yadav st Dhoni b Jadeja 52(30)", newBatsman: "Tim David" },
  { over: 9.2, bowler: "Ravindra Jadeja", batsman: "Tim David", result: "dot", runs: 0, commentary: "New batsman, pushed back." },
  { over: 9.3, bowler: "Ravindra Jadeja", batsman: "Tim David", result: "6", runs: 6, commentary: "TIM DAVID SPECIAL! Picks up the length and sends it into orbit! SIX!" },
  { over: 9.4, bowler: "Ravindra Jadeja", batsman: "Tim David", result: "1", runs: 1, commentary: "Worked to midwicket." },
  { over: 9.5, bowler: "Ravindra Jadeja", batsman: "Hardik Pandya", result: "4", runs: 4, commentary: "Swept fine, finds the gap! FOUR!" },
  { over: 10.0, bowler: "Ravindra Jadeja", batsman: "Hardik Pandya", result: "1", runs: 1, commentary: "Pushed to long-off. HALFWAY! MI 105/4 after 10 overs." },

  // Over 11 — Chahar to Tim David
  { over: 10.1, bowler: "Deepak Chahar", batsman: "Tim David", result: "dot", runs: 0, commentary: "Back of a length, plays and misses." },
  { over: 10.2, bowler: "Deepak Chahar", batsman: "Tim David", result: "4", runs: 4, commentary: "Short ball, pulled powerfully! FOUR to deep midwicket!" },
  { over: 10.3, bowler: "Deepak Chahar", batsman: "Tim David", result: "1", runs: 1, commentary: "Driven to mid-off." },
  { over: 10.4, bowler: "Deepak Chahar", batsman: "Hardik Pandya", result: "2", runs: 2, commentary: "Clipped off the pads, two to fine leg." },
  { over: 10.5, bowler: "Deepak Chahar", batsman: "Hardik Pandya", result: "6", runs: 6, commentary: "PANDYA POWER! Launches it downtown! MASSIVE SIX!" },
  { over: 11.0, bowler: "Deepak Chahar", batsman: "Hardik Pandya", result: "1", runs: 1, commentary: "Single to keep strike rotating." },

  // Over 12 — Theekshana to Tim David
  { over: 11.1, bowler: "Theekshana", batsman: "Tim David", result: "6", runs: 6, commentary: "Steps down and launches! SIX over long-on! Tim David is in the zone!" },
  { over: 11.2, bowler: "Theekshana", batsman: "Tim David", result: "dot", runs: 0, commentary: "Quicker ball, beaten." },
  { over: 11.3, bowler: "Theekshana", batsman: "Tim David", result: "2", runs: 2, commentary: "Swept to deep square." },
  { over: 11.4, bowler: "Theekshana", batsman: "Tim David", result: "1", runs: 1, commentary: "Single to long-on." },
  { over: 11.5, bowler: "Theekshana", batsman: "Hardik Pandya", result: "4", runs: 4, commentary: "Reverse swept for FOUR! Pandya showing his full range." },
  { over: 12.0, bowler: "Theekshana", batsman: "Hardik Pandya", result: "1", runs: 1, commentary: "Pushed for a single." },

  // Over 13 — Pathirana to Tim David
  { over: 12.1, bowler: "Pathirana", batsman: "Tim David", result: "WICKET", runs: 0, commentary: "CAUGHT! Top edge on the pull, Gaikwad takes it at fine leg!", dismissal: "Tim David c Gaikwad b Pathirana 21(11)", newBatsman: "Nehal Wadhera" },
  { over: 12.2, bowler: "Pathirana", batsman: "Nehal Wadhera", result: "dot", runs: 0, commentary: "Defended solidly. New man in." },
  { over: 12.3, bowler: "Pathirana", batsman: "Nehal Wadhera", result: "1", runs: 1, commentary: "Off the mark, pushed to mid-on." },
  { over: 12.4, bowler: "Pathirana", batsman: "Hardik Pandya", result: "4", runs: 4, commentary: "Full ball, driven on the up through extra cover! Gorgeous FOUR!" },
  { over: 12.5, bowler: "Pathirana", batsman: "Hardik Pandya", result: "dot", runs: 0, commentary: "Slower ball, mistimed." },
  { over: 13.0, bowler: "Pathirana", batsman: "Hardik Pandya", result: "2", runs: 2, commentary: "Flicked to deep square, two runs." },

  // Over 14 — Jadeja to Nehal
  { over: 13.1, bowler: "Ravindra Jadeja", batsman: "Nehal Wadhera", result: "1", runs: 1, commentary: "Pushed to long-on." },
  { over: 13.2, bowler: "Ravindra Jadeja", batsman: "Hardik Pandya", result: "6", runs: 6, commentary: "HUGE SIX! Pandya goes big over cow corner! Game ON!" },
  { over: 13.3, bowler: "Ravindra Jadeja", batsman: "Hardik Pandya", result: "1", runs: 1, commentary: "Single to deep cover." },
  { over: 13.4, bowler: "Ravindra Jadeja", batsman: "Nehal Wadhera", result: "dot", runs: 0, commentary: "Arm ball, defended." },
  { over: 13.5, bowler: "Ravindra Jadeja", batsman: "Nehal Wadhera", result: "2", runs: 2, commentary: "Swept behind square, two runs." },
  { over: 14.0, bowler: "Ravindra Jadeja", batsman: "Nehal Wadhera", result: "1", runs: 1, commentary: "Turned to leg side." },

  // Over 15 — Chahar to Pandya
  { over: 14.1, bowler: "Deepak Chahar", batsman: "Hardik Pandya", result: "4", runs: 4, commentary: "Driven through mid-off! Racing to the boundary. FOUR!" },
  { over: 14.2, bowler: "Deepak Chahar", batsman: "Hardik Pandya", result: "dot", runs: 0, commentary: "Good yorker, dug out." },
  { over: 14.3, bowler: "Deepak Chahar", batsman: "Hardik Pandya", result: "1", runs: 1, commentary: "Pushed for a single." },
  { over: 14.4, bowler: "Deepak Chahar", batsman: "Nehal Wadhera", result: "dot", runs: 0, commentary: "Short, ducked under." },
  { over: 14.5, bowler: "Deepak Chahar", batsman: "Nehal Wadhera", result: "2", runs: 2, commentary: "Pulled to deep midwicket, two." },
  { over: 15.0, bowler: "Deepak Chahar", batsman: "Nehal Wadhera", result: "1", runs: 1, commentary: "Squeezed to third man." },

  // Over 16 — Pathirana to Pandya (death overs begin)
  { over: 15.1, bowler: "Pathirana", batsman: "Hardik Pandya", result: "6", runs: 6, commentary: "PANDYA LAUNCHES! Full toss dispatched over midwicket! SIX!" },
  { over: 15.2, bowler: "Pathirana", batsman: "Hardik Pandya", result: "wide", runs: 1, commentary: "Wide down legside." },
  { over: 15.2, bowler: "Pathirana", batsman: "Hardik Pandya", result: "1", runs: 1, commentary: "Slower ball, pushed for one." },
  { over: 15.3, bowler: "Pathirana", batsman: "Nehal Wadhera", result: "dot", runs: 0, commentary: "Yorker, can't get under it." },
  { over: 15.4, bowler: "Pathirana", batsman: "Nehal Wadhera", result: "4", runs: 4, commentary: "INSIDE EDGE! Runs away to fine leg for FOUR!" },
  { over: 15.5, bowler: "Pathirana", batsman: "Nehal Wadhera", result: "1", runs: 1, commentary: "Single to third man." },
  { over: 16.0, bowler: "Pathirana", batsman: "Hardik Pandya", result: "2", runs: 2, commentary: "Driven to long-off, two taken." },

  // Over 17 — Chahar to Pandya
  { over: 16.1, bowler: "Deepak Chahar", batsman: "Hardik Pandya", result: "4", runs: 4, commentary: "Short ball, PULLED for FOUR! Pandya racing to his fifty!" },
  { over: 16.2, bowler: "Deepak Chahar", batsman: "Hardik Pandya", result: "1", runs: 1, commentary: "FIFTY! Pushed for a single and the crowd goes wild! 50 off 29 balls!" },
  { over: 16.3, bowler: "Deepak Chahar", batsman: "Nehal Wadhera", result: "WICKET", runs: 0, commentary: "CAUGHT BEHIND! Wadhera edges the outswinger to Dhoni!", dismissal: "Nehal Wadhera c Dhoni b Chahar 9(13)", newBatsman: "Piyush Chawla" },
  { over: 16.4, bowler: "Deepak Chahar", batsman: "Piyush Chawla", result: "dot", runs: 0, commentary: "Defended. Tail in now." },
  { over: 16.5, bowler: "Deepak Chahar", batsman: "Piyush Chawla", result: "1", runs: 1, commentary: "Nudged for a single." },
  { over: 17.0, bowler: "Deepak Chahar", batsman: "Hardik Pandya", result: "6", runs: 6, commentary: "ENORMOUS SIX! Pandya clears long-on with ease! MI need 14 off 18." },

  // Over 18 — Pathirana to Pandya
  { over: 17.1, bowler: "Pathirana", batsman: "Hardik Pandya", result: "dot", runs: 0, commentary: "Wide yorker, can't connect." },
  { over: 17.2, bowler: "Pathirana", batsman: "Hardik Pandya", result: "4", runs: 4, commentary: "Full toss, smashed through midwicket! FOUR! MI closing in!" },
  { over: 17.3, bowler: "Pathirana", batsman: "Hardik Pandya", result: "1", runs: 1, commentary: "Single to long-on." },
  { over: 17.4, bowler: "Pathirana", batsman: "Piyush Chawla", result: "dot", runs: 0, commentary: "Outside off, left alone." },
  { over: 17.5, bowler: "Pathirana", batsman: "Piyush Chawla", result: "2", runs: 2, commentary: "Edged through slips area! Chawla gets two!" },
  { over: 18.0, bowler: "Pathirana", batsman: "Piyush Chawla", result: "1", runs: 1, commentary: "Single to get Pandya on strike." },

  // Over 19 — Jadeja to Pandya
  { over: 18.1, bowler: "Ravindra Jadeja", batsman: "Hardik Pandya", result: "4", runs: 4, commentary: "REVERSE SWEPT for FOUR! Only 2 needed now!" },
  { over: 18.2, bowler: "Ravindra Jadeja", batsman: "Hardik Pandya", result: "dot", runs: 0, commentary: "Quick ball, defended." },
  { over: 18.3, bowler: "Ravindra Jadeja", batsman: "Hardik Pandya", result: "4", runs: 4, commentary: "DRIVEN THROUGH COVERS! THAT'S IT! MI WIN BY 4 WICKETS! Pandya finishes it in style!" },
];

export const getMatchSummary = (ballIndex) => {
  let runs = 0;
  let wickets = 0;
  let extras = 0;
  const currentBatsmen = {};
  const bowlerStats = {};
  let lastBatsman = "";
  let lastBowler = "";

  const activeBalls = ballByBall.slice(0, ballIndex + 1);

  activeBalls.forEach((ball) => {
    if (ball.result === "wide" || ball.result === "no-ball") {
      extras += ball.runs;
      runs += ball.runs;
    } else if (ball.result === "WICKET") {
      wickets++;
    } else {
      runs += ball.runs;
    }

    if (!currentBatsmen[ball.batsman]) {
      currentBatsmen[ball.batsman] = { runs: 0, balls: 0, fours: 0, sixes: 0, out: false };
    }
    if (ball.result !== "wide") {
      currentBatsmen[ball.batsman].balls++;
    }
    if (ball.result === "WICKET") {
      currentBatsmen[ball.batsman].out = true;
      currentBatsmen[ball.batsman].dismissal = ball.dismissal;
    } else if (ball.result !== "wide" && ball.result !== "no-ball") {
      currentBatsmen[ball.batsman].runs += ball.runs;
      if (ball.runs === 4) currentBatsmen[ball.batsman].fours++;
      if (ball.runs === 6) currentBatsmen[ball.batsman].sixes++;
    }

    if (!bowlerStats[ball.bowler]) {
      bowlerStats[ball.bowler] = { overs: 0, balls: 0, runs: 0, wickets: 0 };
    }
    if (ball.result !== "wide") {
      bowlerStats[ball.bowler].balls++;
    }
    if (ball.result === "WICKET") {
      bowlerStats[ball.bowler].wickets++;
    }
    bowlerStats[ball.bowler].runs += ball.runs;

    lastBatsman = ball.result === "WICKET" && ball.newBatsman ? ball.newBatsman : ball.batsman;
    lastBowler = ball.bowler;
  });

  Object.keys(bowlerStats).forEach((b) => {
    bowlerStats[b].overs = Math.floor(bowlerStats[b].balls / 6) + (bowlerStats[b].balls % 6) / 10;
  });

  const lastBall = activeBalls[activeBalls.length - 1];
  const currentOver = lastBall ? lastBall.over : 0;
  const target = firstInningsScore.runs + 1;
  const remaining = target - runs;
  const ballsLeft = 120 - activeBalls.filter((b) => b.result !== "wide").length;
  const reqRate = ballsLeft > 0 ? ((remaining / ballsLeft) * 6).toFixed(2) : 0;
  const currentRR = currentOver > 0 ? (runs / currentOver).toFixed(2) : 0;

  return {
    runs,
    wickets,
    overs: currentOver,
    target,
    remaining,
    ballsLeft,
    reqRate,
    currentRR,
    extras,
    batsmen: currentBatsmen,
    bowlers: bowlerStats,
    lastBatsman,
    lastBowler,
    lastBall,
  };
};
