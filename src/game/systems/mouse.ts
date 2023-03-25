export type MouseCallbackId = number & { __mouseCallbackId: void };

type MouseEvent = "hover-in" | "hover-out" | "click" | "move";

type MouseListener = {
  key: MouseCallbackId;
  box: (BoundingBox & { type: "box" }) | BoundingCircle;
  type: MouseEvent;
  callback: () => void;
};

type ClickListener = Omit<MouseListener, "callback"> & {
  callback: (x: number, y: number) => void;
};

type MoveListener = Omit<MouseListener, "box" | "callback"> & {
  callback: (x: number, y: number) => void;
};

export type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type BoundingCircle = {
  type: "circle";
  x: number;
  y: number;
  radius: number;
};

const createCallbackId = (num: number) => num as MouseCallbackId;

export const createMouseSystem = ({
  canvas,
}: {
  canvas: HTMLCanvasElement;
}) => {
  const hoverIn: MouseListener[] = [];
  const hoverOut: MouseListener[] = [];
  const click: ClickListener[] = [];
  const move: MoveListener[] = [];

  let backlog: VoidFunction[] = [];
  let lastMove: { x: number; y: number } | null = null;

  let nextId = 1;

  // let points: { x: number; y: number }[] = [];

  const convertScreenToCanvasCoordinates = (x: number, y: number) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((x - rect.left) / (rect.right - rect.left)) * canvas.width,
      y: ((y - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    };
  };

  const mouseMoveHandler = (e: globalThis.MouseEvent) => {
    const { x, y } = convertScreenToCanvasCoordinates(e.clientX, e.clientY);
    lastMove = { x, y };
  };

  // const outputInfoToConsole = () => {
  //   if (points.length % 2 !== 0) return;
  //   const boxes = [];
  //   for (let i = 0; i < points.length; i += 2) {
  //     boxes.push({
  //       x: Math.round(points[i].x),
  //       y: Math.round(points[i].y),
  //       width: Math.round(points[i + 1].x - points[i].x),
  //       height: Math.round(points[i + 1].y - points[i].y),
  //     });
  //   }
  //   const stringified = JSON.stringify(boxes);
  //   console.log(stringified.substring(1, stringified.length - 1));
  // };

  const clickHandler = (e: globalThis.MouseEvent) => {
    const { x, y } = convertScreenToCanvasCoordinates(e.clientX, e.clientY);
    console.log(`click at ${x}, ${y}`);
    // points.push({ x, y });
    // outputInfoToConsole();
    for (let i = 0; i < click.length; i++) {
      const { box, callback } = click[i];
      if (box.type === "box") {
        if (
          x >= box.x &&
          x <= box.x + box.width &&
          y >= box.y &&
          y <= box.y + box.height
        )
          backlog.push(() => callback(x, y));
      } else {
        if (
          Math.sqrt(Math.pow(box.x - x, 2) + Math.pow(box.y - y, 2)) <=
          box.radius
        ) {
          backlog.push(() => callback(x, y));
        }
      }
    }
  };

  window.addEventListener("mousemove", mouseMoveHandler);
  window.addEventListener("click", clickHandler);

  return {
    update: () => {
      if (lastMove) {
        for (let i = 0; i < move.length; i++)
          move[i].callback(lastMove.x, lastMove.y);
        lastMove = null;
      }

      for (let i = 0; i < backlog.length; i++) backlog[i]();
      backlog = [];
    },
    subscribe: (
      props:
        | {
            type: "hover-in" | "hover-out";
            callback: () => void;
            box: BoundingBox;
          }
        | {
            type: "click";
            callback: (x: number, y: number) => void;
            box: (BoundingBox & { type: "box" }) | BoundingCircle;
          }
        | {
            type: "move";
            callback: (x: number, y: number) => void;
          }
    ) => {
      const id = createCallbackId(nextId++);
      if (props.type === "move") {
        move.push({
          key: id,
          type: props.type,
          callback: props.callback,
        });
      } else {
        const listener = {
          key: id,
          type: props.type,
          box: props.box,
          callback: props.callback,
        };
        switch (props.type) {
          case "hover-in":
            hoverIn.push(listener as any);
            break;
          case "hover-out":
            hoverOut.push(listener as any);
            break;
          case "click":
            click.push(listener as any);
            break;
        }
      }
      return id;
    },
    unsubscribe: (
      type: "hover-in" | "hover-out" | "click" | "move",
      id: MouseCallbackId
    ) => {
      const array =
        type === "move"
          ? move
          : type === "click"
          ? click
          : type === "hover-in"
          ? hoverIn
          : hoverOut;
      const index = array.findIndex((listener) => listener.key === id);
      if (index !== -1) array.splice(index, 1);
    },
    dispose: () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("click", clickHandler);
    },
  };
};

export type MouseSystem = ReturnType<typeof createMouseSystem>;
