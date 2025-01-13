import { Link } from 'react-router-dom'
import {Flex} from 'antd'
import MenuNavItem from './MenuNavItem.tsx';
import { IconNameList } from './Icons.js';

const MenuNav = (): JSX.Element => {
  
  return <div className="menu-nav-wrapper">
    <Link to='/'><MenuNavItem iconName={IconNameList.Home} name='Home'/></Link>
    <Flex align='center' gap={10}>
    <Link to='/exchanges' ><MenuNavItem iconName={IconNameList.Exchanges} name='Exchanges'/></Link>
    <Link to='/chart' ><MenuNavItem iconName={IconNameList.Chart} name='Chart'/></Link> 
    </Flex>    
  </div>;
};

export default MenuNav;
