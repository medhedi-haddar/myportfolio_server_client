import React from 'react'

const SkillsItems = ({skills}) => {
    return (
        <div>
            {skills.map((skill_item,index)=>(
                    <div key={'skill_item_'+index} className="text-start mb-4 p-2 position-relative d-flex justify-content-between skill-card">  
                    <span className="order">{skill_item.order}</span>
                    <div className="skill-bloc-visual">
                        <span className="skill-title">{skill_item.name}</span>
                        <div className="skill">
                            <span className="skill-value text-secondary">{skill_item.level}%</span>
                            <div className="skill-bar " style={{ width: `${skill_item.level}%`, background: `${skill_item.color}` }} 
                            aria-valuenow={`${skill_item.level}`} aria-valuemin={"0"} aria-valuemax={"100"}></div>
                        </div>
                    </div>
                </div> 
            ))}
        </div>
    )
}

export default SkillsItems
