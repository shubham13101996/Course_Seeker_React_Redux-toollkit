export const useDebounce = (callback, delay) => {
  let timerId;

  return function () {
    let context = this,
      args = arguments;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback.apply(context, args);
    }, delay);
  };
};
