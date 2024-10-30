import { Box, Grid2 as Grid } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useEffect, useState } from "react";

export default function DateCounterComponent({ startDate }: any) {
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);
  const [daysDiff, setDaysDiff] = useState<number>(0);
  const [hoursDiff, setHoursDiff] = useState<number>(0);
  const [negtive, setNegtive] = useState(false);

  useEffect(() => {
    var totalHours = moment.duration(endDate?.diff(startDate)).asHours();
    if (totalHours < 0) {
      setNegtive(true);
      totalHours = -totalHours;
    } else {
      setNegtive(false);
    }
    const days = Math.floor(totalHours / 24);
    const hours = Math.floor(totalHours - days * 24);
    setDaysDiff(days);
    setHoursDiff(hours);
  }, [endDate]);

  return (
    <>
      <Box className='flex justify-center'>
        <Grid container>
          <Grid size={{ xs: 12, md: 8 }} className='flex justify-center'>
            <Box className='flex items-center text-4xl mb-4'>
              {negtive && `-`}
              {`${daysDiff} `}
              {daysDiff < -1 || daysDiff > 1 ? `days ` : `day `}
              {`${hoursDiff} `}
              {hoursDiff < -1 || hoursDiff > 1 ? `hours ` : `hour `}
              until
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} className='flex justify-center mb-4'>
            <Box>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileDatePicker
                  slotProps={{
                    actionBar: {
                      actions: ["today"],
                    },
                  }}
                  label='Date Picker'
                  defaultValue={null}
                  onChange={(target) => setEndDate(target)}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
