import { Link } from "react-router-dom";
import ClockComponent from "../Components/ClockComponent";
import DateComponent from "../Components/DateComponent";
import { Box } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import TimeZoneComponent from "../Components/TimeZoneComponent";

export default function Home() {
  const [currentMoment, setCurrentMoment] = useState(moment());
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
          <Box className='flex justify-center'>
            <ClockComponent currentMoment={currentMoment} />
          </Box>
          <Box className='flex justify-center'>
            <DateComponent currentMoment={currentMoment} />
          </Box>
          <Box>
            <TimeZoneComponent currentMoment={currentMoment} />
          </Box>
        </Box>
      </div>
    </>
  );
}
