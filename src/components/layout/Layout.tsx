import {Layout} from 'antd'
import "./layout.scss"
import AppHeader from './AppHeader.tsx'
import AppSideBar from './AppSideBar.tsx'
import AppContent from './AppContent.tsx'

export default function MainLayout() {
  return (
    <Layout className='layout'>
    <AppHeader/>
    <Layout>
      <AppSideBar/>
      <AppContent/>      
    </Layout>
  </Layout>
  )
}
