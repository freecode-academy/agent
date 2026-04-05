// import { CSSProperties } from 'react'

export type TabProps = {
  label: string
  content: React.ReactNode | null
}

export type TabsProps = {
  // Текущий индекс
  tabIndex: number

  // Хендлер на смену индекса
  onChangeTabIndex: (tabIndex: number) => void

  tabs: TabProps[]
  // style?: CSSProperties
}
