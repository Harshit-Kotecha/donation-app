import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function MyDateTimePicker({ label, onAccept }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer components={['DateTimePicker']}> */}
      <DateTimePicker onAccept={onAccept} label={label} />
      {/* </DemoContainer> */}
    </LocalizationProvider>
  );
}
