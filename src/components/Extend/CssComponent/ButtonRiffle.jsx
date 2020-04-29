/**
 * 涟漪效果按钮
 */
import React from 'react'
import './buttonRiffie.less'

// 尾调用获取坐标
function getOffsetLeft(t, left = 0) {
    if (t.offsetParent) {
        left += t.offsetLeft
        return getOffsetLeft(t.offsetParent, left)
    }else{
        return left
    }
}

function getOffsetTop(t, top = 0) {
    if (t.offsetParent) {
        top += t.offsetTop
        return getOffsetTop(t.offsetParent, top)
    }else{
        return top
    }
}

const ButtonRiffle = ({ children = "按钮" }) => {
    const riffleAction = (e) => {
        let x = e.clientX - getOffsetLeft(e.target)
        let y = e.clientY - getOffsetTop(e.target)

        let ripples = document.createElement('span')
        ripples.style.left = x + 'px'
        ripples.style.top = y + 'px'

        e.target.appendChild(ripples)

        setTimeout(()=>{
            ripples.remove()
        },1000)
    }


    return (
        <div className="flex-center flex-riffle" data-buttonriffle>
            <button className="riffle" onClick={riffleAction}>
                {children}
            </button>
        </div>
    )
}

export default ButtonRiffle