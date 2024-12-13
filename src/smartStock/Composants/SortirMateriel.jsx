import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function SortirMateriel() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorsMesg, setErrorsMesg] = useState("")

  const connexion = (data) => {
    // console.log(data)
    const auth = async () => {
      
    };

    auth();

  };

  return (
    <form onSubmit={handleSubmit(connexion)}>
      <label htmlFor="chk" className='label' aria-hidden="true">Sortir de matériel</label>
 
 <table>
  <tr>
<td>Titre produit</td>
<td>Quantité</td>
  </tr>
 </table>
      <div style={{display:"flex"}}>

      <input
        type="text"
        className={'input'}
        placeholder="Titre produit"
        style={{height:"55px"}}
      />
      <input
        type="text"
        className={'input'}
        placeholder="Quantité"
        
        style={{height:"55px"}}
      />
      <input
        type="text"
        className={'input'}
        placeholder="Prix unitaire"
        
        style={{height:"55px"}}
      />

      </div>

      <div style={{display: "flex"}}>
                    
      <select name="" id="" className={'input'} style={{height:"55px"}}>
        <option value="">Titre produit 1</option>
        <option value="">Titre produit 2</option>
        <option value="">Titre produit 3</option>
        <option value="">Titre produit 4</option>
        <option value="">Titre produit 5</option>
        <option value="">Titre produit 6</option>
        <option value="">Titre produit 7</option>
        <option value="">Titre produit 8</option>
        <option value="">Titre produit 9</option>
        <option value="">Titre produit 10</option>
      </select>

      <input
        type="text"
        className={errors.titre ? 'inputError' : 'input'}
        placeholder="Titre materiel"
        {...register("titre", {
          required: "required",
         
        })}
      />

<input
        type="text"
        className={'input'}
        placeholder="Stock Disponible"
        {...register("stock")}
      />
      </div>

      {/* {errors.mdpLogin && <span className="errorMessage">{errors.mdpLogin.message}</span>} */}
      {/* message champ de saisi */}
      <div style={{ backgroundColor: "red", color: "white", textAlign: "center" }}>
        {errorsMesg}
      </div>

      <button className='button'>VALIDER</button>
    </form>
  )
}
