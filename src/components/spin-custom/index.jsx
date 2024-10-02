import { Spin } from "antd"
import { SPINNING_SIZE } from 'utils/constants/config'
import "./index.scss"

const SpinCutom = ({spinning, children}) => {
  return (
    <Spin 
      className='spin-custom'
      spinning={spinning} 
      size={SPINNING_SIZE}
    >
      {children}
    </Spin>
  )
}

export default SpinCutom