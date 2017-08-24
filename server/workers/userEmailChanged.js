/* eslint-disable no-console, camelcase */
import {updateContactByVID} from 'src/server/services/crmService'

export function start() {
  const jobService = require('src/server/services/jobService')
  jobService.processJobs('userEmailChanged', processUserEmailChanged)
}

export async function processUserEmailChanged({new_val: user}) {
  try {
    const vid = user.hubspotId
    const properties = [{property: 'email', value: user.email}]
    await updateContactByVID(vid, {properties})
  } catch (error) {
    throw new Error('Failed to update new user email in Hubspot.')
  }
}
