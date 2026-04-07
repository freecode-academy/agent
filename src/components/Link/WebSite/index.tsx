import Link from 'next/link'

type WebSiteLinkProps = {
  url: string
}

export const WebSiteLink: React.FC<WebSiteLinkProps> = ({ url }) => {
  let name: string

  const match = url.match(/^(https?:\/\/)([^/]+).*$/i)

  if (match) {
    name = match[2].replace(/www\./i, '')
  } else {
    name = url
  }

  return (
    <Link
      href={url}
      title={url}
      rel="noindex nofollow noreferrer"
      target="_blank"
    >
      {name}
    </Link>
  )
}
