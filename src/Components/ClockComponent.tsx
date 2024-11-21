import { Box } from '@mui/material';
import { useState } from 'react';

export default function ClockComponent({ currentMoment }: any) {
  const [twentyFourMode, setTwentyFourMode] = useState(true);

  return (
    <>
      <Box
        className='font-bold timeComponent cursor-pointer'
        onClick={() => setTwentyFourMode(!twentyFourMode)}
      >
        {twentyFourMode ? (
          <>{currentMoment.format('HH:mm:ss')}</>
        ) : (
          <>{currentMoment.format('hh:mm:ss A')}</>
        )}
      </Box>
    </>
  );
}
