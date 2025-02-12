import React from 'react'
import CharacterLane from './components/CharacterLane'
import HeroLane from './components/HeroLane'
import SidePanel from './components/SidePanel'
import HeroLanes from './components/HeroLanes'
// import OpponentCharacterLane from './components/OpponentCharacterLane'

const App = () => {
  return (
    <div className="h-full flex">
      {/* メインコンテンツ */}
      <div className="main h-full flex-1  flex items-center ">
        <div className="flex flex-col justify-between py-2 h-full max-h-96 w-full">
          <div className="flex justify-between h-2/5 m-1">
            <CharacterLane number={1} opponentCharacterLane={true} />
            <CharacterLane number={2} opponentCharacterLane={true} />
            <CharacterLane number={3} opponentCharacterLane={true} />
            <CharacterLane number={4} opponentCharacterLane={true} />
            <CharacterLane number={5} opponentCharacterLane={true} />
          </div>
          <HeroLanes className=' h-1/6 m-1' />
          <div className="flex justify-between h-2/5 m-1">
            <CharacterLane number={1} />
            <CharacterLane number={2} />
            <CharacterLane number={3} />
            <CharacterLane number={4} />
            <CharacterLane number={5} />
          </div>
        </div>
      </div>

      {/* サイドパネル */}
      <SidePanel className="side h-full w-12  bg-gray-800 " />
    </div>
  )
}

export default App
