module.exports = {
  dateFormat(unix) {
    const date = new Date(unix);
    return date.toISOString();
  },
};
