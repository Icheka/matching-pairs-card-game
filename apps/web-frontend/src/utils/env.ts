function createConsoleStub() {
  return Object.freeze(
    Object.keys(console).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: () => {},
      }),
      {}
    )
  ) as typeof console;
}

export const isDevMode = import.meta.env.DEV;

export const devOnlyConsole = isDevMode ? console : createConsoleStub();
