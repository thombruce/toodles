const formatted = (milliseconds: number) => {
  if (!milliseconds) return "0:00"
  var minutes = Math.floor(milliseconds / 60000)
  var seconds = ((milliseconds % 60000) / 1000).toFixed(0)
  return Number(seconds) == 60 ? (minutes+1) + ":00" : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds
}

const unformatted = (time: string) => {
  if (!/^\d+:\d{2}$/.test(time)) return 0

  var [minutes, seconds] = time.split(':').map(n => Number(n))

  return (minutes * 60000) + (seconds * 1000)
}

export { formatted as timepiece, unformatted as untimepiece }
