import styled, { css } from 'styled-components'

export const TabsToolbarStyled = styled.div`
  /* border: 1px solid blue; */

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 5px;
`

export const TabStyled = styled.div<{
  active: boolean
}>`
  border: 1px solid #ddd;
  padding: 2px 10px;
  font-size: 14px;
  cursor: pointer;

  ${({ active }) => {
    if (active) {
      return css`
        background: rgb(51 77 136 / 62%);
        border-radius: 5px;
        color: white;
      `
    }
  }}
`

export const TabsContentStyled = styled.div``

export const TabsStyled = styled.div`
  /* border: 1px solid blue; */
  width: 100%;
`
