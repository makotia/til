import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/ja"

dayjs.extend(relativeTime)
dayjs.locale("ja")

export const strToDayjs = (str: string): dayjs.Dayjs => dayjs(str).add(9, "hours")

export const formatJA = (date: dayjs.Dayjs): string => date.format("YYYY年MM月DD日 HH時mm分ss秒")

export const formatRelative = (date: dayjs.Dayjs): string => date.fromNow()
