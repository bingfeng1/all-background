// 计算机属性大屏展示
import React, { useState, useEffect, useRef, useContext } from 'react'
import { reqGetComputerInfo } from '../../api'
import { IsFullContext, drawGauge, drawPie } from '../../utils/charts'

// 仪表盘
// 05f8d6 - 0082fc - fdd845 - 22ed7c - 09b0d3 - 1d27c9 - f9e264 - f47a75 - 009db2 - 024b51- 0780cf - 765005​​​​​​​
const GaugeChart = ({ data = 0 }) => {
    const chart_ref = useRef(undefined)
    const [chart, setChart] = useState(undefined)
    // 判断是否为全局
    const isFull = useContext(IsFullContext)

    useEffect(() => {
        if (chart) {
            setTimeout(() => {
                chart.then(v => v.resize())
            }, 500)
        }
    }, [isFull, chart])

    useEffect(() => {
        setChart(drawGauge(chart_ref.current, {
            data
        }))
    }, [data])


    return (
        <>
            <div className="chart_title" ref={chart_ref}>

            </div>
        </>
    )
}

// 饼图
const PieChart = ({ data = [[0]] }) => {
    const chart_ref = useRef(undefined)
    const [chart, setChart] = useState(undefined)
    const isFull = useContext(IsFullContext)

    useEffect(() => {
        if (chart) {
            setTimeout(() => {
                chart.then(v => v.resize())
            }, 500)
        }
    }, [isFull, chart])

    useEffect(() => {
        setChart(drawPie(chart_ref.current, {
            data
        }))
    }, [data])

    return (
        <>
            <div className="chart_title" ref={chart_ref}>

            </div>
        </>
    )
}


const Computer = () => {
    // 服务器信息
    const [cpu, setCpu] = useState(0)
    const [memory, setMemory] = useState({})
    // const [uptime, setUptime] = useState(0)
    const [hardDisk, setHardDisk] = useState({})

    useEffect(() => {
        getComputerInfo()
        let timer = setInterval(getComputerInfo, 1000 * 2)
        return () => {
            clearInterval(timer)
        }
    }, [])

    // 获取服务器信息
    const getComputerInfo = async () => {
        const { data = {} } = await reqGetComputerInfo()
        const { _cpuUsage, _freemem, _totalmem, _compouterDrive = {} } = data
        const { totalGb = 0, usedGb = 0, freeGb = 0, usedPercentage = 0, freePercentage = 0 } = _compouterDrive
        setCpu(_cpuUsage)
        setMemory(() => {
            const totalmem = (_totalmem / 1024 / 1024).toFixed(0)
            const freemem = (_freemem / 1024 / 1024).toFixed(0)
            const usedmem = totalmem - freemem
            const memPercent = (usedmem * 100 / totalmem).toFixed(2)
            return {
                totalmem,
                freemem,
                usedmem,
                memPercent,
                source: [
                    ['已使用内存', +usedmem],
                    ['空闲内存', +freemem]
                ]
            }
        })
        setHardDisk(() => {
            return {
                totalGb, usedGb, freeGb, usedPercentage, freePercentage,
                source: [
                    ['已使用空间', +usedGb],
                    ['剩余空间', +freeGb]
                ]
            }
        })
    }

    return (
        <>
            <div>
                <div className="num_title">
                    <p>cpu使用率</p>
                    <p>{cpu}%</p>
                </div>
                <GaugeChart data={cpu} />
            </div>
            <div>
                <div className="num_title">
                    <p>内存</p>
                    <p>{memory.memPercent ?? 0}%</p>
                </div>
                <PieChart data={memory.source} />
            </div>
            <div>
                <div className="num_title">
                    <p>硬盘使用</p>
                    <p>{hardDisk.freePercentage}%</p>
                </div>
                <PieChart data={hardDisk.source} />
            </div>
        </>
    )
}

export default Computer