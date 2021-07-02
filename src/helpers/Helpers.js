export const generateDateTime = () => {
  const now = new Date();
  const options = {
    hour: ("0" + now.getHours()).slice(-2),
    minute: ("0" + now.getMinutes()).slice(-2),
    seconds: ("0" + now.getSeconds()).slice(-2),
    day: ("0" + now.getDate()).slice(-2),
    month: ("0" + (now.getMonth() + 1)).slice(-2),
    year: now.getFullYear(),
  };

  const formatedDate = `${options.year}-${options.month}-${options.day} ${options.hour}:${options.minute}:${options.seconds}`;
  return formatedDate;
};

export const OptionsTimeDate = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
};
export const localeTimeDate = navigator.language;
