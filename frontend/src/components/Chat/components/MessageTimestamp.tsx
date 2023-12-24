import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { FC, useEffect, useState } from "react";

const formatTimeToDistance = (timestamp: string) => {
  return formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
    includeSeconds: true,
  });
};

export const MessageTimestamp: FC<{ timestamp: string }> = ({ timestamp }) => {
  const [formattedTime, setFormattedTime] = useState<string | null>(
    formatTimeToDistance(timestamp)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const formattedTime = formatTimeToDistance(timestamp);

      setFormattedTime(formattedTime);
    }, 30000);

    return () => clearInterval(interval);
  }, [timestamp]);

  if (!formattedTime) return null;

  return <small>{formattedTime}</small>;
};
