import { useRouter } from 'next/router';
import styles from "../../styles/boxOrder.module.css";
import { headers } from 'next/dist/client/components/headers';

// ya pude hacer el método de post, revisar la estructura del objeto orden, no es la que se solicita en la bd
export function BtnProcessOrder ( props ) {
    const order = props;
    console.log('props', order);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVuZW1haWxAZ21haWwuY29tIiwiaWF0IjoxNjg0NzgyMjg1LCJleHAiOjE2ODQ3ODU4ODUsInN1YiI6IjMifQ.zpNnrYBqRW9RLxqBXpLordTT3nCG25xxuP7IDPV57l4';
    const router = useRouter();
    const submitOrder = () => {
        const headers = {'Authorization': `Bearer ${token}`,  'Content-Type': 'application/json'};
        fetch('http://localhost:8080/orders', 
        {body: JSON.stringify({
            order
        }),
        headers, 
        method: 'POST'})
        .then(response => {response.json(); console.log('enviado', props, order)})
        .catch(error=>console.error(error))
    }
    return (
        <div className={styles.processbox}>
                <button className={styles.CancelORder} onClick={()=>router.push('/menu')}>CANCELAR</button>
                <button className={styles.SendOrder} onClick={submitOrder}>ENVIAR</button> 
            </div>
        
    )
  }