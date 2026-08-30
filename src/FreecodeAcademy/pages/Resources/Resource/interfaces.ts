import { PageProps } from 'src/components/pages/_App/interfaces'

export type ResourcePageProps = PageProps & {
  uri: string | undefined
  page: number | undefined
}
