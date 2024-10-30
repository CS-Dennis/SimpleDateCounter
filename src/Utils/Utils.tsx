import moment from "moment";

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

  return `${days} ${days > 1 ? "days" : "day"} ${hours} ${
    hours > 1 ? "hours" : "hour"
  }`;
};
