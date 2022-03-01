import { useSelector } from 'react-redux'

import "./style.scss"

const Settings = ({ icon, title, describe, dest, count }) => {
    const cartLength = useSelector( ({ cart }) => cart.length ),
        hasQuantity = count ? <span>{ cartLength }</span> : null
    
    return (
        <li className="setting_option--header">
            { hasQuantity }
            <img src={ icon } alt={ describe } />
            <a href={ dest }>{ title }</a>
        </li>
    )
}

export default Settings