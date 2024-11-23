import { DAYS } from "../constants/Days";

// convert unix timestamp to time in HH:mm format
const getTime = (unixTime) => {
  let date = new Date(unixTime * 1000);
  let hours = date.getHours();
  let time = hours + ":" + "00";
  return time;
}

// convert unix timestamp to day of the week
const getDay = (unixTime) => {
  let date = new Date(unixTime * 1000);
  let day = DAYS[date.getDay()];
  return day;
}

// convert unix timestamp to day of the month
const getDate = (unixTime) => {
  let date = new Date(unixTime * 1000).getDate();
  return date;
}

export {getTime, getDay, getDate}
