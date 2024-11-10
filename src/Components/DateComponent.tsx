import { Box } from "@mui/material";
import { useState } from "react";

export default function DateComponent({ currentMoment }: any) {
  const [shortDateMode, setShortDateMode] = useState(true);

  return (
    <>
      <Box
        className='cursor-pointer dateComponent'
        onClick={() => {
          setShortDateMode(!shortDateMode);
        }}
      >
        {shortDateMode
          ? currentMoment.format("MM/DD/YYYY")
          : currentMoment.format("MMMM Do YYYY")}
      </Box>
    </>
  );
}
