import React from 'react'
import Image from 'next/image'
import Logo from '@/components/global/logo'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="relative mx-auto w-full lg:grid h-screen lg:grid-cols-2 overflow-hidden">
        <div className="absolute top-0 left-0 p-3">
            <Logo />
        </div>
      <div className="relative h-screen flex  items-center justify-between py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          {children}
        </div>
        <div className="absolute bottom-0 left-0 w-full py-4">
          <p className='text-sm text-muted-foreground mx-auto text-center'>&copy; Uniconnect Inc</p>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/assets/login-bg.gif"
          alt="Image"
          width={1920}
          height={1080}
          priority
          className="h-full w-full object-cover dark:brightness-[0.9] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default AuthLayout