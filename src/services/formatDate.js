export const formatTimestampDate = (date) => {
  var dateVal = new Date(parseInt(date));
  return dateVal.toLocaleDateString() + " " + dateVal.toLocaleTimeString();
};
