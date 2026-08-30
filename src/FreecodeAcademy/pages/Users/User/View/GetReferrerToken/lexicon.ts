import { LexiconDict } from 'src/Custom/Lexicon'

export const getReferrerTokenLexicon: LexiconDict = {
  ru: {
    getReferrerToken: {
      createToken: 'Создать реферальный токен',
      copyToken: 'Копировать токен',
      copyLink: 'Копировать ссылку',
      errors: {
        cannotGetToken: 'Не удалось получить токен',
        unknownError: 'Неизвестная ошибка',
      },
    },
  },
  en: {
    getReferrerToken: {
      createToken: 'Create referrer token',
      copyToken: 'Copy token',
      copyLink: 'Copy link',
      errors: {
        cannotGetToken: 'Can not get token',
        unknownError: 'Unknown error',
      },
    },
  },
}
