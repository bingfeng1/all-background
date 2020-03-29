import React, { useState, useEffect, useRef, useContext } from 'react'
import { reqGetNcovDetail } from '../../api'
import { ncovInfoMapChart, IsFullContext } from '../../utils/charts'

// 疫情信息
const NcovInfo = ({ setDetail }) => {
    const [chart, setChart] = useState(undefined)
    const map_ref = useRef(undefined)
    const isFull = useContext(IsFullContext)

    useEffect(() => {
        getChinaInfo()
    }, [])

    useEffect(() => {
        if (chart) {
            setTimeout(() => {
                chart.resize()
            }, 100)
        }
    }, [isFull, chart])

    // 从第三方获取在线疫情
    const getChinaInfo = async () => {
        // 获取全国数据
        const result = await reqGetNcovDetail()
        // 处理数据
        const { data } = result
        const {
            lastUpdateTime, //数据更新时间
            areaTree,   // 数据树
        } = data
        // 处理区域树
        function dealAreaTree(areaTree, list = []) {
            for (let v of areaTree) {
                const { name, today, total, children } = v
                let temp = {
                    name,
                    value: total.nowConfirm,
                    detail: {
                        today,
                        total
                    }
                }
                // 递归处理
                if (children) {
                    temp.children = []
                    dealAreaTree(children, temp.children)
                }
                list.push(temp)

            }
            return list
        }

        const chartData = dealAreaTree(areaTree)
        // 将当前详情信息传给父组件
        const chart = await ncovInfoMapChart(map_ref.current, {
            chartData: chartData[0],
            time: lastUpdateTime,
            setDetail
        })

        setChart(chart)
    }

    return (
        <>
            <div style={{ height: '100%' }} ref={map_ref}>

            </div>
        </>
    )
}

export default NcovInfo