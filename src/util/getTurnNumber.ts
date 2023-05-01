function getTurnNumber(jsonString) {
  const regex = /Turn (\d+)/;
  const match = jsonString.match(regex);
  if (match) {
    return match[1];
  } else {
    return null;
  }
}

export default getTurnNumber;