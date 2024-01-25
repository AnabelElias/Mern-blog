import { Sidebar } from 'flowbite-react'
import React from 'react'
import {HiUser,HiArrowSmRight} from 'react-icons/hi';
import { useEffect,useState } from 'react';
import {useLocation} from 'react-router-dom'
import { Link } from 'react-router-dom';

const DashSidebar = () => {
    const location=useLocation()
  const [tab,setTab]=useState('')

  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const tabFromUrl=urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
    console.log(tabFromUrl)
  },[location.search])
  return (
    <Sidebar w-full>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link
                 to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab==='profile'} 
                        icon={HiUser} label={'user'} 
                         labelColor='dark' >
                        Profile
                    </Sidebar.Item>
                </Link>
                
                <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer' >
                    Sign out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar