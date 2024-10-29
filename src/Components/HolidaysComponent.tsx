import { Box } from "@mui/material";
import { constants } from "../Utils/Constants";
import { useEffect, useState } from "react";
import moment from "moment";

export default function HolidaysComponent({ currentMoment }: any) {
  const [newYear, setNewYear] = useState<moment.Moment>();
  const [mlk, setMlk] = useState<moment.Moment>();
  const [washington, setWashington] = useState<moment.Moment>();
  const [memorial, setMemorial] = useState<moment.Moment>();
  const [juneteenth, setJuneteenth] = useState<moment.Moment>();
  const [independence, setIndependence] = useState<moment.Moment>();
  const [labor, setLabor] = useState<moment.Moment>();
  const [columbus, setColumbus] = useState<moment.Moment>();
  const [veterans, setVeterans] = useState<moment.Moment>();
  const [thanksgiving, setThanksgiving] = useState<moment.Moment>();
  const [christmas, setChristmas] = useState<moment.Moment>();

  useEffect(() => {
    var currentYear = currentMoment.year();
    // for new year
    if (moment(currentYear + "-1-1", "YYYY-M-D").diff(currentMoment) < 0) {
      setNewYear(moment(currentYear + 1 + "-1-1", "YYYY-M-D"));
    } else {
      setNewYear(moment(currentYear + "-1-1", "YYYY-M-D"));
    }

    // MLK - third Monday of January
    var tempMlk =
      moment(currentYear + "-1-1", "YYYY-M-D")
        .day(1)
        .diff(moment(currentYear + "-1-1", "YYYY-M-D")) < 0
        ? moment(currentYear + "-1-1", "YYYY-M-D").day(1 + 7 + 7 + 7)
        : moment(currentYear + "-1-1", "YYYY-M-D").day(1 + 7 + 7);

    if (tempMlk.diff(currentMoment) < 0) {
      tempMlk =
        moment(currentYear + 1 + "-1-1", "YYYY-M-D")
          .day(1)
          .diff(moment(currentYear + 1 + "-1-1", "YYYY-M-D")) < 0
          ? moment(currentYear + 1 + "-1-1", "YYYY-M-D").day(1 + 7 + 7 + 7)
          : moment(currentYear + 1 + "-1-1", "YYYY-M-D").day(1 + 7 + 7);
    }
    setMlk(tempMlk);

    // Washington - third Monday of February
    var tempWashington =
      moment(currentYear + "-2-1", "YYYY-M-D")
        .day(1)
        .diff(moment(currentYear + "-2-1", "YYYY-M-D")) < 0
        ? moment(currentYear + "-2-1", "YYYY-M-D").day(1 + 7 + 7 + 7)
        : moment(currentYear + "-2-1", "YYYY-M-D").day(1 + 7 + 7);

    if (tempWashington.diff(currentMoment) < 0) {
      tempWashington =
        moment(currentYear + 1 + "-2-1", "YYYY-M-D")
          .day(1)
          .diff(moment(currentYear + 1 + "-2-1", "YYYY-M-D")) < 0
          ? moment(currentYear + 1 + "-2-1", "YYYY-M-D").day(1 + 7 + 7 + 7)
          : moment(currentYear + 1 + "-2-1", "YYYY-M-D").day(1 + 7 + 7);
    }
    setWashington(tempWashington);

    // Memorial Day - last Monday of May
    var tempMemorial =
      moment(currentYear + "-6-1", "YYYY-M-D")
        .day(1)
        .diff(moment(currentYear + "-6-1", "YYYY-M-D")) < 0
        ? moment(currentYear + "-6-1", "YYYY-M-D").day(1)
        : moment(currentYear + "-6-1", "YYYY-M-D").day(-6);

    if (tempMemorial.diff(currentMoment) < 0) {
      tempMemorial =
        moment(currentYear + 1 + "-6-1", "YYYY-M-D")
          .day(1)
          .diff(moment(currentYear + 1 + "-6-1", "YYYY-M-D")) < 0
          ? moment(currentYear + 1 + "-6-1", "YYYY-M-D").day(1)
          : moment(currentYear + 1 + "-6-1", "YYYY-M-D").day(-6);
    }
    setMemorial(tempMemorial);

    // juneteenth
    if (
      moment(currentMoment.year() + "-6-19", "YYYY-M-D").diff(currentMoment) < 0
    ) {
      setJuneteenth(moment(currentYear + 1 + "-6-19", "YYYY-M-D"));
    } else {
      setJuneteenth(moment(currentYear + "-6-19", "YYYY-M-D"));
    }

    // Independence Day
    if (
      moment(currentMoment.year() + "-7-4", "YYYY-M-D").diff(currentMoment) < 0
    ) {
      setIndependence(moment(currentYear + 1 + "-7-4", "YYYY-M-D"));
    } else {
      setIndependence(moment(currentYear + "-7-4", "YYYY-M-D"));
    }

    // labor day - first Monday of September
    var tempLabor =
      moment(currentYear + "-9-1", "YYYY-M-D")
        .day(1)
        .diff(moment(currentYear + "-9-1", "YYYY-M-D")) < 0
        ? moment(currentYear + "-9-1", "YYYY-M-D").day(1 + 7)
        : moment(currentYear + "-9-1", "YYYY-M-D").day(1);

    if (tempLabor.diff(currentMoment) < 0) {
      tempLabor =
        moment(currentYear + 1 + "-9-1", "YYYY-M-D")
          .day(1)
          .diff(moment(currentYear + 1 + "-9-1", "YYYY-M-D")) < 0
          ? moment(currentYear + 1 + "-9-1", "YYYY-M-D").day(1 + 7)
          : moment(currentYear + 1 + "-9-1", "YYYY-M-D").day(1);
    }
    setLabor(tempLabor);

    // columbus day - second Monday of October
    var tempColumbus =
      moment(currentYear + "-10-1", "YYYY-M-D")
        .day(1)
        .diff(moment(currentYear + "-10-1", "YYYY-M-D")) < 0
        ? moment(currentYear + "-10-1", "YYYY-M-D").day(1 + 7 + 7)
        : moment(currentYear + "-10-1", "YYYY-M-D").day(1 + 7);

    if (tempColumbus.diff(currentMoment) < 0) {
      tempColumbus =
        moment(currentYear + 1 + "-10-1", "YYYY-M-D")
          .day(1)
          .diff(moment(currentYear + 1 + "-10-1", "YYYY-M-D")) < 0
          ? moment(currentYear + 1 + "-10-1", "YYYY-M-D").day(1 + 7 + 7)
          : moment(currentYear + 1 + "-10-1", "YYYY-M-D").day(1 + 7);
    }
    setColumbus(tempColumbus);

    // Veterans Day
    if (
      moment(currentMoment.year() + "-11-11", "YYYY-M-D").diff(currentMoment) <
      0
    ) {
      setVeterans(moment(currentYear + 1 + "-11-11", "YYYY-M-D"));
    } else {
      setVeterans(moment(currentYear + "-11-11", "YYYY-M-D"));
    }

    // thanksgiving - fourth Thursday of November
    var tempThanksgiving =
      moment(currentYear + "-11-1", "YYYY-M-D")
        .day(4)
        .diff(moment(currentYear + "-11-1", "YYYY-M-D")) < 0
        ? moment(currentYear + "-11-1", "YYYY-M-D").day(4 + 7 + 7 + 7 + 7)
        : moment(currentYear + "-11-1", "YYYY-M-D").day(4 + 7 + 7 + 7);

    if (tempThanksgiving.diff(currentMoment) < 0) {
      tempThanksgiving =
        moment(currentYear + 1 + "-11-1", "YYYY-M-D")
          .day(4)
          .diff(moment(currentYear + 1 + "-11-1", "YYYY-M-D")) < 0
          ? moment(currentYear + 1 + "-11-1", "YYYY-M-D").day(4 + 7 + 7 + 7 + 7)
          : moment(currentYear + 1 + "-11-1", "YYYY-M-D").day(4 + 7 + 7 + 7);
    }
    setThanksgiving(tempThanksgiving);

    // Christmas Day
    if (
      moment(currentMoment.year() + "-12-25", "YYYY-M-D").diff(currentMoment) <
      0
    ) {
      setChristmas(moment(currentYear + 1 + "-12-25", "YYYY-M-D"));
    } else {
      setChristmas(moment(currentYear + "-12-25", "YYYY-M-D"));
    }

    console.log(
      moment(currentMoment.year() + "-1-1", "YYYY-M-D").diff(currentMoment)
    );

    console.log(currentMoment.toISOString());
  }, []);

  return (
    <>
      <Box className='flex flex-col justify-center items-center text-2xl'>
        <Box className='font-bold text-3xl mb-2'>Upcoming Holidays</Box>
        <Box>
          {constants.holidays.newYear} {` ${newYear?.format("MM/DD/YYYY")}`}
        </Box>
        <Box>
          {constants.holidays.MLK} {` ${mlk?.format("MM/DD/YYYY")}`}
        </Box>
        <Box>
          {constants.holidays.washington}
          {` ${washington?.format("MM/DD/YYYY")}`}
        </Box>
        <Box>
          {constants.holidays.memorialDay}
          {` ${memorial?.format("MM/DD/YYYY")}`}
        </Box>
        <Box>
          {constants.holidays.juneteenth}
          {` ${juneteenth?.format("MM/DD/YYYY")}`}
        </Box>
        <Box>
          {constants.holidays.independenceDay}
          {` ${independence?.format("MM/DD/YYYY")}`}
        </Box>
        <Box>
          {constants.holidays.laborDay} {` ${labor?.format("MM/DD/YYYY")}`}
        </Box>
        <Box>
          {constants.holidays.columbusDay}
          {` ${columbus?.format("MM/DD/YYYY")}`}
        </Box>
        <Box>
          {constants.holidays.veteransDay}
          {` ${veterans?.format("MM/DD/YYYY")}`}
        </Box>
        <Box>
          {constants.holidays.thanksgivingDay}
          {` ${thanksgiving?.format("MM/DD/YYYY")}`}
        </Box>
        <Box>
          {constants.holidays.christmasDay}
          {` ${christmas?.format("MM/DD/YYYY")}`}
        </Box>
      </Box>
    </>
  );
}
