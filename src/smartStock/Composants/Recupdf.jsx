import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import { FaPrint } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import signature from '../../assets/signature.png';

const DevisPDF = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          
          <View style={styles.headerText}>
            <Text style={styles.title}>FACTURE</Text>
            <Text>Date: {data?.createdAt || "01/01/2025"}</Text>
            <Text>Numéro: 001/04</Text>
            <Text>Valable: {data?.valDate || "2 mois"}</Text>
          </View>
        </View>

        {/* Infos Entreprise */}
        <View style={{marginLeft:30}}>
        <Image src={logo} style={styles.logo} />
          <Text style={styles.bold}>{data?.nomEntreprise || "Votre entreprise"}</Text>
          <Text>{data?.statutJuridique || "Statut juridique"}</Text>
          <Text>{data?.adresse || "Adresse"}</Text>
          <Text>{data?.phone || "N° de téléphone"}</Text>
          <Text>{data?.email || "Adresse e-mail"}</Text>
        </View>

        {/* Infos Client */}
        <View style={[{marginTop:-30, marginRight:80}, styles.clientInfo]}>
          <Text style={styles.bold}>Le client</Text>
          <Text>{data?.nomClient || "Nom client"}</Text>
          <Text>{data?.adresseClient || "Son adresse"}</Text>
          <Text>{data?.contactClient || "Ses coordonnées"}</Text>
        </View>

        {/* Tableau des articles */}
        <View style={styles.table}>
          <View style={styles.rowHeader}>
            <Text style={styles.cell}>Désignation</Text>
            <Text style={styles.cell}>Qté</Text>
            <Text style={styles.cell}>Prix HT</Text>
            <Text style={styles.cell}>TOTAL HT</Text>
          </View>

          {data?.materiels &&
            JSON.parse(data?.materiels).map((el, k) => (
              <View style={styles.row} key={k}>
                <Text style={styles.cell}>{el.titre}</Text>
                <Text style={styles.cell}>{el.quantite}</Text>
                <Text style={styles.cell}>{el.prixUnitaire} F CFA</Text>
                <Text style={styles.cell}>{parseInt(el.quantite) * parseInt(el.prixUnitaire)} F CFA</Text>
              </View>
            ))}
        </View>

        {/* Totaux */}
        <View style={styles.totals}>
          <Text>Total HT : {data?.total} F CFA</Text>
          <Text>Remise : {data?.remise} F CFA</Text>
          <Text style={styles.bold}>TOTAL HT avec remise : {data?.montant} F CFA</Text>
        </View>

        {/* Conditions de paiement */}
        <View style={styles.paymentTerms}>
          <Text>
            {data?.description ||
              "Durée estimée des travaux : 4 jours ouvrables à compter de la date de signature du devis. Paiement en trois tranches : 20% à la commande, 30% au début des travaux, et 50% à la livraison."}
          </Text>
        </View>

        {/* Signature */}
        <View style={{marginTop: 30, marginRight: 50, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text style={{marginLeft:30}}>Signature du Gérant</Text>
          <Image src={signature} style={styles.signatureImage} />
        </View>

        {/* Pied de page */}
        <View style={{position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center', color: '#666'}}>
          <Text>
            Mode de paiement : {data?.bank} | Chèque à l'ordre de {data?.nomEntreprise} | Virement (RIB) : {data?.iban} | Espèce.
          </Text>
          <Text>
            Capital social : {data?.capital} | N°RCCM : {data?.rccm} | N°CC : {data?.n_cc} | Site web : {data?.siteWeb} | E-mail : {data?.email}
          </Text>
        </View>
      </Page>
    </Document>
  );
};


// Composant principal
const Recupdf = ({ data }) => {
  return (
    <PDFDownloadLink
      document={<DevisPDF data={data} />}
      fileName={`devis-${data?.createdAt || "2025010001"}.pdf`}
      style={{
        textDecoration: 'none',
        color: '#fff',
        backgroundColor: 'transparent',
        padding: "1px",
        border: 'none'
      }}
    >
      <FaPrint style={{ color: "orange" }} />
    </PDFDownloadLink>
  );
};


// 🔹 Styles adaptés pour @react-pdf/renderer
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Times-Roman',
    fontSize: 12,
    padding: 30,
    backgroundColor: '#fff',
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    // paddingBottom: 10,
    marginBottom: 5,
  },
  logo: {
    width: 100,
    height: 60,
  },
  headerText: {
    textAlign: 'right',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  section: {
    marginBottom: 10,
  },
  clientInfo: {
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  bold: {
    fontWeight: 'bold',
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: '#4a90e2',
    color: '#fff',
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 4,
  },
  cell: {
    flex: 1,
    textAlign: 'left',
    padding: 5,
    fontSize: 10,
  },
  totals: {
    marginTop: 10,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#000',
    textAlign: 'right',
  },
  paymentTerms: {
    marginTop: 20,
    fontSize: 12,
    lineHeight: 1.5,
  },
  signature: {
    marginTop: 30,
    textAlign: 'right',
  },
  signatureImage: {
    width: 100,
    height: 50,
    marginTop: 5,
    marginRight: 50,
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    textAlign: 'center',
    color: '#666',
  },
});

export default Recupdf;
