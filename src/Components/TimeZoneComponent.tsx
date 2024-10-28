import { Box } from "@mui/material";

export default function TimeZoneComponent({ currentMoment }: any) {
  return (
    <>
      <Box className='flex justify-center'>
        UTC{currentMoment.utcOffset() / 60}
      </Box>
    </>
  );
}
