/** Artificial delay for demonstrating skeleton loaders. Remove in production. */
const DEFAULT_LOADING_DELAY_MS = 1800;

export const delay = (ms = DEFAULT_LOADING_DELAY_MS) =>
  new Promise((resolve) => setTimeout(resolve, ms));
