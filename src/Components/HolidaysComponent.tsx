import { Box, Grid2 as Grid } from "@mui/material";
import { constants } from "../Utils/Constants";
import { useEffect, useState } from "react";
import moment from "moment";
import DateCardComponent from "./DateCardComponent";

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
  }, []);

  return (
    <>
      <Box className='flex flex-col justify-center items-center text-2xl'>
        <Box className='font-bold text-3xl mb-2'>Upcoming Holidays</Box>
        <Grid container>
          <Grid size={{ xs: 12, md: 4, xl: 3 }}>
            <Box>
              <DateCardComponent
                currentMoment={currentMoment}
                nextMoment={newYear || moment()}
                dateName={constants.holidays.newYear}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4, xl: 3 }}>
            <Box>
              <DateCardComponent
                currentMoment={currentMoment}
                nextMoment={mlk || moment()}
                dateName={constants.holidays.MLK}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4, xl: 3 }}>
            <Box>
              <DateCardComponent
                currentMoment={currentMoment}
                nextMoment={washington || moment()}
                dateName={constants.holidays.washington}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4, xl: 3 }}>
            <Box>
              <DateCardComponent
                currentMoment={currentMoment}
                nextMoment={memorial || moment()}
                dateName={constants.holidays.memorialDay}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4, xl: 3 }}>
            <Box>
              <DateCardComponent
                currentMoment={currentMoment}
                nextMoment={juneteenth || moment()}
                dateName={constants.holidays.juneteenth}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4, xl: 3 }}>
            <Box>
              <DateCardComponent
                currentMoment={currentMoment}
                nextMoment={independence || moment()}
                dateName={constants.holidays.independenceDay}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4, xl: 3 }}>
            <Box>
              <DateCardComponent
                currentMoment={currentMoment}
                nextMoment={labor || moment()}
                dateName={constants.holidays.laborDay}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4, xl: 3 }}>
            <Box>
              <DateCardComponent
                currentMoment={currentMoment}
                nextMoment={columbus || moment()}
                dateName={constants.holidays.columbusDay}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4, xl: 3 }}>
            <Box>
              <DateCardComponent
                currentMoment={currentMoment}
                nextMoment={veterans || moment()}
                dateName={constants.holidays.veteransDay}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4, xl: 3 }}>
            <Box>
              <DateCardComponent
                currentMoment={currentMoment}
                nextMoment={thanksgiving || moment()}
                dateName={constants.holidays.thanksgivingDay}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4, xl: 3 }}>
            <Box>
              <DateCardComponent
                currentMoment={currentMoment}
                nextMoment={christmas || moment()}
                dateName={constants.holidays.christmasDay}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
