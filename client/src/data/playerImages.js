const IPL = (id) => `https://documents.iplt20.com/ipl/IPLHeadshot2024/${id}.png`;

const AVATAR = (name, bg, color) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=${color}&size=128&bold=true&format=png`;

const MI_BG = "004BA0";
const MI_FG = "ffffff";
const CSK_BG = "F9CD05";
const CSK_FG = "1a1a2e";

export const playerImages = {
  "Rohit Sharma":       IPL(6),
  "Ishan Kishan":       AVATAR("Ishan Kishan", MI_BG, MI_FG),
  "Suryakumar Yadav":   IPL(174),
  "Tilak Varma":        AVATAR("Tilak Varma", MI_BG, MI_FG),
  "Hardik Pandya":      IPL(54),
  "Tim David":          AVATAR("Tim David", MI_BG, MI_FG),
  "Nehal Wadhera":      AVATAR("Nehal Wadhera", MI_BG, MI_FG),
  "Jasprit Bumrah":     IPL(9),
  "Trent Boult":        AVATAR("Trent Boult", MI_BG, MI_FG),
  "Piyush Chawla":      AVATAR("Piyush Chawla", MI_BG, MI_FG),

  "Ruturaj Gaikwad":    IPL(102),
  "Devon Conway":       AVATAR("Devon Conway", CSK_BG, CSK_FG),
  "Shivam Dube":        IPL(211),
  "Ravindra Jadeja":    IPL(46),
  "MS Dhoni":           AVATAR("MS Dhoni", CSK_BG, CSK_FG),
  "Matheesha Pathirana": AVATAR("Matheesha Pathirana", CSK_BG, CSK_FG),
  "Deepak Chahar":      AVATAR("Deepak Chahar", CSK_BG, CSK_FG),
  "Maheesh Theekshana": AVATAR("Maheesh Theekshana", CSK_BG, CSK_FG),

  "Pathirana":          AVATAR("Matheesha Pathirana", CSK_BG, CSK_FG),
  "Theekshana":         AVATAR("Maheesh Theekshana", CSK_BG, CSK_FG),
};

const FALLBACK = AVATAR("Player", "1a1a2e", "5c5c78");

export function getPlayerImage(name) {
  return playerImages[name] || FALLBACK;
}
