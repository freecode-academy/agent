import { LexiconDict } from './index'

export const commonLexicon: LexiconDict = {
  ru: {
    'error.http': 'Ошибка HTTP: {{status}}',
    'error.noResponseBody': 'Нет тела ответа',
    'error.inAgent': 'Ошибка в {{nodeName}}',
    'error.unknown': 'Неизвестная ошибка',
    'error.somethingWentWrong':
      'Извините, что-то пошло не так. Попробуйте снова.',
    'chat.title': 'ИИ чат',
    'chat.subtitle': '',
    'chat.status': 'Онлайн',
    read: 'Читать',
  },
  en: {
    'error.http': 'HTTP Error: {{status}}',
    'error.noResponseBody': 'No response body',
    'error.inAgent': 'Error in {{nodeName}}',
    'error.unknown': 'Unknown error',
    'error.somethingWentWrong':
      'Sorry, something went wrong. Please try again.',
    'chat.title': 'AI chat',
    'chat.subtitle': '',
    'chat.status': 'Online',
    read: 'Read',
  },
}
