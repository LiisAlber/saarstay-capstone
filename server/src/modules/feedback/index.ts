import { router } from '@server/trpc'
import submit from './submit'
import view from './view'
import admin from './admin'

export default router({
  submit,
  view,
  admin,
})
