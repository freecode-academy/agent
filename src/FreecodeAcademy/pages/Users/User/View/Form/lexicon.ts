import { LexiconDict } from 'src/Custom/Lexicon'

export const userEditFormLexicon: LexiconDict = {
  ru: {
    userEditForm: {
      fields: {
        username: 'Имя пользователя',
        fullname: 'Полное имя',
        image: 'Изображение',
        content: 'Контент',
        intro: 'Вступление',
        password: 'Пароль',
      },
      buttons: {
        save: 'Сохранить',
        cancel: 'Отмена',
      },
      messages: {
        dataSaved: 'Данные сохранены',
        noDataReceived: 'Данные не получены',
        requestError: 'Ошибка запроса',
        validationError: 'Ошибка валидации',
        unexpectedError: 'Неожиданная ошибка',
      },
    },
  },
  en: {
    userEditForm: {
      fields: {
        username: 'Username',
        fullname: 'Full name',
        image: 'Image',
        content: 'Content',
        intro: 'Intro',
        password: 'Password',
      },
      buttons: {
        save: 'Save',
        cancel: 'Cancel',
      },
      messages: {
        dataSaved: 'Data saved',
        noDataReceived: 'No data received',
        requestError: 'Request error',
        validationError: 'Validation error',
        unexpectedError: 'Unexpected error',
      },
    },
  },
}
