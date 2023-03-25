export type MouseCallbackId = number & { __mouseCallbackId: void };

type MouseEvent = "hover-in" | "hover-out" | "click" | "move";

type MouseListener = {
  key: MouseCallbackId;
  box: BoundingBox;
  type: MouseEvent;
  callback: () => void;
};

type MoveListener = Omit<MouseListener, "box" | "callback"> & {
  callback: (x: number, y: number) => void;
};

type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const createCallbackId = (num: number) => num as MouseCallbackId;

export const createMouseManager = ({
  canvas,
}: {
  canvas: HTMLCanvasElement;
}) => {
  const hoverIn: MouseListener[] = [];
  const hoverOut: MouseListener[] = [];
  const click: MouseListener[] = [];
  const move: MoveListener[] = [];

  let backlog: VoidFunction[] = [];
  let lastMove: { x: number; y: number } | null = null;

  let nextId = 1;

  const convertScreenToCanvasCoordinates = (x: number, y: number) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (x - rect.left) / (rect.right - rect.left) * canvas.width,
      y: (y - rect.top) / (rect.bottom - rect.top) * canvas.height,
    };
  };

  const mouseMoveHandler = (e: globalThis.MouseEvent) => {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    lastMove = { x, y };
  };

  const clickHandler = (e: globalThis.MouseEvent) => {
    const { x, y } = convertScreenToCanvasCoordinates(e.clientX, e.clientY);
    for (let i = 0; i < click.length; i++) {
      const { box, callback } = click[i];
      if (
        x >= box.x &&
        x <= box.x + box.width &&
        y >= box.y &&
        y <= box.y + box.height
      )
        backlog.push(callback);
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
            type: "hover-in" | "hover-out" | "click";
            callback: () => void;
            box: BoundingBox;
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
            hoverIn.push(listener);
            break;
          case "hover-out":
            hoverOut.push(listener);
            break;
          case "click":
            click.push(listener);
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

export type MouseManager = ReturnType<typeof createMouseManager>;
