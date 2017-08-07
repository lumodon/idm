import {first} from 'src/common/util/index'
import {getContactByEmail, updateContactByVID} from 'src/server/services/crmService'

export async function getContactByEmails(emails) {
  const contact = await first(emails, getContactByEmail)

  if (!contact) {
    throw new Error(`Couldn't get contact by emails: ${emails}`)
  }

  return contact
}

const properties = {
  idmId: 'idm_id',
}

export async function addIdmIdToCrm(idmUser) {
  const contact = await getContactByEmails(idmUser.emails)

  await updateContactByVID(contact.vid, {
    properties: [{
      property: properties.idmId,
      value: idmUser.id
    }]
  })
}
