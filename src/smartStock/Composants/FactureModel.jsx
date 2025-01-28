import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { Spinner } from "react-bootstrap";
import logo from '../../assets/logo.png'


const FormField = ({ name, label, placeholder, control, rules }) => (
  <div style={{ marginBottom: "10px" }}>
    <label htmlFor={name}>{label}</label>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <>
          <input
            {...field}
            id={name}
            placeholder={placeholder}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
          {error && <span style={{ color: "red" }}>{error.message}</span>}
        </>
      )}
    />
  </div>
);

const FactureModel = () => {
  const [loading, setLoading] = useState(false);
  const [actifContainer, setActifContainer] = useState(1);
  const [total, setTotal] = useState(2580000);
  const [conditions, setConditions] = useState([
    { label: "À la commande", pourcentage: 20 },
    { label: "Au début des travaux", pourcentage: 30 },
    { label: "Solde à la livraison", pourcentage: 50 },
  ]);

  // Utilisation de react-hook-form
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      logo: "",
      nomEntreprise: "",
      phone: "",
      email: "",
      adresse: "",
    },
  });

  const formData = watch();

  const handleModelDevis = (id) => {
    setActifContainer(id);
  };

  const onSubmit = async (data) => {
setLoading(true)
    try {

    //   const user = JSON.parse(localStorage.getItem("user"));

      const field = new FormData();

    //   field.append("id_user", user._id);
      field.append("logo", data.logoSend);
      field.append("nomEntreprise", data.nomEntreprise);
      field.append("phone", data.phone);
      field.append("email", data.email);
      field.append("adresse", data.adresse);
      field.append("valDate", data.valDate);
      field.append("statutJuridique", data.statutJuridique);
      field.append("tva", data.tva);
      field.append("conditions", JSON.stringify(conditions));
      field.append("capital", data.capital);
      field.append("siteWeb", data.siteWeb);
      field.append("rccm", data.rccm);
      field.append("n_cc", data.n_cc);
      field.append("iban", data.iban);
      field.append("bank", data.bank);

      // field.append("n_cc", data.n_cc);

      // console.log(field.get("logo"))

    //   const response = await axios.put(`${localhost.ip}/api/users/model_devis`,
    //     field,
    //     {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     }
    //   )

    //   if (response.data.msg === "succès") {
    //     const new_user = {
    //       ...user,
    //       devis: response.data.result
    //     }
    //     // console.log(new_user)
    //     localStorage.setItem("user", JSON.stringify(new_user))
    //     navigate("/profil_entreprise")
    //   }
      
    } catch (error) {
      
    }finally{
      setLoading(false)
    }
  };

  const handleTotalChange = (e) => {
    setTotal(parseFloat(e.target.value) || 0);
  };

  const handlePourcentageChange = (index, value) => {
    const newConditions = [...conditions];
    newConditions[index].pourcentage = parseFloat(value) || 0;
    setConditions(newConditions);
  };

  const addCondition = () => {
    setConditions([
      ...conditions,
      { label: "Nouvelle condition", pourcentage: 0 },
    ]);
  };

  const removeCondition = (index) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    setConditions(newConditions);
  };

  const totalPourcentage = conditions.reduce(
    (acc, condition) => acc + condition.pourcentage,
    0
  );

  return (
    <div >

      {/* Personnaliser votre modèle de devis */}
      <div style={{ display: "flex", alignItems: "flex-start "}}>
        {/* Formulaire d'information */}
        <div
          style={{
            // position: "fixed",
            // height: "90vh",
            overflow: "auto",
            backgroundColor: "white",
            border: "1px solid rgba(192,192,192, 0.5)",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} >
            <div style={{ display: actifContainer === 1 ? "initial" : "none" }}>
              <div style={{ color: "gray", marginBottom: "10px" }}>
                <h6 style={{ textDecoration: "underline", textAlign: "center" }}>Vos informations</h6>
                <label
                  htmlFor="logoFile"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    border: "1px solid rgba(192,192,192,0.8)",
                    boxShadow: "0px 2px 4px rgba(192,192,192,0.5)",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                >
                  <FaCirclePlus size={24} />
                  <div>Logo</div>
                </label>
                <Controller
                  name="logo"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="file"
                      id="logoFile"
                      style={{ display: "none" }}
                      onChange={(e) =>{
                        setValue("logo", URL.createObjectURL(e.target.files[0]))
                        setValue("logoSend", e.target.files[0])
                      }
                        
                      }
                    />
                  )}
                />
              </div>

              <Controller
                name="logo"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    id="logoFile"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setValue("logo", URL.createObjectURL(e.target.files[0]))
                    }
                  />
                )}
              />

              {[
                { name: "nomEntreprise", label: "Nom de l'entreprise", placeholder: "Nom de l'entreprise", rules: { required: "Ce champ est requis" } },
                { name: "phone", label: "Numéro de téléphone", placeholder: "Numéro de téléphone", rules: { required: "Ce champ est requis" } },
                { name: "email", label: "E-mail de contact", placeholder: "E-mail de contact", rules: { required: "Ce champ est requis", pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Format email invalide" } } },
                { name: "adresse", label: "Adresse", placeholder: "Adresse", rules: { required: "Ce champ est requis" } },
                { name: "valDate", label: "Valable pendant", placeholder: "Valable 2 mois" },
                { name: "statutJuridique", label: "Statut juridique", placeholder: "Statut juridique" },
                { name: "tva", label: "TVA", placeholder: "TVA" },
              ].map((field) => (
                <FormField key={field.name} {...field} control={control} />
              ))}

              <div style={{ marginBottom: "10px", marginTop: "30px", padding: "4px 20px", backgroundColor: "rgb(0,172,237)", color: "white", borderRadius: "4px", textAlign: "center", cursor: "pointer" }} onClick={() => handleModelDevis(2)}>SUIVANT</div>
            </div>

            {/* CONDITION DE FACTURATION */}
            <div style={{ display: actifContainer === 2 ? "initial" : "none" }}>
              <h6 style={{ textDecoration: "underline", textAlign: "center", color: "gray" }}>Vos condition de facturation</h6>

              <div>
                <label>
                  Total (F CFA):
                  <input
                    type="number"
                    value={total}
                    onChange={handleTotalChange}
                    style={{ margin: "0 10px", width: "100px" }}
                  />
                </label>
              </div>
              <div>
              <div style={{marginTop: '20px',}}>
                <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '20px',}}>
                    <tbody>
                    {conditions.map((condition, index) => (
                  <tr key={index}>
                  <td style={{border: '1px solid #ddd', padding: '8px',  textAlign: 'left',}}>
                    <input
                      type="text"
                      value={condition.label}
                      onChange={(e) => {
                        const newConditions = [...conditions];
                        newConditions[index].label = e.target.value;
                        setConditions(newConditions);
                      }}
                      style={{width:"100%"}}
                    /></td>
                  <td>
                  <input
                      type="number"
                      value={condition.pourcentage}
                      onChange={(e) =>
                        handlePourcentageChange(index, e.target.value)
                      }
                      style={{ marginRight: "5px", width: "50px", }}
                    />
                    % <FaTrashAlt onClick={() => removeCondition(index)}
                      style={{
                        marginLeft: "10px",
                        color: "red",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }} />
                  </td>
 
              </tr>
                ))}
                        
                    </tbody>
                </table>
            </div>
                
              </div>
              <div style={{ marginTop: "20px" }}>
                <span onClick={addCondition} style={{ marginRight: "10px", cursor: "pointer", color: "#00ACED" }}>
                  Ajouter une condition <FaCirclePlus style={{ fontSize: "12px" }} />
                </span><br /><br />
                <p>
                  Total des pourcentages: {totalPourcentage}%{" "}
                  {totalPourcentage > 100 && (
                    <span style={{ color: "red" }}> (Erreur: dépasse 100%)</span>
                  )}
                </p>
              </div>


              <div style={{ marginBottom: "20px", marginTop: "30px", padding: "4px 20px", backgroundColor: "rgb(0,172,237)", color: "white", borderRadius: "4px", textAlign: "center", cursor: "pointer" }} onClick={() => handleModelDevis(3)}>SUIVANT</div>

            </div>

            {/* DONNEES COMPTE ET NUMERO IBAN */}
            <div style={{ display: actifContainer === 3 ? "initial" : "none" }}>
              <h6 style={{ textDecoration: "underline", textAlign: "center", color: "gray" }}>Vos coordornnées</h6>

              {[
                { name: "capital", label: "Capital de votre entreprise", placeholder: "Capital de votre entreprise" },
                { name: "siteWeb", label: "Site web", placeholder: "Site web" },
                { name: "rccm", label: "N° RCCM", placeholder: "N° RCCM" },
                { name: "n_cc", label: "N° CC", placeholder: "N° CC" },
                { name: "bank", label: "Nom de votre banque", placeholder: "Nom de votre banque" },
                { name: "iban", label: "N° IBAN", placeholder: "N° IBAN" },
                // { name: "tva", label: "TVA", placeholder: "TVA" },
              ].map((field) => (
                <div key={field.name} style={{ marginBottom: "10px" }}>
                  <label>{field.label}</label>
                  <Controller
                    name={field.name}
                    control={control}
                    render={({ field: controllerField }) => (
                      <input
                        {...controllerField}
                        type="text"
                        placeholder={field.placeholder}
                        style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                      />
                    )}
                  />
                </div>
              ))}

              {/* <label htmlFor="modelDevisSubmit" style={{  marginTop: "30px", padding: "4px 20px", backgroundColor: "rgb(0,172,237)", color: "white", borderRadius: "4px", textAlign: "center", position: "absolute", width: "94%", cursor: "pointer" }}>TERMINER</label>
              <input type="submit" style={{ display: "none" }} id="modelDevisSubmit" /> */}

              <div style={{ textAlign: 'center', marginTop: '20px',marginBottom: "20px", }}>
              <button
                type="submit"
                style={{
                  color: 'white',
                  backgroundColor: 'rgb(0,172,237)',
                  borderRadius: '5px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  border: 'none',
                  width: "100%"
                }}
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "TERMINER"}
              </button>
            </div>

            </div>
          </form>
        </div>

        {/* Prévisualisation du modèle de devis */}
        <div
          style={{
            backgroundColor: "white",
            // height: "90vh",
            marginLeft: "20px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >

          <Devis1 data={formData} condition={conditions} total={total}/>

        </div>
      </div>
    </div>
  );
};

