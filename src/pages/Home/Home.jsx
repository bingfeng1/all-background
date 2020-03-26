import React, { useState, useEffect, useRef } from 'react'
import { reqGetComputerInfo } from '../../api'
import { Card, Button, Icon, Row, Col } from 'antd'
import * as echarts from 'echarts'
// 这个页面需要多个数据页面拼接
const Home = () => {
    // 服务器信息
    const [cpu, setCpu] = useState(0)
    const [freemem, setFreemem] = useState(0)
    const [totalmem, setTotalmem] = useState(0)
    const [uptime, setUptime] = useState(0)
    const [totalGb, setTotalGb] = useState(0)
    const [freeGb, setFreeGb] = useState(0)
    const [usedGb, setUsedGb] = useState(0)
    const [usedPercentage, setUsedPercentage] = useState(0)
    const [freePercentage, setFreePercentage] = useState(0)

    useEffect(() => {
        getComputerInfo()
        let timer = setInterval(getComputerInfo, 1000 * 2)
        return () => {
            clearInterval(timer)
        }
    }, [])

    // echarts图标使用
    const cpu_ref = useRef(null)

    // 绘制cpu的饼图
    const drawEchart = {
        pie(el, data) {
            const myEchart = echarts.init(el)
            const option = {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%'
                },
                series: [
                    {
                        name: 'CPU',
                        type: 'gauge',
                        data: [{ value: data, name: '使用率' }],
                        radius: '90%',
                        axisLine: {
                            lineStyle: {
                                width: 10

                            }
                        },
                        splitNumber:5,
                        splitLine: {
                            length: 10
                        },
                        axisTick: {
                            splitNumber: 2
                        },
                        pointer: {
                            width: 5
                        },
                        title: {
                            show: false
                        },
                        detail: {
                            show: false
                        }
                    }
                ]
            }
            myEchart.setOption(option)
        }
    }

    // 获取服务器信息
    const getComputerInfo = async () => {
        const { data } = await reqGetComputerInfo()
        const { _cpuUsage, _freemem, _totalmem, _uptime, _compouterDrive } = data
        const { totalGb, usedGb, freeGb, usedPercentage, freePercentage } = _compouterDrive
        setCpu(_cpuUsage)
        drawEchart.pie(cpu_ref.current, _cpuUsage)
        setFreemem(_freemem)
        setUptime(_uptime)
        setTotalmem(_totalmem)
        setTotalGb(totalGb)
        setFreeGb(freeGb)
        setUsedGb(usedGb)
        setUsedPercentage(usedPercentage)
        setFreePercentage(freePercentage)
    }

    // 是否全屏
    const [isFull, setIsFull] = useState(false)
    // 全屏按钮（可以分为单独组件）
    const fullScreen = () => {
        if (isFull) {
            document.exitFullscreen()
        } else {
            document.documentElement.requestFullscreen()
        }
        setIsFull(!isFull)
    }

    return (
        <div
            className={`home_grid center ${isFull && 'full_screen'}`}
        >
            {/* 内部使用grid布局 */}
            {/* 服务器信息 */}
            <div className="computer_info">
                <div>
                    <div className="num_title">
                        <p>cpu使用率</p>
                        <p>{cpu}%</p>
                    </div>
                    <div className="chart_title" ref={cpu_ref}>

                    </div>
                </div>
                <div>
                    <div className="num_title">
                        <p>cpu使用率</p>
                        <p>{cpu}%</p>
                    </div>
                    <div className="chart_title">

                    </div>
                </div>
                <div>
                    <div className="num_title">
                        <p>cpu使用率</p>
                        <p>{cpu}%</p>
                    </div>
                    <div className="chart_title">

                    </div>
                </div>
            </div>
            {/* 时间 */}
            <div className="time">

            </div>
            {/* 工具栏 */}
            <div className="toolbar">
                <Button type="primary" onClick={() => fullScreen()}>
                    <Icon type="fullscreen" />
                </Button>
            </div>
            {/* 疫情地图 */}
            <div className="map">

            </div>
            {/* 疫情数据 */}
            <div className="ncov_data">

            </div>
        </div>
    )
}

export default Home