/**
 * export default 暴露的方法不需要用{}引入,随便起名字
 * export直接暴露的,需要用{}引入, 名字必需一样
 */

export function getTime() {
    const data = new Date()
    const y = data.getFullYear()
    const m = (data.getMonth() + 1) > 9 ? (data.getMonth() + 1) : '0' + (data.getMonth() + 1)
    const d = data.getDate() > 9 ? data.getDate() : '0' + data.getDate()
    const h = data.getHours() > 9 ? data.getHours() : '0' + data.getHours()
    const mm = data.getMinutes() > 9 ? data.getMinutes() : '0' + data.getMinutes()
    const s = data.getSeconds() > 9 ? data.getSeconds() : '0' + data.getSeconds()
    const dates = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
    return dates
}
/**
 * @description 时间戳转为标准时间
 */
export function FormData(date) {
    let s = new Date(date)
    let y = s.getFullYear()
    let m = (s.getMonth() + 1) < 10 ? '0' + (s.getMonth() + 1) : (s.getMonth() + 1)
    let dd = s.getDate() < 10 ? '0' + s.getDate() : s.getDate()
    let hh = s.getHours() < 10 ? '0' + s.getHours() : s.getHours()
    let mm = s.getMinutes() < 10 ? '0' + s.getMinutes() : s.getMinutes()
    let ss = s.getSeconds() < 10 ? '0' + s.getSeconds() : s.getSeconds()
    let enddate = y + '-' + m + '-' + dd + ' ' + hh + ':' + mm + ":" + ss
    return enddate
}