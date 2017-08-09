import {first} from 'src/server/util'
import {getContactByEmail, updateContactByVID} from 'src/server/services/crmService'

export async function findContactByEmails(emails) {
  const contact = await first(emails, getContactByEmail)

  if (!contact) {
    throw new Error(`Did not find contact matching emails: ${emails}`)
  }

  return contact
}

export async function addIdmToCrm(idmId, crmVid) {
  const properties = [{property: 'idm_id', value: idmId}]

  try {
    await updateContactByVID(crmVid, {properties})
  } catch (error) {
    throw new Error(`Error occurred while attempting to update HubSpot contact: \n${error}`)
  }
}
