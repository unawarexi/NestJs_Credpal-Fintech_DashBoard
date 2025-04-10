/* eslint-disable @typescript-eslint/no-unused-vars */
import useResponsive from '../hooks/UseResponsive';
import LeftContainer from './container/LeftContainer'
import RightContainer from './container/RightContainer'

function AuthLayout() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  return (
    <div className={`md:flex ${isMobile ? 'relative' : ''}`}>
      <div
        className={`md:w-[25%] w-full ${
          isMobile ? 'absolute top-0 left-0' : ''
        }`}
      >
        <LeftContainer />
      </div>

      <div
        className={`md:w-3/5 w-[80%] ${
          isMobile ? 'relative z-50' : ''
        }`}
      >
        <main>
          <RightContainer />
        </main>
      </div>
    </div>
  );
}

export default AuthLayout;