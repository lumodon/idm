import {USER_ROLES} from 'src/common/models/user'
import r from '../r'

export default function changefeedForUserCreated() {
  return r.table('users')
    .getAll(USER_ROLES.MEMBER, {index: 'roles'})
    .changes()
    .filter(r.row('old_val').eq(null))
}
