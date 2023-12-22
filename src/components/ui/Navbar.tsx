import { PassChildren } from '../../interfaces'
import '../../styles/navigation.scss'

const Navbar: React.FC<PassChildren> = ({children}) => {
  return (
    <nav>
      {children}
    </nav>
  )
}

export default Navbar