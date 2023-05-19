const formatted = (milliseconds: number) => {
  var minutes = Math.floor(milliseconds / 60000)
  var seconds = ((milliseconds % 60000) / 1000).toFixed(0)
  return Number(seconds) == 60 ? (minutes+1) + ":00" : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds
}

export { formatted as timepiece }
