import { Resource } from '@prisma/client'
import { PrismaContext } from 'server/context/interfaces'
import {
  LLMChatMessageRole,
  LlmModel,
  LlmProvider,
} from 'server/llm/client/interfaces'
import { llmChatCompletionResolver } from 'server/schema/types/LLM/resolvers/chatCompletion'

type ProcessConceptsArgs = {
  ctx: PrismaContext
  resource: Resource
}

export async function processOldContent({
  ctx,
  resource,
}: ProcessConceptsArgs): Promise<string | null | undefined> {
  const systemPrompt = `# Ты рерайтер.

Тебе будут даны разные варианты текста одной и той же публикации. Это может быть и чистый текст, и технический со всякими техническими тегами и т.п. Твоя задача пересобрать полностью статью, с сохранением слов, смысла и стилистики, но оформить все в формате маркдаун.

Так же могут быть приведены листинги кода, их надо вставить в блок кода с указанием языка. Например

\`\`\`js
const foo = 0
\`\`\`

Список всех поддерживаемых языков: 
'': 'Plain Text',
text: 'Plain Text',
js: 'JavaScript',
ts: 'TypeScript',
tsx: 'TypeScript (React)',
jsx: 'JavaScript (React)',
css: 'CSS',
html: 'HTML',
json: 'JSON',
bash: 'Bash',
shell: 'Shell',
sql: 'SQL',
gql: 'GraphQL',
python: 'Python',
markdown: 'Markdown',
django: 'Jinja/Django',
env: 'Environment',
yaml: 'YAML',

Если никакой не подходит, то не указывай явно используемый язык.


## !!! Очень важно !!! 

Важно сохранить смысл, слова и стилистику. Твоя задача отформатировать статью, а не переписать ее своими словами. Нельзя ничего додумывать, придумаывать и т.п. Если где-то есть недосказанность, эта недосказанность так и должна остаться - твоя задача только отформатировать статью.

Вернуть надо только отформатированную статью в формате маркдаун, без какого-либо технического сопроводительного кода, текста, твоих комментариев и т.п. Только сама статья. 


## Форматирование конечной публикации

Корректный Markdown с поддержкой html (но предпочтительней именно маркдаун форматирование)

Важно учитывать, что много где пропущены пробелы в тексте. Очень важно распознавать такое и корректно вставлять пробелы.

Картинки вставляются как картинки с предпросмотром. Ссылки как ссылки.

Если встречаются ссылки, ссылающиеся на домен community.modx-cms.ru, то вставляй просто текстом, а не ссылкой.
На другие домены вставляй ссылки как есть. 

Если есть картинки с внешних файлообменников типа joxi и т.п., не надо их вставлять, они не актуальны. Локальные картинки обязательно вставляй, где они указаны.
`

  const {
    content,
    contentText,

    /**
     * contentV2 не берем, потому что он формировался из content и contentText
     */
    // contentV2
  } = resource

  const peaces = [contentText, content]
    .map((n) =>
      n === null ? null : typeof n === 'string' ? n.trim() : JSON.stringify(n),
    )
    .filter((n) => !!n)

  if (!peaces.length) {
    return ''
  }

  const userPrompt = `## Вот тебе исходные данные статьи. Перепиши это в конечную статью в формате маркдаут, с сохранением слов, смысла и стилистики, и верни мне только ее, без всякого дополнительного технического текста и твоих комметариев

---

${peaces.join(`

---

`)}
  
`

  const chatResponse = await llmChatCompletionResolver(
    null,
    {
      input: {
        provider: LlmProvider.OpenRouter,
        messages: [
          {
            role: LLMChatMessageRole.system,
            content: systemPrompt,
          },
          {
            role: LLMChatMessageRole.user,
            content: userPrompt,
          },
        ],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        model: LlmModel.GEMINI_3_5_FLASH_LITE as any,
      },
    },
    ctx,
  )

  const responseContent = chatResponse.choices?.[0]?.message?.content

  return responseContent
}
