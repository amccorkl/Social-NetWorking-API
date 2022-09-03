module.exports = {
  dateFormat(unix) {
    const date = new Date(unix);
    console.log("date");
    return date.toISOString();
  },
};
