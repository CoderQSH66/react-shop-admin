import distributionRoutes from './distribution'
import mainRoutes from './main'
import managerRoutes from './manager'
import orderRoutes from './order'
import otherRoutes from './other'
import shopRoutes from './shop'
import systemRoutes from './system'
import userRoutes from './user'

const rootChildRoutes = [
  mainRoutes,
  shopRoutes,
  userRoutes,
  orderRoutes,
  managerRoutes,
  systemRoutes,
  distributionRoutes,
  otherRoutes
]

export default rootChildRoutes
