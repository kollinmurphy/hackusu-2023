import { Path } from "./types";

export const createOriginalPath = (): Path => {
  return {
    key: "original",
    tiles: [
      {
        x: -24,
        y: 400,
        width: 140,
        height: 110,
        orientation: "horizontal",
      },
      {
        x: 112,
        y: 405,
        width: 144,
        height: 100,
        orientation: "horizontal",
      },
      {
        x: 112,
        y: 264,
        width: 144,
        height: 100,
        orientation: "vertical",
      },
      {
        x: 112,
        y: 128,
        width: 144,
        height: 100,
        orientation: "vertical",
      },
      {
        x: 208,
        y: 150,
        width: 90,
        height: 100,
        orientation: "horizontal",
      },
      {
        x: 292,
        y: 150,
        width: 144,
        height: 100,
        orientation: "horizontal",
      },
      {
        x: 314,
        y: 244,
        width: 144,
        height: 85,
        orientation: "vertical",
      },
      {
        x: 314,
        y: 384,
        width: 144,
        height: 85,
        orientation: "vertical",
      },
      {
        x: 316,
        y: 384,
        width: 144,
        height: 85,
        orientation: "vertical",
      },
      {
        x: 316,
        y: 524,
        width: 144,
        height: 85,
        orientation: "vertical",
      },
      {
        x: 316,
        y: 664,
        width: 144,
        height: 85,
        orientation: "vertical",
      },
      {
        x: 236,
        y: 664,
        width: 84,
        height: 95,
        orientation: "horizontal",
      },
      {
        x: 126,
        y: 664,
        width: 114,
        height: 95,
        orientation: "horizontal",
      },
      {
        x: 42,
        y: 664,
        width: 144,
        height: 95,
        orientation: "vertical",
      },
      {
        x: 42,
        y: 805,
        width: 144,
        height: 95,
        orientation: "vertical",
      },
      {
        x: 132,
        y: 829,
        width: 144,
        height: 98,
        orientation: "horizontal",
      },
      {
        x: 272,
        y: 829,
        width: 144,
        height: 98,
        orientation: "horizontal",
      },
      {
        x: 412,
        y: 829,
        width: 144,
        height: 98,
        orientation: "horizontal",
      },
      {
        x: 552,
        y: 829,
        width: 128,
        height: 98,
        orientation: "horizontal",
      },
      {
        x: 668,
        y: 790,
        width: 128,
        height: 98,
        orientation: "vertical",
      },
      {
        x: 662,
        y: 650,
        width: 144,
        height: 98,
        orientation: "vertical",
      },
      {
        x: 662,
        y: 550,
        width: 104,
        height: 98,
        orientation: "vertical",
      },
      {
        x: 542,
        y: 555,
        width: 126,
        height: 98,
        orientation: "horizontal",
      },
      {
        x: 472,
        y: 514,
        width: 144,
        height: 78,
        orientation: "vertical",
      },
      {
        x: 472,
        y: 414,
        width: 104,
        height: 78,
        orientation: "vertical",
      },
      {
        x: 460,
        y: 330,
        width: 120,
        height: 88,
        orientation: "horizontal",
      },
      {
        x: 575,
        y: 330,
        width: 110,
        height: 88,
        orientation: "horizontal",
      },
      {
        x: 675,
        y: 270,
        width: 144,
        height: 78,
        orientation: "vertical",
      },
      {
        x: 675,
        y: 140,
        width: 134,
        height: 78,
        orientation: "vertical",
      },
      {
        x: 630,
        y: 52,
        width: 144,
        height: 98,
        orientation: "horizontal",
      },
      {
        x: 500,
        y: 54,
        width: 134,
        height: 98,
        orientation: "horizontal",
      },
      {
        x: 400,
        y: 68,
        width: 104,
        height: 90,
        orientation: "horizontal",
      },
      {
        x: 402,
        y: -30,
        width: 100,
        height: 90,
        orientation: "vertical",
      },
    ],
    computePoint: (distance) => {
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

      // 80 + 600 - 250
    },
  };
};
