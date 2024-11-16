import { Box } from "@mui/material";
import { getStringBetweenMoments } from "../Utils/Utils";
import moment from "moment";
import { useContext } from "react";
import { AppContext } from "../App";

export default function DateCardComponent({
  currentMoment,
  nextMoment,
  dateName,
}: {
  currentMoment: moment.Moment;
  nextMoment: moment.Moment;
  dateName?: string;
}) {
  const context = useContext(AppContext);

  return (
    <>
      <Box
        className={
          (context.appTheme.matrixTheme
            ? `date-card-dark-theme `
            : `date-card-light-theme `) +
          `border-solid border-2 border-matrix_light_green p-4 mx-2 mb-2 flex flex-col justify-center items-center min-h-44 cursor-pointer`
        }
      >
        <Box className="dateCardTitle text-center" sx={{ fontSize: '2rem' }}>{dateName}</Box>
        <Box sx={{ fontSize: '1.5rem' }}>{nextMoment?.format("MM/DD/YYYY")}</Box>
        <Box sx={{ fontSize: '1.5rem' }}>
          {getStringBetweenMoments(currentMoment, nextMoment || currentMoment)}
        </Box>
      </Box>
    </>
  );
}
