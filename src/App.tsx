import React from 'react'
import SidePanel from './components/SidePanel'
import PlayArea from './components/PlayArea'
import { DndProvider } from './contexts/DndContext'
import { CharacterProvider } from './contexts/CharacterContext'
import { HeroProvider } from './contexts/HeroContext'
import InfoPanel from './components/InfoPanel'

const App = () => {
  return (
    // <DndProvider onDragEnd={
    //   (e) => console.log('hello')
    // }>
    <div className="h-full w-full flex bg-gray-800 tall:flex-col">
      {/* <InfoPanel classname='tall:h-16 order-2 my-2 wide:hidden' /> */}
      <InfoPanel classname='order-2 my-2 wide:hidden' />
      <CharacterProvider>
        <HeroProvider>
          <PlayArea classname='PlayArea flex-1 tall:order-3' />
        </HeroProvider>
      </CharacterProvider>
      <SidePanel className="SidePanel h-full w-14 bg-gray-800 tall:w-full tall:h-12 tall:order-1 tall:border-b" />
    </div>
    // </DndProvider>
  )
}

export default App
