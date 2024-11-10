import ClockComponent from "../Components/ClockComponent";
import DateComponent from "../Components/DateComponent";
import { Box, Grid2 as Grid, Switch } from "@mui/material";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import TimeZoneComponent from "../Components/TimeZoneComponent";
import DateCounterComponent from "../Components/DateCounterComponent";
import HolidaysComponent from "../Components/HolidaysComponent";
import { AppContext } from "../App";

export default function Home() {
  const context = useContext(AppContext);

  const [currentMoment, setCurrentMoment] = useState<moment.Moment>(moment());

  const toggleTheme = () => {
    const newTheme = !context.appTheme.matrixTheme;
    context.setAppTheme({
      matrixTheme: newTheme,
    });
    localStorage.setItem("matrixTheme", newTheme.toString());
  };

  useEffect(() => {
    setInterval(() => {
      setCurrentMoment(moment());
    }, 1000);
  }, []);

  return (
    <>
      <Grid
        container
        className={context.appTheme.matrixTheme ? `dark-theme` : `light-theme`}
      >
        <Grid size={{ xs: 12, md: 2 }}></Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box className='min-h-screen pb-10'>
            <Box>
              <Box className='font-bold text-lg'>
                {context.appTheme.matrixTheme
                  ? "Theme: Matrix"
                  : "Theme: Light"}
              </Box>
              <Switch
                checked={localStorage.getItem("matrixTheme") === "true"}
                onChange={() => toggleTheme()}
              />
            </Box>
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
              <DateCounterComponent />
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
