import './App.css'
import { useState } from 'react';

const Xilef = {
  Productivity: [
    "Estudiar un lenguaje de programación",
    "Programar videojuego",
    "Diseñar videojuego",
    "Estudiar tesis",
    "Comodín",
  ],
  Ocio: [
    "Leer",
    "Entretenimiento",
    "Básquet",
    "Piano",
    "Videojuego",
  ]
}

const Ana = {
  Productivity: [
    "Estudiar NIF",
    "Estudiar tesis",
    "Estudiar activos y pasivos",
    "Leer el código fiscal de la federación",
    "Comodín",
  ],
  Ocio: [
    "Leer",
    "Entretenimiento",
    "Básquet",
    "Pintar",
    "Videojuego",
  ]
}

function App() {
  const [option, setOption] = useState(null)
  const [activities, setActivities] = useState({ productivity: [], ocio: [] })

  const getRandomItems = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const generateRandom = () => {
    if (!option) return

    const persona = option === "Xilef" ? Xilef : Ana

    const randomProductivity = getRandomItems(persona.Productivity, 2)
    const randomOcio = getRandomItems(persona.Ocio, 2)

    setActivities({
      productivity: randomProductivity,
      ocio: randomOcio
    })
  }

  const handleChange = (e) => {
    setOption(e.target.value)
  }

  return (
    <>
      <div className="bg-blue-500 p-2 w-full text-center">
        <h1 className="text-3xl font-bold">Daily task</h1>
      </div>

      <div className="bg-blue-400 w-3/4 m-4 p-4 rounded-2xl mx-auto">
        <h2 className="text-center font-semibold text-xl mb-2">Actividades</h2>

        <div className="flex flex-row justify-center mb-4">
          <form className="flex flex-row gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="option"
                value="Xilef"
                onChange={handleChange}
              />
              Xilef
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="option"
                value="Ana"
                onChange={handleChange}
              />
              Ana
            </label>
          </form>

          <button
            className="bg-indigo-700 w-10 h-10 rounded-full border-2 border-white ml-4"
            onClick={generateRandom}
          >
            🎲
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <h3 className="font-semibold underline">Productividad</h3>
            <ul>
              {activities.productivity.map((act, index) => (
                <li key={index}>{act}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold underline">Ocio</h3>
            <ul>
              {activities.ocio.map((act, index) => (
                <li key={index}>{act}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}


export default App