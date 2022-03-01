import logo from '../../assets/logo/Dressing.svg'
import cart from '../../assets/icons/cart.svg'
import login from '../../assets/icons/login.svg'

import Setting from './components/settings'

import "./style.scss"

const variables = () => {
    const settings = [
        {
            icon: login,
            title: 'Login',
            describe: 'Login',
            dest: '/Login',
            id: 2
        },
        {
            icon: cart,
            title: 'Carrinho',
            describe: 'shopping cart',
            dest: '/cart',
            count: true,
            id: 1
        },
    ],
        menu = [
            'Homen',
            'Mulher',
            'Kits'
        ]

    return [ settings, menu ]
}

const Header = props => {
    const [ settings, menu ] = variables()

    const handleSetting = ({ id, ...setting }) => <Setting { ...setting } key={ id }/>

    const handleMenu = ( name, index ) => <li key={ index }><a href={ '/' + name }>{ name }</a></li>
    
    const Menu = <ul className='menu--header'>{ menu.map( handleMenu )}</ul>,
        SettingChoose = <ul className='setting--header'>{ settings.map( handleSetting )}</ul>

    return (
        <header className="header">
            <div className="container--header">
                <a href="/">
                    <img src={ logo } alt='dressing company logo' className="logo"/>
                </a>
                { Menu }
            </div>
            { SettingChoose }
        </header>
    )
}

export default Header