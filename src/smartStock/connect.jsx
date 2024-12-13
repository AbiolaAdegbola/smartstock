import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Connect({ actifContainer, setActifContainer }) {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()

  const connexion = (data) => {
    navigate('/smartStock');
  };

  return (
    <form onSubmit={handleSubmit(connexion)}>
      <label htmlFor="chk" className='label' aria-hidden="true">Connexion</label>
      <input
        type="email"
        className={errors.mail ? 'inputError' : 'input'}
        placeholder="Email"
        {...register("mail", {
          required: "required",
          pattern: {
            value: /\S+@\S+\.\S+/,
          },
        })}
      />

      <input
        type="password"
        className={errors.mdpLogin ? 'inputError' : 'input'}
        placeholder="Mot de passe"
        {...register("mdpLogin", {
          required: "required",
          minLength: {
            value: 5,
          },
        })}
      />
      {/* {errors.mdpLogin && <span className="errorMessage">{errors.mdpLogin.message}</span>} */}
      {/* message champ de saisi */}
      <div style={{ backgroundColor: "red", color: "white", textAlign: "center" }}>
        {actifContainer[1]}
      </div>

      <button className='button'>s'identifier</button>
    </form>
  )
}
