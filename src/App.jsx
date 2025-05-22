import './App.css'
import { useState, useEffect } from 'react';

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
  const [pending, setPending] = useState(() => {
    const stored = localStorage.getItem('pending')
    return stored ? JSON.parse(stored) : { productivity: [], ocio: [] }
  })
  const [achievedP, setAchievedP] = useState(() => {
    const stored = localStorage.getItem('achievedP')
    return stored ? JSON.parse(stored) : []
  })
  const [achievedO, setAchievedO] = useState(() => {
    const stored = localStorage.getItem('achievedO')
    return stored ? JSON.parse(stored) : []
  })

  // Cargar datos del localStorage al montar la página
  useEffect(() => {
    const storedP = localStorage.getItem('pending')
    const storedAP = localStorage.getItem('achievedP')
    const storedAO = localStorage.getItem('achievedO')
    if (storedP) {
      try {
        setPending(JSON.parse(storedP))
        setAchievedP(JSON.parse(storedAP))
        setAchievedO(JSON.parse(storedAO))
      } catch (e) {
        console.error('Error al parsear datos de localStorage:', e)
      }
    }
  }, [])

  // Guardar cambios en localStorage cuando las actividades cambien
  useEffect(() => {
    localStorage.setItem('pending', JSON.stringify(pending))
  }, [pending])
  useEffect(() => {
    localStorage.setItem('achievedP', JSON.stringify(achievedP))
  }, [achievedP])
  useEffect(() => {
    localStorage.setItem('achievedO', JSON.stringify(achievedO))
  }, [achievedO])

  const getRandomItems = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const generateRandom = () => {
    if (!option) return

    const persona = option === "Xilef" ? Xilef : Ana

    const randomProductivity = getRandomItems(persona.Productivity, 2)
    const randomOcio = getRandomItems(persona.Ocio, 2)

    setPending({
      productivity: randomProductivity,
      ocio: randomOcio
    })

    localStorage.setItem('pending', {
      productivity: randomProductivity,
      ocio: randomOcio
    })
    console.log(localStorage.getItem('pending'))
  }

  const handleChange = (e) => {
    setOption(e.target.value)
  }

  const resetApp = () => {
    setPending({ productivity: [], ocio: [] })
    setAchievedP([])
    setAchievedO([])
  }

  return (
    <>
      <div className="bg-blue-500 p-2 w-full text-center">
        <h1 className="text-3xl font-bold">Daily task</h1>
      </div>

      <div className="bg-blue-400 w-9/10 md:w-2/4 m-4 p-4 rounded-2xl mx-auto">
        <h1 className="text-center font-semibold text-xl mb-2">Selección</h1>

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

        <h1 className='text-center font-semibold text-xl'>Tareas pendientes</h1>

        <div className="grid grid-cols-2 gap-4 text-center my-2">
          <div>
            <h3 className="font-semibold underline">Productividad</h3>
            <ul className='grid grid-cols-1'>
              {pending.productivity.map((act, index) => (
                <button className={`bg-gray-400 p-2 border-x-2 border-t-2 ${(pending.productivity.length === 1 || index === 1) && `border-b-2`} `}
                        onClick={() => setAchievedP(prev => [...prev, act]) + 
                          setPending(prev => ({
                          ...prev,
                          productivity: prev.productivity.filter(item => item !== act)
                        }))}>
                  <li key={index}>{act}</li>
                </button>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold underline">Ocio</h3>
            <ul className='grid grid-cols-1'>
              {pending.ocio.map((act, index) => (
                <button className={`bg-gray-400 p-2 border-x-2 border-t-2 ${(pending.ocio.length === 1 || index === 1) && `border-b-2`} `}
                        onClick={() => setAchievedO(prev => [...prev, act]) + 
                        setPending(prev => ({
                          ...prev,
                          ocio: prev.ocio.filter(item => item !== act)
                        }))}>
                  <li key={index}>{act}</li>
                </button>
              ))}
            </ul>
          </div>
        </div>

        <h1 className='text-center font-semibold text-xl m-2'>Tareas terminadas</h1>

        <div className="grid grid-cols-2 gap-4 text-center my-2">
          <div>
            <h3 className="font-semibold underline">Productividad</h3>
            <ul className='grid grid-cols-1'>
              {achievedP.map((act, index) => (
                <button className={`bg-green-400 p-2 border-x-2 border-t-2 ${(achievedP.length === 1 || index === 1) && `border-b-2`} `}
                        //onClick={() => setPending({
                        //  productivity: pending.productivity + act
                        //})}
                        >
                  <li key={index}>{act}</li>
                </button>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold underline">Ocio</h3>
            <ul className='grid grid-cols-1'>
              {achievedO.map((act, index) => (
                <button className={`bg-green-400 p-2 border-x-2 border-t-2 ${(achievedO.length === 1 || index === 1) && `border-b-2`}`}
                        //onClick={() => setPending({
                        //  ocio: pending.ocio + act
                        //})}
                        >
                  <li key={index}>{act}</li>
                </button>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className='w-9/10 md:w-2/4 place-self-center'>
        <button className='bg-red-500 rounded-2xl p-2'
                onClick={resetApp}>Reiniciar</button>
      </div>
    </>
  )
}

export default App