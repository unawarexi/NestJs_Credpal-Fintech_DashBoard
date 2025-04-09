
import LeftContainer from './container/LeftContainer'
import RightContainer from './container/RightContainer'

function AuthLayout() {
  return (
    <div className="flex">
        <div className="w-[25%]">
          <LeftContainer />
        </div>

        <div className="w-3/5">
            <main>
              <RightContainer />
            </main>
        </div>
    </div>
  )
}

export default AuthLayout