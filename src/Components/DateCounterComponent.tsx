import { Box, Grid2 as Grid } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useEffect, useState } from "react";

export default function DateCounterComponent() {
  const [startDate, setStartDate] = useState<moment.Moment | null>(
    moment(moment().format("yyyy-MM-DD"))
  );
  const [endDate, setEndDate] = useState<moment.Moment | null>(
    moment(moment().format("yyyy-MM-DD")).add(1, "d")
  );

  const [daysDiff, setDaysDiff] = useState<number>(0);
  const [negtive, setNegtive] = useState(false);

  useEffect(() => {
    var totalHours = endDate?.diff(startDate, "hours") || 0;

    if (totalHours < 0) {
      setNegtive(true);
      totalHours = -totalHours;
    } else {
      setNegtive(false);
    }
    const days = Math.floor(totalHours / 24);
    setDaysDiff(days);
  }, [startDate, endDate]);

  return (
    <>
      <Box>
        <Grid container className='w-full'>
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
                  defaultValue={startDate}
                  onChange={(target) => setStartDate(target)}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }} className='flex justify-center'>
            <Box className='flex items-center text-4xl mb-4'>
              {negtive && `-`}
              {`${daysDiff} `}
              {daysDiff < -1 || daysDiff > 1 ? `days ` : `day `}
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
                  defaultValue={endDate}
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
