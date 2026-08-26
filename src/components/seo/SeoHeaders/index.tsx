import Head from 'next/head'
import { useRouter } from 'next/router'

export interface SeoHeadersProps {
  title: string
  description?: string | null
  noindex?: boolean
  nofollow?: boolean
  canonical: string | null | undefined
  siteOrigin: string | undefined
}

export const SeoHeaders: React.FC<SeoHeadersProps> = ({
  title,
  description,
  noindex = false,
  nofollow = false,
  canonical,
  siteOrigin,
}) => {
  const router = useRouter()

  /**
   * Запрещаем индексацию любых страниц с гет-параметрами.
   * А то гугл почему-то проигнорировал инструкции в robots.txt просканировал очень много
   * ненужных страниц.
   */
  const hasGetParams = router.asPath.includes('?')

  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {canonical && (
        <link
          rel="canonical"
          href={siteOrigin ? `${siteOrigin}${canonical}` : canonical}
        />
      )}

      <meta
        name="robots"
        content={[
          hasGetParams || noindex ? 'noindex' : 'index',
          hasGetParams || nofollow ? 'nofollow' : 'follow',
        ].join(', ')}
      />
    </Head>
  )
}
