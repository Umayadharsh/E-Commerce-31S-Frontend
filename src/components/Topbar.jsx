import React from 'react'

const TopBar = () => {
  return (
    <div className="w-full bg-black text-white overflow-hidden top-0 left-0 h-10 relative w-full">
      <div className="whitespace-nowrap animate-marquee py-2 text-sm font-medium">
        <span className="mx-8">✨ Free Shipping on Orders Above ₹999</span>
        <span className="mx-8">🔥 New Chains Collection Live Now</span>
        <span className="mx-8">💎 Premium Quality • Best Price</span>
        <span className="mx-8">🚚 Fast Delivery Across India</span>
      </div>
    </div>
  )
}

export default TopBar
