import { Box } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DateComponent from './DateComponent';
import ClockComponent from './ClockComponent';
import TimeZoneComponent from './TimeZoneComponent';
import DateCounterComponent from './DateCounterComponent';

export default function DateClockGroupComponent() {
  const [currentMoment, setCurrentMoment] = useState<moment.Moment>(moment());

  useEffect(() => {
    setInterval(() => {
      setCurrentMoment(moment());
    }, 1000);
  }, []);

  return (
    <>
      <Box className='flex justify-center'>
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
    </>
  );
}
