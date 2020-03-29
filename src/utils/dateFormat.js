// 获取时间，功能待完善，时间可以继续写下去
function addZero(num) {
    return (num + '').padStart(2, '0')
}

const dateFormat = (itemDate = new Date()) => {
    let nowDate = new Date(itemDate)
    const year = nowDate.getFullYear()
    const month = nowDate.getMonth() + 1
    const date = nowDate.getDate()
    const hour = nowDate.getHours()
    const minute = nowDate.getMinutes()
    const second = nowDate.getSeconds()

    const getYearMonthDate = `${year}-${addZero(month)}-${addZero(date)}`
    const getNowTime = `${year}-${addZero(month)}-${addZero(date)} ${addZero(hour)}:${addZero(minute)}:${addZero(second)}`

    return {
        getYearMonthDate,
        getNowTime
    }
}

export {
    dateFormat
}