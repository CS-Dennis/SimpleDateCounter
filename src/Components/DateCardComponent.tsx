import { Box } from "@mui/material";
import { getStringBetweenMoments } from "../Utils/Utils";
import moment from "moment";

export default function DateCardComponent({
  currentMoment,
  nextMoment,
  dateName,
}: {
  currentMoment: moment.Moment;
  nextMoment: moment.Moment;
  dateName?: string;
}) {
  return (
    <>
      <Box className='border-solid border-2 border-matrix_light_green p-4 mx-2 mb-2 flex flex-col justify-center items-center min-h-44'>
        <Box>{dateName}</Box>
        <Box>{nextMoment?.format("MM/DD/YYYY")}</Box>
        <Box>
          {getStringBetweenMoments(currentMoment, nextMoment || currentMoment)}
        </Box>
      </Box>
    </>
  );
}
