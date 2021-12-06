import React from 'react'

const Loader_equalizer = ({title}) => {
    return (
        <div className=" loader align-items-end box d-flex justify-content-start">
            
            <h2 className="me-4 mb-0 text-secondary">{title}</h2>
            <div>
                <svg version="1.1" 
                    id="Layer_1"  
                    x="0px" y="0px" 
                    width="54px"
                    height="60px"
                    viewBox="0 0 100 100" 
                    enable-background="new 0 0 100 100" >
                <rect fill="#232f3e" width="3" height="100" transform="translate(0) rotate(180 3 50)">
                <animate
                    attributeName="height"
                    attributeType="XML"
                    dur="1s"
                    values="30; 100; 30"
                    repeatCount="indefinite"/>
                </rect>
                <rect x="17" fill="#232f3e" width="3" height="100" transform="translate(0) rotate(180 20 50)">
                <animate
                    attributeName="height"
                    attributeType="XML"
                    dur="1s"
                    values="30; 100; 30"
                    repeatCount="indefinite"
                    begin="0.1s"/>
                </rect>
                <rect x="40" fill="#232f3e" width="3" height="100" transform="translate(0) rotate(180 40 50)">
                <animate
                    attributeName="height"
                    attributeType="XML"
                    dur="1s"
                    values="30; 100; 30"
                    repeatCount="indefinite"
                    begin="0.3s"/>
                </rect>
                <rect x="60" fill="#232f3e" width="3" height="100" transform="translate(0) rotate(180 58 50)">
                <animate
                    attributeName="height"
                    attributeType="XML"
                    dur="1s"
                    values="30; 100; 30"
                    repeatCount="indefinite"
                    begin="0.5s"/>
                </rect>
                <rect x="80" fill="#232f3e" width="3" height="100" transform="translate(0) rotate(180 76 50)">
                <animate
                    attributeName="height"
                    attributeType="XML"
                    dur="1s"
                    values="30; 100; 30"
                    repeatCount="indefinite"
                    begin="0.1s"/>
                </rect>
                </svg>
            </div>
        </div>
    )
}

export default Loader_equalizer
