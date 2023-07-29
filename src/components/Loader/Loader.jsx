import { Vortex } from  'react-loader-spinner'
import { LoaderBox } from './Loader.styled'

const Loader = () => (
   <LoaderBox><Vortex
  visible={true}
  height="200"
  width="200"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['blue', 'blue', 'yellow', 'blue', 'yellow', 'blue']}
/>
</LoaderBox>
)

export { Loader }