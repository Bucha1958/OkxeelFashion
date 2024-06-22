import React, { useContext } from 'react';
import Okxeel from '../assets/men-suit.PNG';
import '../account.css';
import '../Hero.css';
import Head from '../components/Head';
import Footer from '../components/Footer';
import { UserContext } from '../UserContext';
import Paraez from '../assets/paraez.PNG';
import trend from '../assets/trend.PNG';
import tuxedo from '../assets/tuxedo.PNG';

const AccountPage = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <div>
      <Head />
      <div className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${tuxedo})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top'
          }}
        ></div>
        <div className="mt-10 absolute inset-0 flex items-center justify-center text-white">
          <h1 className="montserrat-one font-medium text-5xl uppercase bg-black bg-opacity-50 p-10 rounded-lg">
            Welcome, {userInfo?.username}
          </h1>
        </div>
      </div>
      <div className="h-[120vh] p-20 flex text-black text-base montserrat-one font-medium">
        <div className='w-[50%] flex flex-col items-center justify-center space-y-5'>
          <img src={trend} className='rounded-full h-[65%] w-[50%]'/>
          <h1 className='text-2xl uppercase hover:underline hover:cursor-pointer'>recommendations</h1>
          <p>Specially selected items you may also like</p>
        </div>
        <div className='w-[50%] flex flex-col items-center justify-center space-y-5'>
          <img src={Paraez} className='rounded-full h-[65%] w-[50%]'/>
          <h1 className='text-2xl uppercase hover:underline hover:cursor-pointer'>saved items</h1>
          <p>All your favorite pieces in one beautiful place.</p>
        </div>
      </div>
      <div className=' h-[20vh] flex flex-1 justify-around capitalize text-black text-base montserrat-one font-medium'>
          <div className='flex flex-col space-y-3 items-center justify-center'>
            <h1 className='hover:underline hover:cursor-pointer'>My Order</h1>
            <p className='text-sm'>Manage and edit your order.</p>
          </div>
          <div className='flex flex-col space-y-3 items-center justify-center'>
            <h1 className='hover:underline hover:cursor-pointer'>account settings</h1>
            <p className='text-sm'>Manage profile and preferences.</p>
          </div>
          <div className='flex flex-col space-y-3 items-center justify-center'>
            <h1 className='hover:underline hover:cursor-pointer'>address book</h1>
            <p className='text-sm'>Manage shipping and billing address.</p>
          </div>
          <div className='flex flex-col space-y-3 items-center justify-center'>
            <h1 className='hover:underline hover:cursor-pointer'>wallet</h1>
            <p className='text-sm'>Manage your payments methods.</p>
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountPage;
