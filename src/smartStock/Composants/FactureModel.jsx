import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Spinner } from "react-bootstrap";
import logo from '../../assets/logo.png'
// import signature from '../../assets/signature.png'
import { toast, ToastContainer } from "react-toastify";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import db from '../../firebase-config'; // Importez vos configurations Firebase


const FormField = ({ name, placeholder, control, rules }) => (
  <div style={{ marginBottom: "10px" }}>
    {/* <label htmlFor={name}>{label}</label> */}
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
  const [facturesInfo, setFacturesInfo] = useState(false)
  const [actifContainer, setActifContainer] = useState(1);


  useEffect(() => {

    // recuperation des informations pour la facture
    const fetchFacture = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'factures')); // Récupère tous les matériels de la collection "materiels"
        const materielsData = querySnapshot.docs.map(doc => ({
          id: doc.id, // Ajoutez l'ID du document pour des opérations futures (supprimer, modifier, etc.)
          ...doc.data(), // Récupère les données du document
        }));
        setFacturesInfo(materielsData[0]); // Mettez à jour l'état avec les données récupérées
      } catch (error) {
        console.error("Erreur lors de la récupération des information sur la facture :", error);
      }
    };

    fetchFacture()
    // setValue("n_cc", facture.n_cc)
  }, [])

    // Utilisation de react-hook-form
    const { control, handleSubmit, watch, reset } = useForm({
      defaultValues: facturesInfo,
    });

    console.log(facturesInfo)
  
    useEffect(() => {
      reset(facturesInfo);
    }, [facturesInfo, reset]);

  const formData = watch();

  const handleModelDevis = (id) => {
    setActifContainer(id);
  };

  const onSubmit = async (data) => {
    setLoading(true)
    try {

      const field = {
        nomEntreprise: data.nomEntreprise,
        phone: data.phone,
        email: data.email,
        adresse: data.adresse,
        statutJuridique: data.statutJuridique,
        // capital: data.capital,
        // siteWeb: data.siteWeb,
        // rccm: data.rccm,
        // n_cc: data.n_cc,
        // iban: data.iban,
        // bank: data.bank,
        description: data.description
      }

      //enregistrement des données dans la base de données firebase
      // await addDoc(collection(db, 'factures'), field);
      const materielRef = doc(db, 'factures', "WclDxBH49w20W3aHTJeZ");
      await updateDoc(materielRef, field);
      // Succès
      toast.success('Matériel ajouté avec succès');

    } catch (error) {
      console.error('Erreur lors de l’ajout du matériel :', error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div >

      {/* Personnaliser votre modèle de devis */}
      <div style={{ display: "flex", alignItems: "flex-start " }}>
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
            minWidth: "200px"
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} >
            <div style={{ display: actifContainer === 1 ? "initial" : "none" }}>
              <div style={{ color: "gray", marginBottom: "10px" }}>
                <h6 style={{ textDecoration: "underline", textAlign: "center" }}>Vos informations</h6>
              </div>

              {[
                { name: "nomEntreprise", label: "Nom de l'entreprise", placeholder: "Nom de l'entreprise", rules: { required: "Ce champ est requis" } },
                { name: "phone", label: "Numéro de téléphone", placeholder: "Numéro de téléphone", rules: { required: "Ce champ est requis" } },
                { name: "email", label: "E-mail de contact", placeholder: "E-mail de contact", rules: { required: "Ce champ est requis", pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Format email invalide" } } },
                { name: "adresse", label: "Adresse", placeholder: "Adresse", rules: { required: "Ce champ est requis" } },
                { name: "statutJuridique", label: "Statut juridique", placeholder: "Statut juridique" },
              ].map((field) => (
                <FormField key={field.name} {...field} control={control} />
              ))}

              <div style={{ marginBottom: "10px" }}>
                {/* <label>Détail sur la facture</label> */}
                <Controller
                  name="description"
                  control={control}
                  render={({ field: controllerField }) => (
                    <textarea
                      {...controllerField}
                      type="text"
                      placeholder="Détail sur la facture"
                      style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                  )}
                />
              </div>

              <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: "20px", }}>
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

            {/* DONNEES COMPTE ET NUMERO IBAN */}
            {/* <div style={{ display: actifContainer === 2 ? "initial" : "none" }}>
              <h6 style={{ textDecoration: "underline", textAlign: "center", color: "gray" }}>Vos coordornnées</h6>

              {[
                { name: "capital", label: "Capital de votre entreprise", placeholder: "Capital de votre entreprise" },
                { name: "siteWeb", label: "Site web", placeholder: "Site web" },
                { name: "rccm", label: "N° RCCM", placeholder: "N° RCCM" },
                { name: "n_cc", label: "N° CC", placeholder: "N° CC" },
                { name: "bank", label: "Nom de votre banque", placeholder: "Nom de votre banque" },
                { name: "iban", label: "N° IBAN", placeholder: "N° IBAN" },
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

              <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: "20px", }}>
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

            </div> */}
          </form>
        </div>

        {/* Prévisualisation du modèle de devis */}
        <div
          style={{
            backgroundColor: "white",
            // height: "90vh",
            marginLeft: "10px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >

          <Devis1 data={formData} />

        </div>
      </div>

    </div>
  );
};

export default FactureModel;


const Devis1 = ({ data }) => {


  return (
    <div style={styles.containerDevis}>
      <div style={styles.header}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <div style={styles.headerText}>
          <h1 style={styles.title}>FACTURE</h1>
          <p>Date: 01/01/2025<br />Numéro: 001/04<br />Valable {data?.valDate || "2 mois"}</p>
        </div>
      </div>

      <div style={{ marginTop: "-10px", marginLeft: "20px" }}>
        <p><strong>{data?.nomEntreprise || "Votre entreprise"}</strong><br />{data?.statutJuridique || "Statut juridique"}<br />{data?.adresse || "Adresse"}<br />{data?.phone || "N° de téléphone"}<br />{data?.email || "Adresse e-mail"}</p>
      </div>

      <div style={{ marginTop: "-100px", marginLeft: "62%" }}>
        <p><strong>Le client</strong><br />Son adresse<br />Code postal<br />Ses coordonnées</p>
      </div>

      <div style={styles.details}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Désignation</th>
              <th style={styles.th}>Qté</th>
              <th style={styles.th}>Prix HT</th>
              <th style={styles.th}>TOTAL HT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Démolition de cloison en placo</td>
              <td style={styles.td}>02</td>
              <td style={styles.td}>34 000 F CFA</td>
              <td style={styles.td}>68 000 F CFA</td>
            </tr>
            <tr>
              <td style={styles.td}>Dressement de mur en mortier</td>
              <td style={styles.td}>01</td>
              <td style={styles.td}>75 000 F CFA</td>
              <td style={styles.td}>75 000 F CFA</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.details}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.td}>Total HT</td>
              <td style={styles.totalsTd}>143 000 FCFA</td>
            </tr>

            <tr>
              <td style={styles.td}>Remise</td>
              <td style={styles.totalsTd}>5 000 F CFA</td>
            </tr>

            <tr>
              <td style={styles.td}><strong>TOTAL HT AVEC REMISE</strong></td>
              <td style={styles.totalsTd}><strong>138 000 F CFA</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={styles.paymentTerms}>
        <p>
          {data?.description || "Durée estimée des travaux : 4 jours ouvrables à compter de la date de signature du devis. Le paiement s'effectue en trois tranches : 20% à la commande, 30% au début des travaux et 50% à la livraison."}
        </p>
      </div>

      {/* <div style={styles.signature}>
        <p>Signature du Gérant</p>
        <img src={signature} alt="signature" style={{ width: "150px", height: "150px" }} />
      </div> */}

      {/* <div style={styles.footer}>
        <p>Mode de paiement : Banque : {data?.bank}  Carte bleue, Chèque à l'ordre de {data?.nomEntreprise}, Virement (RIB) : {data?.iban}, espèce.<br />
          Capital social : {data?.capital}, N°RCCM : {data?.rccm}, N°CC : {data?.n_cc}, site web : {data?.siteWeb}, E-mail : {data?.email}</p>
      </div> */}
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
    width: '150px',
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