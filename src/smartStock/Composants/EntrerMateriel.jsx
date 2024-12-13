import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function EntrerMateriel() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const [errorsMesg, setErrorsMesg] = useState("")

  const connexion = (data) => {
    // console.log(data)
    const auth = async () => {
      
    };
    auth();
  };

  return (
    <form onSubmit={handleSubmit(connexion)}>
      <label htmlFor="chk" className='label' aria-hidden="true">Nouveau matériel</label>
      <input
        type="file"
        className={errors.file ? 'inputError' : 'input'}
        placeholder="file"
        {...register("file", {
          required: "required",
        })}
        style={{height:"60px"}}
      />

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

      <textarea placeholder='Commentaire sur le materiel' {...register("comment")} className={'input'} rows={10} style={{height:"150px"}}></textarea>

      {/* {errors.mdpLogin && <span className="errorMessage">{errors.mdpLogin.message}</span>} */}
      {/* message champ de saisi */}
      <div style={{ backgroundColor: "red", color: "white", textAlign: "center" }}>
        {errorsMesg}
      </div>

      <button className='button'>VALIDER</button>
    </form>
  )
}
