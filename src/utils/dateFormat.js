// 获取时间，功能待完善，时间可以继续写下去
const getNowDate = () => {
    const nowDate = new Date()
    const year = nowDate.getFullYear()
    const month = nowDate.getMonth() + 1
    const date = nowDate.getDate()

    const nowYearMonthDate = `${year}-${(month + '').padStart(2, '0')}-${(date + '').padStart(2, '0')}`
    return {
        nowYearMonthDate
    }
}

export {
    getNowDate
}