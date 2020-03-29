import React, { useState } from 'react'
import { Button, Icon } from 'antd'
import ComputerInfo from '../../components/Build/Computer'
import NcovInfo from '../../components/Build/NcovInfo'
import NcovInfoDetail from '../../components/Build/NcovInfoDetail'
import { IsFullContext } from '../../utils/charts'
import Time from '../../components/Build/Time'
// 这个页面需要多个数据页面拼接
const Home = () => {
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

    // 获取数据详情
    const [infoDetail, setInfoDetail] = useState({})

    return (
        <IsFullContext.Provider value={isFull}>
            <div
                className={`home_grid center ${isFull && 'full_screen'}`}
            >
                {/* 内部使用grid布局 */}
                {/* 服务器信息 */}
                <div className="computer_info">
                    <ComputerInfo />
                </div>
                {/* 时间 */}
                <div className="time">
                    <Time />
                </div>
                {/* 工具栏 */}
                <div className="toolbar">
                    <Button type="primary" onClick={() => fullScreen()}>
                        <Icon type="fullscreen" />
                    </Button>
                </div>
                {/* 疫情地图 */}
                <div className="map">
                    <NcovInfo
                        setDetail={(data) => setInfoDetail(data)} />
                </div>
                {/* 疫情数据 */}
                <div className="ncov_data">
                    <NcovInfoDetail detail={infoDetail} />
                </div>
            </div>
        </IsFullContext.Provider>
    )
}

export default Home