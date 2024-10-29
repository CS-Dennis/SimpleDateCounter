import { Link } from "react-router-dom";
import ClockComponent from "../Components/ClockComponent";
import DateComponent from "../Components/DateComponent";
import { Box } from "@mui/material";
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
      <div className='text-matrix_dark'>
        <Box className='dark-theme min-h-screen'>
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

          <Box className='mt-10'>
            <HolidaysComponent currentMoment={currentMoment} />
          </Box>
        </Box>
      </div>
    </>
  );
}