export default FactureModel;


const Devis1 = ({data, condition, total}) => {


    return (
        <div style={styles.containerDevis}>
            <div style={styles.header}>
                <img src={logo} alt="Logo" style={styles.logo} />
                <div style={styles.headerText}>
                    <h1 style={styles.title}>FACTURE</h1>
                    <p>Date: 01/04/2019<br />Numéro: 001/04<br />Valable {data?.valDate || "2 mois"}</p>
                </div>
            </div>

            <div style={{marginTop:"-10px"}}>
                <p><strong>{data?.nomEntreprise || "Votre entreprise"}</strong><br />{data?.statutJuridique || "Statut juridique"}<br />{data?.adresse || "Adresse"}<br />{data?.phone || "N° de téléphone"}<br />{data?.email || "Adresse e-mail"}</p>
            </div>

            <div style={{marginTop:"-100px", marginLeft:"62%"}}>
                <p><strong>Le client</strong><br />Son adresse<br />Code postal<br />Ses coordonnées</p>
            </div>

            <div style={styles.details}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Désignation</th>
                            <th style={styles.th}>Unité</th>
                            <th style={styles.th}>Qté</th>
                            <th style={styles.th}>Prix HT</th>
                            <th style={styles.th}>TOTAL HT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.td}>Démolition de cloison en placo</td>
                            <td style={styles.td}>m²</td>
                            <td style={styles.td}>09</td>
                            <td style={styles.td}>9,00 €</td>
                            <td style={styles.td}>81,00 €</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Dressement de mur en mortier</td>
                            <td style={styles.td}>m²</td>
                            <td style={styles.td}>03</td>
                            <td style={styles.td}>49,00 €</td>
                            <td style={styles.td}>147,00 €</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={styles.details}>
                <table style={styles.table}>
                    <tbody>
                        <tr>
                            <td style={styles.td}>Total HT</td>
                            <td style={styles.totalsTd}>228,00 €</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>TVA {data?.tva || 20}%</td>
                            <td style={styles.totalsTd}>45,60 €</td>
                        </tr>
                        <tr>
                            <td style={styles.td}><strong>TOTAL TTC</strong></td>
                            <td style={styles.totalsTd}><strong>273,60 €</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={styles.paymentTerms}>
                {/* <p>Durée estimée des travaux : 4 jours ouvrables à compter de la date de signature du devis.</p> */}
                <p>Si bon pour accord :<br />
                {
                    condition.map((el, k) => {
                        return (
                            <div>
                                {el.pourcentage}% {el.label} : { (total*el.pourcentage) / 100} F CFA
                            </div>
                        )
                    })
                }
                    {/* 20% du total doit être réglé à la commande soit : 54,60 €<br />
                    30% au début des travaux soit : 82,08 €<br />
                    Solde à la livraison, paiement comptant dès réception soit : 136,92 € */}
                    </p>
                <p>Merci de retourner un exemplaire du devis daté et signé avec la mention "bon pour accord" manuscrit.</p>
            </div>

            <div style={styles.signature}>
                <p>SIGNATURE DU CLIENT</p>
            </div>

            <div style={styles.footer}>
                <p>Mode de paiement : Carte bleue, Chèque à l'ordre de {data?.nomEntreprise}, Virement (RIB) : {data?.iban}, espèce.<br />
               Capital social : {data?.capital}, N°RCCM : {data?.rccm}, N°CC : {data?.n_cc}, site web : {data?.siteWeb}, E-mail : {data?.email}</p>
            </div>
        </div>
    );
};

const styles = {
    body: {
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        backgroundColor: '#f5f5f5',
        color: '#333',
    },
    containerDevis: {
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: '100px',
        height: '100px',
    },
    headerText: {
        textAlign: 'right',
    },
    title: {
        margin: 0,
        color: '#4a90e2',
    },
    details: {
        marginTop: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    th: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#4a90e2',
        color: '#fff',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    },
    totalsTd: {
        textAlign: 'right',
    },
    paymentTerms: {
        marginTop: '20px',
        fontSize: '14px',
        lineHeight: 1.5,
    },
    signature: {
        marginTop: '30px',
        fontWeight: 'bold',
    },
    footer: {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '12px',
        color: '#666',
    },
};