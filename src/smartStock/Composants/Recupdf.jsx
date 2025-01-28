import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import { FaPrint } from 'react-icons/fa';
// import { Spinner } from 'react-bootstrap';
import logo from '../../assets/logo.png';

// Composant pour le PDF
const DevisPDF = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.title}>FACTURE</Text>
          <View style={{textAlign: 'right'}}>
          <Text>Date: {data?.createdAt}</Text>
          {/* <Text>Numéro: {`001/04`}</Text> */}
          </View>
        </View>

        {/* Informations sur l'entreprise */}
        <View style={styles.section}>
          {/* Ajouter un logo ou une image */}
          <Image
            src={logo} // URL du logo ou image par défaut
            style={styles.logo}
          />
          <Text style={styles.companyName}>{data?.nomEntreprise || "Votre entreprise"}</Text>
          <Text>{data?.statutJuridique || "Statut juridique"}</Text>
          <Text>{data?.adresse || "Adresse"}</Text>
          <Text>{data?.phone || "N° de téléphone"}</Text>
          <Text>{data?.email || "Adresse e-mail"}</Text>
        </View>

        {/* Informations sur le client */}
        <View style={{marginTop: -50, marginBottom: 10, marginLeft: "60%"}}>
          <Text style={styles.clientTitle}>{data?.nomClient}</Text>
          <Text>{data?.phone}</Text>
          <Text>Destination : {data?.destination}</Text>
        </View>

        {/* Tableau des articles */}
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.cell}>Désignation</Text>
            <Text style={styles.cell}>Unité</Text>
            <Text style={styles.cell}>Qté</Text>
            <Text style={styles.cell}>Prix HT</Text>
            <Text style={styles.cell}>TOTAL HT</Text>
          </View>

          {
            JSON.parse(data?.materiels).map((el, k) => (
              <View style={styles.row} key={k}>
                <Text style={styles.cell}>{el.titre}</Text>
                <Text style={styles.cell}>{el.unite}</Text>
                <Text style={styles.cell}>{el.quantite}</Text>
                <Text style={styles.cell}>{el.prixUnitaire}</Text>
                <Text style={styles.cell}>{parseInt(el.quantite) * parseInt(el.prixUnitaire)}</Text>
              </View>
            ))
          }
        </View>

        {/* Totaux */}
        <View style={styles.totals}>
          <Text>Total HT : {data?.total} F CFA</Text>
          <Text>Remise : {data?.remise} F CFA</Text>
          <Text style={styles.totalTTC}>TOTAL HT avec remise : {data?.montant} F CFA</Text>
        </View>

        {/* Signature et image optionnelle */}
        <View style={styles.signature}>
          <Text>SIGNATURE</Text>
          {/* <Image
            src={signature} // Signature numérique ou image par défaut
            style={styles.signatureImage}
          /> */}
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

// Styles pour le PDF
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: 'Helvetica' },
  header: { marginBottom: 20 },
  title: { fontSize: 24, marginBottom: 10, textAlign: 'right', color: '#4a90e2', fontWeight: 'bold' },
  section: { marginBottom: 10 },
  logo: { width: 100, height: 100, marginBottom: 10 }, // Taille du logo
  companyName: { fontSize: 16, fontWeight: 'bold' },
  clientTitle: { fontWeight: 'bold' },
  table: { marginVertical: 20 },
  row: { flexDirection: 'row', marginBottom: 4 },
  cell: { flex: 1, borderBottom: '1px solid #ddd', padding: 4 },
  totals: { marginTop: 20 },
  totalTTC: { fontWeight: 'bold', fontSize: 16 },
  signature: { position:"absolute", bottom: 140, right: 100 },
  signatureImage: { width: 100, height: 50, marginTop: 10 }, // Taille de l'image de signature
});

export default Recupdf;
