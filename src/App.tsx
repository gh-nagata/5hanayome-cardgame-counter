import React from 'react'
import SidePanel from './components/SidePanel'
import PlayArea from './components/PlayArea'
import { DndProvider } from './contexts/DndContext'
import { CharacterProvider } from './contexts/CharacterContext'
import { HeroProvider } from './contexts/HeroContext'
// import OpponentCharacterLane from './components/OpponentCharacterLane'

const App = () => {
  return (
    // <DndProvider onDragEnd={
    //   (e) => console.log('hello')
    // }>
    <div className="h-full w-full flex bg-gray-800 tall:flex-col ">
      <CharacterProvider>
        <HeroProvider>
          <PlayArea classname='PlayArea flex-1' />
        </HeroProvider>
      </CharacterProvider>
      <SidePanel className="SidePanel h-full w-14 bg-gray-800 tall:w-full tall:h-12 " />
    </div>
    // </DndProvider>
  )
}

export default App
