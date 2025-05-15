import { useState } from "react"
import CryptoJS from "crypto-js"

const CLAVE = CryptoJS.enc.Utf8.parse("12345678") 
const IV = CryptoJS.enc.Utf8.parse("87654321")    

function Home() {
  const [texto, setTexto] = useState("")
  const [isCifrar, setIsCifrar] = useState(true)
  const [resultado, setResultado] = useState("")
  const [copiado, setCopiado] = useState(false)

  function changeInput(e) {
    const nuevoTexto = e.target.value
    setTexto(nuevoTexto)
    const nuevoResultado = isCifrar ? cifrarDES(nuevoTexto) : descifrarDES(nuevoTexto)
    setResultado(nuevoResultado)
    setCopiado(false)
  }

  function changeIsCifrar() {
    setIsCifrar(!isCifrar)
    setResultado("")
    setTexto("")
    setCopiado(false)
  }

  function copiarResultado() {
    navigator.clipboard.writeText(resultado)
      .then(() => setCopiado(true))
      .catch(() => alert("Error al copiar"))
  }

  function cifrarDES(texto) {
    const encrypted = CryptoJS.DES.encrypt(texto, CLAVE, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  }

  function descifrarDES(textoCifrado) {
    try {
      const decrypted = CryptoJS.DES.decrypt(textoCifrado, CLAVE, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      })
      const textoPlano = decrypted.toString(CryptoJS.enc.Utf8)
      return textoPlano || "[Texto inválido o clave incorrecta]"
    } catch {
      return "[Error al descifrar]"
    }
  }

  return (
    <>
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        {isCifrar ? "Cifrar un texto DES" : "Descifrar un texto DES"}
      </h1>

      <input
        onChange={changeInput}
        value={texto}
        type="text"
        placeholder={isCifrar ? "Ingrese el texto a cifrar" : "Ingrese el texto cifrado"}
        className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition mb-4"
      />

      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        {isCifrar ? "Texto cifrado:" : "Texto descifrado:"}
      </h2>

      <div className="w-full max-w-xl bg-white border border-gray-300 rounded-md p-4 mb-4 text-sm text-gray-800 break-words shadow-inner min-h-[60px]">
        {resultado || <span className="text-gray-400 italic">Sin resultado aún</span>}
      </div>

      {resultado && (
        <button
          onClick={copiarResultado}
          className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          {copiado ? "¡Copiado!" : "Copiar resultado"}
        </button>
      )}

      <button
        onClick={changeIsCifrar}
        className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
      >
        {isCifrar ? "Cambiar a Descifrar" : "Cambiar a Cifrar"}
      </button>
    </section>
    </>
  )
}

export default Home
