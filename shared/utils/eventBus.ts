// utils/eventBus.ts
import mitt from "mitt";

type Events = {
  tokenExpired: void;
};

export const eventBus = mitt<Events>();
