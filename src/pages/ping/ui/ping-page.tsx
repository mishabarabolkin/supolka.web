import { useSystemPing } from '@/entities/system';

export function PingPage() {
  const ping = useSystemPing();

  return <main>{ping.isSuccess ? ping.data.status : null}</main>;
}
