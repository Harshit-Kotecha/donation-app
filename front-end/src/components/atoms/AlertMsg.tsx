import { Alert } from '@mui/material';

interface AlertMsgProps {
  msg: string;
  severity?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export default function AlertMsg({
  msg,
  severity = 'success',
  className,
}: AlertMsgProps) {
  return (
    <Alert className={`${className || ''}`} severity={severity}>
      {msg}
    </Alert>
  );
}
