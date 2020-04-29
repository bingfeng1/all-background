// 炫光背景
import React from 'react'
import './buttonGlowingGradient.less'

const ButtonGlowingGradient = ({ children }) => {

    return (
        <div className="flex-center" data-buttonglowinggradient>
            <button>{children}</button>
        </div>
    )
}

export default ButtonGlowingGradient