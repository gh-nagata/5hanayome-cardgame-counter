import React from 'react'
import SidePanel from './components/SidePanel'
import PlayArea from './components/PlayArea'
// import OpponentCharacterLane from './components/OpponentCharacterLane'

const App = () => {
  return (
    <div className="h-full w-full flex tall:bg-red-400 tall:flex-col ">
      <PlayArea classname='PlayArea flex-1' />
      {/* サイドパネル */}
      <SidePanel className="SidePanel h-full w-12 bg-gray-800 tall:w-full tall:h-12 " />
    </div>
  )
}

export default App
