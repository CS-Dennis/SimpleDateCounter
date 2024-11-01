import { Box } from "@mui/material";

export default function Theme() {
  return (
    <>
      <Box className='flex place-content-evenly min-h-screen'>
        <Box className='bg-matrix_dark text-white w-full flex justify-center items-center flex-col'>
          <Box>dark</Box>
          <Box>#262d1e</Box>
        </Box>
        <Box className='bg-matrix_dark_green text-white w-full flex justify-center items-center flex-col'>
          <Box>dark green</Box>
          <Box>#345530</Box>
        </Box>
        <Box className='bg-matrix_green text-white w-full flex justify-center items-center flex-col'>
          <Box>green</Box>
          <Box>#3b673f</Box>
        </Box>
        <Box className='bg-matrix_light_green text-white w-full flex justify-center items-center flex-col'>
          <Box>light green</Box>
          <Box>#5a8662</Box>
        </Box>
        <Box className='bg-matrix_white_green text-black w-full flex justify-center items-center flex-col'>
          <Box>white green</Box>
          <Box>#d3e3d5</Box>
        </Box>
        <Box className='bg-matrix_blue_green text-white w-full flex justify-center items-center flex-col'>
          <Box>blue green</Box>
          <Box>#008f11</Box>
        </Box>
        <Box className='bg-matrix_jade_green w-full flex justify-center items-center text-black flex-col'>
          <Box>jade green</Box>
          <Box>#00ff41</Box>
        </Box>
      </Box>
    </>
  );
}
