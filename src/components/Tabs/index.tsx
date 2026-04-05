import React, { useCallback, useMemo } from 'react'
import {
  TabsContentStyled,
  TabsStyled,
  TabsToolbarStyled,
  TabStyled,
} from './styles'
import { TabsProps } from './interfaces'
export * from './interfaces'

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  tabIndex,
  onChangeTabIndex,
  ...other
}) => {
  const onClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const newTabIndex = parseInt(event.currentTarget.dataset.value || '')

      if (isFinite(newTabIndex)) {
        onChangeTabIndex(newTabIndex)
      }
    },
    [onChangeTabIndex],
  )

  return useMemo(() => {
    const tab = tabs[tabIndex]

    if (!tab) {
      return null
    }

    return (
      <TabsStyled {...other}>
        <TabsToolbarStyled>
          {tabs.map((n, index) => {
            return (
              <TabStyled
                key={n.label || index}
                active={index === tabIndex}
                onClick={onClick}
                data-value={index}
              >
                {n.label}
              </TabStyled>
            )
          })}
        </TabsToolbarStyled>

        <TabsContentStyled>{tab.content}</TabsContentStyled>
      </TabsStyled>
    )
  }, [tabs, tabIndex, other, onClick])
}
