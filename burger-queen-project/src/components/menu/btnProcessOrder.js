import { useRouter } from 'next/router';
import styles from "../../styles/boxOrder.module.css";
import { headers } from 'next/dist/client/components/headers';

export function BtnProcessOrder () {
    const router = useRouter();
    const submitOrder = () => {
        fetch('http://localhost:8080/orders', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json', 
            },
            body:JSON.stringify({
                order : {//aquí va la estructura de la orden?
                }
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error=>console.error(error))
    }
    return (
        <div className={styles.processbox}>
                <button className={styles.CancelORder} onClick={()=>router.push('/menu')}>CANCELAR</button>
                <button className={styles.SendOrder} onClick={submitOrder}>ENVIAR</button> 
            </div>
        
    )
  }