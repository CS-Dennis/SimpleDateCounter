import { Box } from "@mui/material";

export default function ClockComponent({ currentMoment }: any) {
  return (
    <>
      <Box className='font-bold text-8xl mt-10'>
        {currentMoment.format("HH:mm:ss")}
      </Box>
    </>
  );
}
