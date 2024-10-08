import dayjs, { Dayjs } from 'dayjs'

import { datetime, Frequency, RRule, Weekday } from 'rrule'

function dayToWeekday(day) {
  if (/^mo/i.test(day)) return RRule.MO
  else if (/^tu/i.test(day)) return RRule.TU
  else if (/^we/i.test(day)) return RRule.WE
  else if (/^th/i.test(day)) return RRule.TH
  else if (/^fr/i.test(day)) return RRule.FR
  else if (/^sa/i.test(day)) return RRule.SA
  else if (/^su/i.test(day)) return RRule.SU
}

interface ScheduleInterface {
  start?: Date
  freq: Frequency
  days?: Weekday | Weekday[]
  interval?: Number
}

export class Schedule implements ScheduleInterface {
  freq: Frequency
  days?: Weekday | Weekday[]
  interval?: Number
  startDate?: Dayjs

  // Constructor
  constructor(schedule: ScheduleInterface) {
    this.start = schedule.start
    this.freq = schedule.freq
    this.days = schedule.days
    this.interval = schedule.interval
  }

  // Class methods
  static daily = (interval?: number):Schedule => new Schedule({ freq: RRule.DAILY, interval })
  static day = (day: Weekday):Schedule => new Schedule({ freq: RRule.DAILY, days: day })
  static days = (days: Weekday[]):Schedule => new Schedule({ freq: RRule.DAILY, days: days })
  static weekdays = ():Schedule => new Schedule({ freq: RRule.DAILY, days: [RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR] })
  static weekends = ():Schedule => new Schedule({ freq: RRule.DAILY, days: [RRule.SA, RRule.SU] })
  static weekly = (interval?: number):Schedule => new Schedule({ freq: RRule.WEEKLY, interval })
  static fortnightly = ():Schedule => new Schedule({ freq: RRule.WEEKLY, interval: 2 })
  static monthly = (interval?: number):Schedule => new Schedule({ freq: RRule.MONTHLY, interval })
  static yearly = (interval?: number):Schedule => new Schedule({ freq: RRule.YEARLY, interval })

  static fromString(str: string):Schedule {
    let match, interval, days
    if (/^weekdays?$/i.test(str)) return Schedule.weekdays()
    else if (/^weekends?$/i.test(str)) return Schedule.weekends()
    else if (/^fortnight$/i.test(str)) return Schedule.fortnightly()
    else if (([match, interval] = /^(\d+)?days?$/i.exec(str) || []).length) return Schedule.daily(interval)
    else if (([match, interval] = /^(\d+)?weeks?$/i.exec(str) || []).length) return Schedule.weekly(interval)
    else if (([match, interval] = /^fortnight$/i.exec(str) || []).length) return Schedule.fortnightly()
    else if (([match, interval] = /^(\d+)?months?$/i.exec(str) || []).length) return Schedule.monthly(interval)
    else if (([match, interval] = /^(\d+)?years?$/i.exec(str) || []).length) return Schedule.yearly(interval)
    else if (days = /^(?:(?:mon?(?!th)|tue?s?|we(?!ek)d?(?:nes)?|thu?r?s?|fri?|sat?(?:ur)?|sun?)(?:day)?,?)+$/i.exec(str)?.[0].split(',').filter(d => d)) return Schedule.days(days.map(d => dayToWeekday(d)))
    else return Schedule.daily()
  }

  // Instance methods: Getters
  get start():Date {
    if (this.startDate) return datetime(this.startDate.year(), this.startDate.month() + 1, this.startDate.date())
    const now = dayjs()
    return datetime(now.year(), now.month() + 1, now.date())
  }

  set start(date: any) {
    this.startDate = dayjs(date)
  }

  // Instance methods
  toRRule() {
    let rules:any = { freq: this.freq, dtstart: this.start }
    if (this.days) rules.byweekday = this.days
    if (this.interval) rules.interval = this.interval
  
    return new RRule(rules)  
  }

  next() {
    const today = dayjs()
    const start = this.startDate || today
    const after = start.isBefore(today, 'day') ? datetime(today.year(), today.month() + 1, today.date()) : this.start

    return this.toRRule().after(after)
  }
}
