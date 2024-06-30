import * as core from '@actions/core'
import * as github from '@actions/github'
import replaceComment, { deleteComment } from '@aki77/actions-replace-comment'
import type { RspecResult } from './parse'
import { resultTable } from './table'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const commentGeneralOptions = () => {
  const prNumber = Number(core.getInput('pr-number', { required: true }))

  return {
    token: core.getInput('token', { required: true }),
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: prNumber
  }
}

export const reportPR = async (result: RspecResult): Promise<void> => {
  const title = core.getInput('title', { required: true })

  if (result.success) {
    await deleteComment({
      ...commentGeneralOptions(),
      body: title,
      startsWith: true
    })
    return
  }

  await replaceComment({
    ...commentGeneralOptions(),
    body: `${title}
<details>
<summary>${result.summary}</summary>

${resultTable(result.examples)}

</details>
`
  })
}
