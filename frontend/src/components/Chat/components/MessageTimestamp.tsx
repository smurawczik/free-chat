import { format, intlFormatDistance } from "date-fns";
import { FC, useEffect, useState } from "react";

const formatTimeToDistance = (timestamp: string) => {
  return intlFormatDistance(new Date(timestamp), new Date());
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

  return <small>{format(new Date(timestamp), "HH:mm aaa")}</small>;
};
