const moment = require("moment");

export let formatDate = (date: Date): string => {
  return moment(date).format("MMMM D, YYYY");
};
