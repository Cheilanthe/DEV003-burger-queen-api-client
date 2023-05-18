import { useRouter } from 'next/router';
import styles from "../../styles/boxOrder.module.css";
import { headers } from 'next/dist/client/components/headers';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVuZW1haWxAZ21haWwuY29tIiwiaWF0IjoxNjg0NDMyNzk4LCJleHAiOjE2ODQ0MzYzOTgsInN1YiI6IjMifQ.Jwa_O4pJnYepe5F16zzjbCI_6cZTR4uH4tffxe3ai-I';
// ya pude hacer el método de post pero aún no puedo poner el cuerpo del objeto en la petición post 
export function BtnProcessOrder ({ joinOrder }) {
    const router = useRouter();
    const submitOrder = () => {
        const headers = {'Authorization': `Bearer ${token}` };
        fetch('http://localhost:8080/orders', {
            method: 'POST',
            headers,
            body:JSON.stringify({
                joinOrder
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