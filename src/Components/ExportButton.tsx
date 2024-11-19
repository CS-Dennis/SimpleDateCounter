import { Button } from '@mui/material';
import { exportHeaders, localStorageKeys } from '../Utils/Constants';
import { getDateMoment } from '../Utils/Utils';
import moment from 'moment';

export default function ExportButton() {
  const exportMyDates = () => {
    const exportData = exportHeaders.join(',') + '\n';

    const myDates = JSON.parse(
      localStorage.getItem(localStorageKeys.myDates) || `{}`
    );
    const dateKeys = Object.keys(myDates);
    const data = dateKeys.map((key) => {
      return (
        myDates[key].dateTitle +
        ',' +
        myDates[key].date +
        ',' +
        myDates[key].created +
        ',' +
        myDates[key].modified +
        '\n'
      );
    });

    const finalData = exportData + data.join('');

    if (dateKeys.length > 0) {
      const blob = new Blob([finalData], { type: 'text/csv' });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      link.download = `Export_MyDates_${getDateMoment(moment()).format(
        'MM-DD-YYYY'
      )}.csv`;

      document.body.appendChild(link);
      link.click();
      //   console.log(finalData);
    } else {
      console.log("You don't have any dates saved yet.");
    }
  };

  return (
    <>
      <Button variant='contained' onClick={() => exportMyDates()}>
        Export Dates
      </Button>
    </>
  );
}
