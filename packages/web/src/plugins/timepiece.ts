const formatted = (milliseconds: number) => {
  if (!milliseconds) return "0:00:00"
  var hours = Math.floor(milliseconds / 3600000)
  var minutes = Math.floor((milliseconds % 3600000) / 60000)
  var seconds = ((milliseconds % 60000) / 1000).toFixed(0)

  if (Number(seconds) == 60) minutes += 1
  if (minutes == 60) hours += 1

  return hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds
}

const unformatted = (time: string) => {
  if (!/^\d+:\d{2}$/.test(time)) return 0

  var [minutes, seconds] = time.split(':').map(n => Number(n))

  return (minutes * 60000) + (seconds * 1000)
}

export { formatted as timepiece, unformatted as untimepiece }
