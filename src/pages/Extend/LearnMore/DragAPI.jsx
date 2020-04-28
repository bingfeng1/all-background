import React from 'react';
import { Row, Col } from 'antd';
import BaseDrag from '../../../components/Extend/Drag/Base'

const DragAPI = () => {

    return (
        <section>
            <Row
                gutter={[10]}>
                <Col xl={12} xs={24} sm={24} md={24}>
                    <BaseDrag handleDrop={console.log} ></BaseDrag>
                </Col>
            </Row>
        </section>
    )
}

export default DragAPI