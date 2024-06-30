import * as core from '@actions/core'
import * as fs from 'fs'
import { parse } from './parse'
import { reportPR } from './report-pr'

async function run(): Promise<void> {
  try {
    const jsonPath = core.getInput('json-path', { required: true })
    const prNumber = core.getInput('pr-number', { required: true })

    if (!prNumber) {
      core.warning('PR number is not set.')
      throw new Error('PR number is not set.')
    }

    try {
      fs.accessSync(jsonPath, fs.constants.R_OK)
    } catch (err) {
      core.warning(`${jsonPath}: access error!`)
      throw new Error(`${jsonPath}: access error!`)
    }

    const result = parse(jsonPath)
    core.info(result.summary)

    await reportPR(result)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
