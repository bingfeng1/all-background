import React, { useState, useEffect } from 'react'
import { dateFormat } from '../../utils/dateFormat'

const Time = () => {
    const [nowTime, setNowTime] = useState("")

    useEffect(() => {
        let timer = setInterval(() => {
            setNowTime(() => {
                setNowTime(dateFormat().getNowTime)
            }, 1000)
        })
        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <>
            {nowTime}
        </>
    )
}

export default Time