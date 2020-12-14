/**
 * export default 暴露的方法不需要用{}引入,随便起名字
 * export直接暴露的,需要用{}引入, 名字必需一样
 */

export function getTime(){
    const data = new Date()
    const y = data.getFullYear()
    const m = (data.getMonth() + 1)>9 ? (data.getMonth() + 1) : '0' + (data.getMonth() + 1)
    const d = data.getDate()>9 ? data.getDate() : '0' + data.getDate()
    const h = data.getHours()>9 ? data.getHours() : '0' + data.getHours()
    const mm = data.getMinutes()>9 ? data.getMinutes() : '0' + data.getMinutes()
    const s = data.getSeconds()>9 ? data.getSeconds() : '0' + data.getSeconds()
    const dates = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
    return dates
}