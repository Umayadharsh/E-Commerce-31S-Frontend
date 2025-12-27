import React from 'react'
import { assets } from '../assets/assets'

const Ourpolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around mt-20 gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
      <div>
        <img
          src={assets.exchangeicon}
          className='w-8 m-auto mb-5'
          alt=''
        />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle free exchange policy</p>
      </div>
    <div>
        <img
          src={assets.supporticon}
          className='w-8 m-auto mb-5'
          alt=''
        />
        <p className='font-semibold'>7 Days Return</p>
        <p className='text-gray-400'>We provide 7 days free return policy</p>
      </div>
<div>
        <img
          src={assets.qualityicon}
          className='w-8 m-auto mb-5'
          alt=''
        />
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We provide 24/7 customer support</p>
      </div>

      

    </div>
  )
}

export default Ourpolicy
