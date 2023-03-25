import { Path } from "../types";

export const computePoint: Path["computePoint"] = (distance) => {
  // TODO maybe through in randomness
  const segment0 = 150;
  const segment1 = segment0 + 250;
  const segment2 = segment1 + 180;
  const segment3 = segment2 + 505;
  const segment4 = segment3 + 250;
  const segment5 = segment4 + 170;
  const segment6 = segment5 + 600;
  const segment7 = segment6 + 275;
  const segment8 = segment7 + 185;
  const segment9 = segment8 + 225;
  const segment10 = segment9 + 195;
  const segment11 = segment10 + 270;
  const segment12 = segment11 + 260;
  const segment13 = segment12 + 160;

  const value = (() => {
    if (distance < segment0) {
      return {
        completed: false,
        x: distance,
        y: 405,
      };
    } else if (distance < segment1) {
      return {
        completed: false,
        x: 150,
        y: 405 - (distance - segment0),
      };
    } else if (distance < segment2) {
      return {
        completed: false,
        x: 150 + (distance - segment1),
        y: 155,
      };
    } else if (distance < segment3) {
      return {
        completed: false,
        x: 330,
        y: 155 + (distance - segment2),
      };
    } else if (distance < segment4) {
      return {
        completed: false,
        x: 330 - (distance - segment3),
        y: 660,
      };
    } else if (distance < segment5) {
      return {
        completed: false,
        x: 330 - 250,
        y: 660 + (distance - segment4),
      };
    } else if (distance < segment6) {
      return {
        completed: false,
        x: 80 + (distance - segment5),
        y: 660 + 170,
      };
    } else if (distance < segment7) {
      return {
        completed: false,
        x: 80 + 600,
        y: 660 + 170 - (distance - segment6),
      };
    } else if (distance < segment8) {
      return {
        completed: false,
        x: 80 + 600 - (distance - segment7),
        y: 660 + 170 - 275,
      };
    } else if (distance < segment9) {
      return {
        completed: false,
        x: 80 + 600 - 185,
        y: 660 + 170 - 275 - (distance - segment8),
      };
    } else if (distance < segment10) {
      return {
        completed: false,
        x: 80 + 600 - 185 + (distance - segment9),
        y: 660 + 170 - 275 - 225,
      };
    } else if (distance < segment11) {
      return {
        completed: false,
        x: 80 + 600 - 185 + 195,
        y: 660 + 170 - 275 - 225 - (distance - segment10),
      };
    } else if (distance < segment12) {
      return {
        completed: false,
        x: 690 - (distance - segment11),
        y: 60,
      };
    } else if (distance < segment13) {
      return {
        completed: false,
        x: 430,
        y: 60 - (distance - segment12),
      };
    } else {
      return {
        completed: true,
        x: 430,
        y: -100,
      };
    }
  })();
  return {
    x: value.x + 25,
    y: value.y + 35,
    completed: value.completed,
  };
};
