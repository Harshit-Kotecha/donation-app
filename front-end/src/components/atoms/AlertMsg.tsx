import { Alert } from '@mui/material';

interface AlertMsgProps {
  msg: string;
  severity?: 'success' | 'warning' | 'error' | 'info';
}

export default function AlertMsg({ msg, severity = 'success' }: AlertMsgProps) {
  return <Alert severity={severity}>{msg}</Alert>;
}
