import React from 'react';
import { Row, Col, Card } from 'antd';
import './drag.less';
import BaseDrag from '../../../components/Extend/Drag/Base'
import DragEcharts from '../../../components/Extend/Drag/DragEcharts'

const DragAPI = () => {

    return (
        <section>
            <Row
                gutter={[10]}>
                <Col xl={12} xs={24} sm={24} md={24}>
                    <Card title="拖动文件上传">
                        <BaseDrag handleDrop={console.log} ></BaseDrag>
                    </Card>
                </Col>
                <Col xl={12} xs={24} sm={24} md={24}>
                    <Card title="Echarts拖动改变">
                        <DragEcharts handleDrop={console.log} ></DragEcharts>
                    </Card>
                </Col>
            </Row>
        </section>
    )
}

export default DragAPI