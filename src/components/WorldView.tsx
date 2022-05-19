import './WorldViewStyles.scss';
import worlddata from '../world/worlddata';
const textNode = <div id="text"></div>



const optionOneSelect = () => {

}
const optionTwoSelect = () => {

}
const optionThreeSelect = () => {

}
const optionFourSelect = () => {

}
const WorldView = () => {
    return (
        <div className = "world-body">
            <h1>
                {worlddata.house.sceneName}
            </h1>
            <br />
            
                <div className="container">
                <img src={worlddata.house.src} className="scene" alt="" />
                    <div id ="text">{worlddata.house.textNode}</div>
                    <div id="option-buttons" className="btn-grid">
                        <button className="btn">{worlddata.house.option1}</button>
                        <button className="btn">{worlddata.house.option2}</button>
                        <button className="btn">{worlddata.house.option3}</button>
                        <button className="btn">{worlddata.house.option4}</button>                     
                    </div>
                </div>
        </div>
    )
}

export default WorldView