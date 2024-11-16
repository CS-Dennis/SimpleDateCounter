import moment from "moment";
import { MyDate } from "../Types/MyDate";
import { v4 as uuidv4 } from "uuid";
import { constants, localStorageKeys } from "./Constants";

export const getHoursBetweenMoments = (
  startMoment: moment.Moment,
  endMoment: moment.Moment
): number => {
  const hours = endMoment.diff(startMoment, "hours");
  return hours;
};

export const getStringBetweenMoments = (
  startMoment: moment.Moment,
  endMoment: moment.Moment
): string => {
  const totalHours = getHoursBetweenMoments(startMoment, endMoment);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours - days * 24;

  return `${days} ${days > 1 ? "days" : "day"} ${hours} ${hours > 1 ? "hours" : "hour"
    }`;
};

// get the the moment object at 00:00:00 
export const getDateMoment = (currentMoment: moment.Moment) => {
  return moment(`${currentMoment.year()}-${currentMoment.month() + 1}-${currentMoment.date()}`, 'YYYY-MM-DD');
};

// {
//   uuid: {
//     dateTitle: "Birthday",
//     date: moment();
//   }
// }

export const saveMyDate = (myDate: MyDate) => {
  const uuid = uuidv4();
  console.log(uuid);
  var currentMyDates = JSON.parse(localStorage.getItem(localStorageKeys.myDates) || "{}");

  var withNewMyDate = { ...currentMyDates, [uuid]: { ...myDate } };

  localStorage.setItem(localStorageKeys.myDates, JSON.stringify(withNewMyDate));

};