import { useState, useEffect } from "react"
import { winningArrays, circles } from "./utils"
import rulepic from "./example.png"
function App() {
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [player1, setPlayer1] = useState("Player 1")
  const [player2, setPlayer2] = useState("Player 2")
  const [box, setBox] = useState(circles)
  const [result, setResult] = useState()
  const [dialog, setDialog] = useState(false)
  const [rules, setRules] = useState(true)
  const [playerInfo, setPlayerInfo] = useState(false)

  const [winningSet, setWinningSet] = useState([])

  function checkBoard() {
    for (let y = 0; y < winningArrays.length; y++) {
      const square1 = box[winningArrays[y][0]]
      const square2 = box[winningArrays[y][1]]
      const square3 = box[winningArrays[y][2]]
      const square4 = box[winningArrays[y][3]]

      //check those squares to see if they all have the class of player-one
      if (square1 === 1 && square2 === 1 && square3 === 1 && square4 === 1) {
        setWinningSet([
          winningArrays[y][0],
          winningArrays[y][1],
          winningArrays[y][2],
          winningArrays[y][3],
        ])

        setResult(`${player1} Wins!`)
      }
      //check those squares to see if they all have the class of player-two
      if (square1 === 2 && square2 === 2 && square3 === 2 && square4 === 2) {
        setWinningSet([
          winningArrays[y][0],
          winningArrays[y][1],
          winningArrays[y][2],
          winningArrays[y][3],
        ])

        setResult(`${player2} Wins!`)
      }
    }
  }

  function reset() {
    setBox(circles)
    setCurrentPlayer(1)
    setResult()
    setWinningSet([])
  }

  useEffect(() => {
    checkBoard()
  }, [box])

  const onClickHandler = (index) => {
    console.log("index: ", index)
    if (box[index + 6] !== 0 && box[index] !== 1 && box[index] !== 2) {
      const newBox = [...box]
      newBox[index] = currentPlayer
      console.log(newBox)
      setBox(newBox)
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
    } else {
      setDialog(true)
      setTimeout(() => {
        setDialog(false)
      }, 3000)
      console.log("Cant go here")
    }
  }

  const beginPlay = () => {
    reset()
    setPlayerInfo(false)
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full min-h-full overflow-y-auto font-noto bg-gradient-to-r from-gray-900 to-gray-800">
      <h3 className="p-4 text-3xl text-cyan-400 opacity-80 lg:text-6xl">
        CONNECT 4{" "}
      </h3>
      <h3
        className={`w-240 text-center text-xl p-4 text-white mb-2 rounded-lg lg:my-4 ${
          currentPlayer === 1 &&
          "bg-gradient-to-r from-cyan-500 to-teal-400 border-teal-400"
        } ${
          currentPlayer === 2 &&
          "bg-gradient-to-r from-pink-500 to-rose-400 border-rose-400"
        } `}
      >
        <span id="current-player">
          {currentPlayer == 1 ? player1 : player2}
        </span>
        's Turn
      </h3>{" "}
      {result && <h3>{result}</h3>}
      <div className="flex flex-wrap border border-separate rounded-lg shadow-lg border-gray-50 w-240 h-280">
        {box &&
          box.map((item, index) => (
            <div
              onClick={() => {
                onClickHandler(index)
              }}
              className={`w-40 h-40 rounded-full m-0.5 border focus-within:outline-none focus:outline-none active:outline-none focus:ring-0 active:outline-none
              ${
                box[index + 6] !== 1 &&
                box[index + 6] !== 2 &&
                box[index + 6] !== -1
                  ? "bg-gray-700"
                  : "cursor-pointer"
              }
              ${index > 41 && "taken hidden"} ${
                box[index] === 1 &&
                "bg-gradient-to-r from-cyan-500 to-teal-400 border-teal-400 animate-coin-bounce"
              } ${
                box[index] === 2 &&
                "bg-gradient-to-r from-pink-500 to-rose-400 border-rose-400 animate-coin-bounce"
              }
              ${winningSet.includes(index) && "border-4 border-white bg-white"}
               `}
            ></div>
          ))}
      </div>
      <div className="grid w-full grid-cols-1 gap-2 p-3 text-white lg:flex lg:justify-center lg:items-center">
        <button
          onClick={() => setRules(true)}
          className="p-4 text-sm bg-gray-900 border border-gray-700 rounded-lg shadow-xl bg-gradient-to-r from-blueGray-800 to-gray-800 focus-within:outline-none hover:bg-opacity-50 active:bg-opacity:50 lg:w-4/12"
        >
          Rules
        </button>
        <button
          className="p-4 text-sm bg-gray-900 border border-gray-700 rounded-lg shadow-xl bg-gradient-to-r from-blueGray-800 to-gray-800 focus-within:outline-none hover:bg-opacity-50 active:bg-opacity:50 lg:w-4/12"
          onClick={() => setPlayerInfo(true)}
        >
          Change Player info
        </button>
        <button
          className="p-4 text-sm bg-gray-900 border border-gray-700 rounded-lg shadow-xl bg-gradient-to-r from-blueGray-800 to-gray-800 focus-within:outline-none hover:bg-opacity-50 active:bg-opacity:50 lg:w-4/12"
          onClick={() => reset()}
        >
          Reset Game
        </button>
      </div>
      {dialog && (
        <div className="absolute p-4 text-white bg-gray-900 border border-gray-300 rounded-md top-10 bg-opacity-95 animate-coin-bounce">
          You cant go in there{" "}
        </div>
      )}
      {result && (
        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-60">
            <div className="flex flex-col items-center justify-center w-full bg-black h-2/5">
              <h2 className="m-3 text-4xl text-white uppercase animate-pulse">
                {result}
              </h2>
              <h3 className="m-2 mt-5 text-sm text-gray-100">
                {currentPlayer === 2 ? player2 : player1}, do you think you can
                beat {currentPlayer === 2 ? player1 : player2}?
              </h3>
              <button
                className="w-11/12 p-4 text-white border-teal-400 rounded-lg shadow-lg bg-gradient-to-r from-cyan-500 to-teal-400"
                onClick={() => {
                  beginPlay()
                }}
              >
                Hell Yeah! Play again
              </button>
            </div>
            <div className="h-3/5"></div>
          </div>
        </div>
      )}
      {playerInfo && (
        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
          <div className="relative flex flex-col items-center justify-center w-full h-full bg-gray-900">
            <h2 className="m-3 text-3xl text-white">Player Info</h2>
            <input
              type="text"
              placeholder="Enter Player 1 name"
              className="w-11/12 p-4 mb-2 text-gray-600 border border-gray-300 rounded-md lg:w-3/12 focus:outline-none focus-within:outline-none"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Player 2 name"
              className="w-11/12 p-4 mb-2 text-gray-600 border border-gray-300 rounded-md lg:w-3/12 focus:outline-none focus-within:outline-none"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
            />
            <button
              className="w-11/12 p-4 text-white border-teal-400 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-400 lg:w-3/12 focus:outline-none focus-within:outline-none"
              onClick={() => {
                beginPlay()
              }}
            >
              Let's play
            </button>
          </div>
        </div>
      )}
      {rules && (
        <div className="absolute inset-0 flex items-center justify-center w-full h-full overflow-y-auto bg-gray-900">
          <div className="relative flex flex-col items-center justify-center w-full h-full text-white lg:w-5/12">
            <div
              className="absolute text-4xl font-bold text-white top-5 right-5"
              onClick={() => setRules(false)}
            >
              X
            </div>
            <h2 className="p-2 text-3xl">Connect 4 - Rules</h2>
            <img src={rulepic} className="h-48 my-2 w-44" alt="rules" />
            <p className="w-11/12 lg:w-4/12">
              The Connect 4 Board Game Rules are easy to understand. In fact, it
              is in the name.{" "}
            </p>
            <p className="w-11/12 mt-2 lg:w-4/12">
              To win Connect Four, all you have to do is connect four of your
              colored checker pieces in a row, much the same as tic tac toe.
              This can be done horizontally, vertically or diagonally.
            </p>
            <p className="w-11/12 mt-2 lg:w-4/12">
              Each player will drop in one checker piece at a time. This will
              give you a chance to either build your row, or stop your opponent
              from getting four in a row.
            </p>
            <p className="w-11/12 mt-2 lg:w-4/12">
              Players alternate chances until we have a winner
            </p>
            <button
              className="w-11/12 p-4 mt-2 text-white border-teal-400 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-400 lg:w-5/12"
              onClick={() => {
                setPlayerInfo(true)
                setRules(false)
              }}
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
