import { Box } from "@mui/material";
import React from "react";

export default function Theme() {
  return (
    <>
      <Box className='flex place-content-evenly min-h-screen'>
        <Box className='bg-matrix_dark text-white w-full flex justify-center items-center'>
          dark
        </Box>
        <Box className='bg-matrix_dark_green text-white w-full flex justify-center items-center'>
          dark green
        </Box>
        <Box className='bg-matrix_green text-white w-full flex justify-center items-center'>
          green
        </Box>
        <Box className='bg-matrix_light_green text-white w-full flex justify-center items-center'>
          light green
        </Box>
      </Box>
    </>
  );
}
