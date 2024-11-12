import { DAYS } from "../constants/Days";

// convert unix timestamp to time
const getTime = (unixTime) => {
  let date = new Date(unixTime * 1000);
  let hours = date.getHours();
  let time = hours + ":" + "00";
  return time;
}

// convert unix timestamp to day
const getDay = (unixTime) => {
  let date = new Date(unixTime * 1000);
  let day = DAYS[date.getDay()];
  return day;
}

const getDate = (unixTime) => {
  let date = new Date(unixTime * 1000).getDate();
  return date;
}

export {getTime, getDay, getDate}
