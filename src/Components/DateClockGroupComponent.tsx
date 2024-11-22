import { Box, Tab, Tabs } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DateComponent from './DateComponent';
import ClockComponent from './ClockComponent';
import TimeZoneComponent from './TimeZoneComponent';
import DateCounterComponent from './DateCounterComponent';
import MyDatesComponents from './MyDatesComponents';
import HolidaysComponent from './HolidaysComponent';

export default function DateClockGroupComponent({
  newMyDateAdded,
  setNewMyDateAdded,
}: {
  newMyDateAdded: boolean;
  setNewMyDateAdded: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [currentMoment, setCurrentMoment] = useState<moment.Moment>(moment());
  const [tab, setTab] = useState(1);

  useEffect(() => {
    setInterval(() => {
      setCurrentMoment(moment());
    }, 100000);
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

      <Tabs value={tab} onChange={(_e, value) => setTab(value)} centered>
        <Tab label='Holidays' />
        <Tab label='My Dates' />
      </Tabs>

      {tab === 0 && (
        <Box className='mt-4'>
          <HolidaysComponent currentMoment={currentMoment} />
        </Box>
      )}

      {tab === 1 && (
        <Box className='mt-4'>
          <MyDatesComponents
            currentMoment={currentMoment}
            newMyDateAdded={newMyDateAdded}
            setNewMyDateAdded={setNewMyDateAdded}
          />
        </Box>
      )}
    </>
  );
}
