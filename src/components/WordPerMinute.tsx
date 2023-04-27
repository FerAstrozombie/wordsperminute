import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const WORDS = [
    "pokemon",
    "digimon",
    "caballeros",
    "auriculares",
    "manifiesto",
    "destructuracion",
    "aquelarre",
    "infraestructura",
    "manipulacion",
    "aeroventilas",
    "monorriel",
    "dentrifico",
    "aspiraciones",
    "estacionamiento",
    "hiperventilacion",
    "reestructuracion",
    "alfabeto",
    "recreacion",
    "palanqueta",
    "insignificante",
    "implementacion",
    "mutabilidad",
    "inexistente",
    "inexpresivo",
    "repelente",
    "reafirmacion",
    "contradiccion",
    "inquietud",
    "malintencionado",
    "muercielago",
    "abstraccion",
    "computacion",
]

export default function WordsPerMinute() {
    const [word, setWord] = useState(() => WORDS[Math.random() * WORDS.length | 0]);
    const [characterCount, setCharacterCount] = useState(0);
    const [buffer, setBuffer] = useState("");
    const [time, setTime] = useState(0);

    let userStorage = sessionStorage.getItem("user");
    function swallFire(){
        MySwal.fire({
            title: "Ingrese usuario",
            input: "text",
            })
            .then(resultado =>{
                if (resultado.value){
                    let user = resultado.value
                    sessionStorage.setItem("user", user);
                    setTimeout(() => location.reload(), 2000)
                }
    })
    }

    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (buffer === word) {
            setWord(WORDS[Math.random() * WORDS.length | 0]);
            setCharacterCount((characterCount) => characterCount + word.length);
        }
        setBuffer("");
    }

    useEffect(() => {
        if (time !== 0) {
            const timeout = setTimeout(() => setTime(time - 1), 1000);
            return () => clearTimeout(timeout);
        }
    }, [time])

    return (
        <div className="padre">
            {userStorage ? (
                <h1>Bienvenido: {userStorage}</h1>
            ): (
                <>
                    <button onClick={() => { swallFire() }}>Ingresar usuario</button>
                </>
            )}
            {time ? (
                <>
                    {Boolean(time) && <h1 className="words">{word}</h1>}
                    <h2>Caracteres tipeadas: {characterCount}</h2>
                    <h2>Tiempo restante: {time}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            autoFocus
                            value={buffer}
                            onChange={(e) => setBuffer(e.target.value)} />
                        <button type="submit">Enviar</button>
                    </form>
                </>

            ) : (
                <>
                    <button onClick={() => { setTime(65), setCharacterCount(0) }}>Play</button>
                </>

            )}
        </div>
    )

}