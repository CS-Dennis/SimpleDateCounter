import { Box } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
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
    const hours = Math.round(totalHours - days * 24);
    setDaysDiff(days);
    setHoursDiff(hours);
  }, [endDate]);

  return (
    <>
      <Box className='flex justify-center'>
        <Box className='flex items-center mr-4 text-4xl '>
          {negtive && `-`}
          {`${daysDiff} `}
          {daysDiff < -1 || daysDiff > 1 ? `days ` : `day `}
          {`${hoursDiff} `}
          {hoursDiff < -1 || hoursDiff > 1 ? `hours ` : `hour `}
          until
        </Box>
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
      </Box>
    </>
  );
}
