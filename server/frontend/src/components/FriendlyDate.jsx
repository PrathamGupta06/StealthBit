import React from 'react';
import { formatDistanceStrict, format } from 'date-fns';

const FriendlyDate = ({ date }) => {
  const cutoffDays = 30; 
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - cutoffDays);

  const formattedDate =
    new Date(date) > cutoffDate
      ? formatDistanceStrict(new Date(date), new Date(), { addSuffix: true })
      : format(new Date(date), 'PPP'); 

  return <span>{formattedDate}</span>;
};

export default FriendlyDate;
