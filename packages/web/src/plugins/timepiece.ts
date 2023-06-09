const formatted = (milliseconds: number) => {
  if (!milliseconds) return "0:00:00"
  var hours = Math.floor(milliseconds / 3600000)
  var minutes = Math.floor((milliseconds % 3600000) / 60000)
  var seconds = Number(((milliseconds % 60000) / 1000).toFixed())

  if (seconds == 60) minutes += 1
  if (minutes == 60) hours += 1

  return hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds
}

const unformatted = (time: string) => {
  if (!/^\d+(?::[0-5]\d){0,2}$/.test(time)) return 0

  var [hours, minutes, seconds] = time.split(':').map(n => Number(n))

  return Number(((hours * 3600000) + (minutes ? minutes * 60000 : 0) + (seconds ? seconds * 1000 : 0)).toFixed())
}

export { formatted as timepiece, unformatted as untimepiece }
