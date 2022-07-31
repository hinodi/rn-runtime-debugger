export const consoleOverride = (customFunction = () => {}) => {
  const originLog = console.log;

  console.log = function (message, ...args) {
    customFunction(message, args);
    originLog.apply(this, arguments);
  };
};
