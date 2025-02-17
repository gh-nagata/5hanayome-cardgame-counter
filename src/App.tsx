import React from 'react'
import SidePanel from './components/SidePanel'
import PlayArea from './components/PlayArea'
import { DndProvider } from './contexts/DndContext'
// import OpponentCharacterLane from './components/OpponentCharacterLane'

const App = () => {
  return (
    // <DndProvider onDragEnd={
    //   (e) => console.log('hello')
    // }>
      <div className="h-full w-full flex bg-gray-800 tall:flex-col ">
        <PlayArea classname='PlayArea flex-1' />
        <SidePanel className="SidePanel h-full w-12 bg-gray-800 tall:w-full tall:h-12 " />
      </div>
    // </DndProvider>
  )
}

export default App
