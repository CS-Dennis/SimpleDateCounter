import { Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useEffect, useState } from "react";

export default function DateCounterComponent({ startDate }: any) {
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);
  const [daysDiff, setDaysDiff] = useState<number>(0);
  const [hoursDiff, setHoursDiff] = useState<number>(0);

  useEffect(() => {
    console.log(moment.duration(endDate?.diff(startDate)).hours());

    const days = moment.duration(endDate?.diff(startDate)).days();
    const hours = moment.duration(endDate?.diff(startDate)).hours();
    setDaysDiff(days);
    setHoursDiff(hours);
  }, [endDate]);

  return (
    <>
      <Box className='flex justify-center'>
        <Box className='mr-10 text-4xl'>
          {`${daysDiff} `}
          {daysDiff < -1 || daysDiff > 1 ? `days ` : `day `}
          {`${hoursDiff} `}
          {hoursDiff < -1 || hoursDiff > 1 ? `hours ` : `hour `}
          until
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label='Date Picker'
              defaultValue={null}
              onChange={(target) => setEndDate(target)}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </>
  );
}
