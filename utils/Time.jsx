// convert unix timestamp to time
const getTime = (unixTime) => {
    let date = new Date(unixTime * 1000);
    let hours = date.getHours();
    let time = hours + ":" + "00";
    return time;
}

export {getTime}
