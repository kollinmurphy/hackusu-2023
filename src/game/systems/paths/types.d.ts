export type Path = {
  key: string;
  tiles: Array<{
    x: number;
    y: number;
    orientation: "horizontal" | "vertical";
    width: number;
    height: number;
  }>;
  computePoint: (distance: number) => {
    x: number;
    y: number;
    completed: boolean;
  };
};
