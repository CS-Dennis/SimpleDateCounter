import { Link } from "react-router-dom";
import ClockComponent from "../Components/ClockComponent";
import DateComponent from "../Components/DateComponent";
import { Box, Grid2 as Grid } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import TimeZoneComponent from "../Components/TimeZoneComponent";
import DateCounterComponent from "../Components/DateCounterComponent";
import HolidaysComponent from "../Components/HolidaysComponent";

export default function Home() {
  const [currentMoment, setCurrentMoment] = useState<moment.Moment>(moment());
  useEffect(() => {
    setInterval(() => {
      setCurrentMoment(moment());
    }, 1000);
  }, []);

  return (
    <>
      <Grid container className='dark-theme'>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box className='min-h-screen pb-10'>
            <Link to={"/theme"} className='underline'>
              Theme
            </Link>
            <Box className='flex justify-center mt-10'>
              <DateComponent currentMoment={currentMoment} />
            </Box>
            <Box className='flex justify-center'>
              <ClockComponent currentMoment={currentMoment} />
            </Box>
            <Box>
              <TimeZoneComponent currentMoment={currentMoment} />
            </Box>

            <Box className='mt-10'>
              <DateCounterComponent startDate={currentMoment} />
            </Box>

            <Box className='mt-4'>
              <HolidaysComponent currentMoment={currentMoment} />
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}></Grid>
      </Grid>
    </>
  );
}
