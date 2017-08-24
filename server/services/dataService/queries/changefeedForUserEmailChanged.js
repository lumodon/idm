import r from '../r'

export default function changefeedForUserEmailChanged() {
  return r.table('users').changes()
    .filter(
      r.row('new_val')('email').default(null)
    )
}
