import { Box } from "@mui/material";

export default function DateComponent({ currentMoment }: any) {
  return (
    <>
      <Box className='text-4xl'>{currentMoment.format("MM/DD/YYYY")}</Box>
    </>
  );
}
