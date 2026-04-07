import Link from 'next/link'
import { Page } from '../_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'

/**
 * Страница О проекте
 */
export const AboutPage: Page = () => {
  return (
    <>
      <SeoHeaders
        title="About Us — FreeCode.Academy Expert Network"
        description="Discover how FreeCode.Academy connects clients with verified tech experts through AI-powered agents. Join our community of developers and mentors."
      />

      <div>
        <h3>Добро пожаловать на сайт FreeCode.Academy!</h3>

        <p>
          Здесь любой желающий может совершенно бесплатно изучить HTML, CSS,
          JavaScript, React, Next-JS и прочие технологии, а так же пообщаться с
          другими специалистами как начинающими, так и с опытными.
        </p>

        <p>
          Специальная страничка{' '}
          <Link
            href="/start/developers"
            title="С чего начать изучать веб-программирование"
          >
            С чего начать изучать веб-программирование
          </Link>{' '}
          поможет вам сделать свои первые шаги.
        </p>

        <p>
          А для тех, кто привык оперативно общаться в Телеграм, я завел{' '}
          <a
            target="_blank"
            href="https://t.me/freecode_academy"
            rel="noreferrer"
          >
            свою группу
          </a>
          . Присоединяйтесь;-)
          <br />
          Правда канал еще совсем свежий и участников совсем мало, но вы не
          стесняйтесь, пишите. Я там тоже есть и оперативно отвечу на любой
          разумный вопрос.
        </p>

        <p>
          Любые вопросы/предложения можно слать на почту{' '}
          <a href="mailto:info@freecode.academy">info@freecode.academy</a>
        </p>
      </div>
    </>
  )
}
