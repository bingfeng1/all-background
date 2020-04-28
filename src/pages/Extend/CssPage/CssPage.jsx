import React from 'react';
import { Row, Col, Card } from 'antd';
import './csspage.less'
import ButtonRiffle from '../../../components/Extend/CssComponent/ButtonRiffle'

const CssPage = () => {

    return (
        <section className="learnmore-css-plug">
            <Row
                gutter={[10]}>
                <Col xl={12} xs={24} sm={24} md={24}>
                    <Card title="涟漪效果Button">
                        <ButtonRiffle>测试按钮</ButtonRiffle>
                    </Card>
                </Col>
            </Row>
        </section>
    )
}

export default CssPage