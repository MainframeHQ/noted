import React from 'react'
import styled, { css } from 'styled-components/native'
import { convertFromRaw } from 'draft-js'
import { Text } from '@morpheus-ui/core'
import { type Note } from '../types'

const NoteContainer = styled.Text`
  ${props =>
    props.isOpen &&
    css`
      background-color: ${props => props.theme.lightYellow};
    `}
  padding: 10px 13px;
  border-bottom: 1px solid #e3e3e3;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`
const FolderFlatList = styled.FlatList`
  display: block;
`
const TextContainer = styled.View`
  margin-left: 10px;
  margin-bottom: 2px;
  cursor: pointer;
  display: block;
`

type Props = {
  data: Array<Note>,
  folderName: string,
  activeNote: Note,
  isOpen: boolean,
  handleClick: Note => void,
  dragStart: (Event, string) => void,
}

function contentPreview(content) {
  const newContent = convertFromRaw(JSON.parse(content))
    .getPlainText()
    .replace(/[\n\r]/g, ' ')
    .substring(0, 25)
  return newContent
}

function formattedDate(timestamp) {
  const today = new Date(timestamp).toLocaleDateString(undefined, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  })
  return today
}

export function formattedTime(timestamp) {
  const time = new Date(timestamp).toLocaleTimeString(undefined, {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
  })
  return time
}

const Notes = (props: Props) => {
  return (
    props.isOpen && (
      <FolderFlatList
        data={props.data}
        renderItem={({ item }) => {
          const dateTime = new Date(item.date)
          const date = formattedDate(dateTime)
          const time = formattedTime(dateTime)
          return (
            item.invisible !== true && (
              <NoteContainer
                draggable={true}
                onDragStart={e => props.dragStart(e, item.key)}
                isOpen={props.activeNote.key === item.key}
                onClick={() => props.handleClick(item)}>
                <TextContainer>
                  <Text variant="bold">
                    {item.title ? item.title : 'untitled'}
                  </Text>
                </TextContainer>
                <TextContainer>
                  <Text variant="smaller">
                    {item.content
                      ? item.content && contentPreview(item.content)
                      : 'start typing...'}
                  </Text>
                </TextContainer>
                <TextContainer>
                  <Text variant="date">{date + '    ' + time}</Text>
                </TextContainer>
                <TextContainer>
                  <Text variant="smaller">
                    {item.folder.type !== 'all' && item.folder.name}
                  </Text>
                </TextContainer>
              </NoteContainer>
            )
          )
        }}
      />
    )
  )
}

export default Notes
