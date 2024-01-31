import { router } from '@server/trpc'
import adminView from './adminView'
import adminEdit from './adminEdit'
import adminDelete from './adminDelete'

const admin = router({
  adminView,
  adminEdit,
  adminDelete,
})

export default admin
