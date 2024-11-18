import moment from "moment";
import { MyDate } from "../Types/MyDate";
import { v4 as uuidv4 } from "uuid";
import { localStorageKeys } from "./Constants";

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
  var totalHours = getHoursBetweenMoments(startMoment, endMoment);
  // console.log("totalHours", totalHours);
  const negative = totalHours < 0;

  if (negative) {
    totalHours = -totalHours;
  }

  const days = Math.floor(totalHours / 24);
  const hours = totalHours - days * 24;

  return `${days !== 0 ? days : ``} ${days == 0 ? `` : (days > 1 ? "days" : "day")} ${hours} ${hours > 1 ? "hours" : "hour"} ${negative ? `ago` : ``} `;
};

// get the the moment object at 00:00:00 
export const getDateMoment = (currentMoment: moment.Moment) => {
  return moment(`${currentMoment.year()}-${currentMoment.month() + 1}-${currentMoment.date()}`, 'YYYY-MM-DD');
};

// localStorage myDates object example
// {
//   uuid: {
//     dateTitle: "Birthday",
//     date: moment();
//   },
//   uuid: {
//     dateTitle: "Birthday",
//     date: moment();
//   }
// }

export const saveMyDate = (myDate: MyDate) => {
  const uuid = uuidv4();
  // console.log(uuid);
  var currentMyDates = JSON.parse(localStorage.getItem(localStorageKeys.myDates) || "{}");

  var withNewMyDate = { ...currentMyDates, [uuid]: { ...myDate } };

  localStorage.setItem(localStorageKeys.myDates, JSON.stringify(withNewMyDate));

};

export const getMyDateByKey = (key: string) => {
  const myDate = JSON.parse(localStorage.getItem(localStorageKeys.myDates) || "{}")[key];
  return { [key]: myDate };
};

export const updateMyDate = (myDateKey: string, myDate: MyDate) => {
  var currentMyDates = JSON.parse(localStorage.getItem(localStorageKeys.myDates) || "{}");

  currentMyDates = { ...currentMyDates, [myDateKey]: myDate };

  localStorage.setItem(localStorageKeys.myDates, JSON.stringify(currentMyDates));
};

export const deleteMyDate = (myDateKey: string) => {
  var currentMyDates = JSON.parse(localStorage.getItem(localStorageKeys.myDates) || "{}");
  var keys = Object.keys(currentMyDates);

  var newMyDates = {};
  keys.forEach(key => {
    if (key !== myDateKey) {
      newMyDates = { ...newMyDates, [key]: currentMyDates[key] };
    }
  });

  localStorage.setItem(localStorageKeys.myDates, JSON.stringify(newMyDates));
};