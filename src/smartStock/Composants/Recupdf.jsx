import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import { FaPrint } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import signature from '../../assets/signature.png';

const DevisPDF = ({ data, facturesInfo }) => {
  console.log(data, facturesInfo);
  return (
    <Document>
      <Page style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          
          <View style={styles.headerText}>
            <Text style={styles.title}>FACTURE</Text>
            <Text>Date: {data?.createdAt || ""}</Text>
            {/* <Text>Numéro: 001/04</Text> */}
            {/* <Text>Valable: {data?.valDate || ""}</Text> */}
          </View>
        </View>

        {/* Infos Entreprise */}
        <View style={{marginLeft:30}}>
        <Image src={logo} style={styles.logo} />
          <Text style={styles.bold}>{facturesInfo?.nomEntreprise || ""}</Text>
          <Text>{facturesInfo?.statutJuridique || ""}</Text>
          <Text>{facturesInfo?.adresse || ""}</Text>
          <Text>{facturesInfo?.phone || ""}</Text>
          <Text>{facturesInfo?.email || ""}</Text>
        </View>

        {/* Infos Client */}
        <View style={[{marginTop:-30, marginRight:80}, styles.clientInfo]}>
          {/* <Text style={styles.bold}>Le client</Text> */}
          <Text>{data?.nomClient || ""}</Text>
          <Text>{data?.adresseClient || ""}</Text>
          <Text>{data?.phone || ""}</Text>
          <Text>{data?.destination || ""}</Text>
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
          <Text>Total HT : {data?.total} F</Text>
          <Text>Remise : {data?.remise} F</Text>
          <Text style={styles.bold}>TOTAL HT avec remise : {data?.montant} F CFA</Text>
        </View>

        {/* Conditions de paiement */}
        <View style={styles.paymentTerms}>
          <Text>
            {facturesInfo?.description ||
              ""}
          </Text>
        </View>

        {/* Signature */}
        <View style={{marginTop: 30, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View>
          <Text style={{marginLeft:30}}>Signature du Gérant</Text>
          <Image src={signature} style={styles.signatureImage} />
          </View>
        </View>

        {/* Pied de page */}
        <View style={{position: 'absolute', bottom: 30, left: 10, right: 10, textAlign: 'center', color: '#666', fontSize:10}}>
          <Text>
            Mode de paiement : {facturesInfo?.bank} | Chèque à l'ordre de {facturesInfo?.nomEntreprise} | Virement (RIB) : {facturesInfo?.iban} | Espèce.
          </Text>
          <Text>
            Capital social : {facturesInfo?.capital} | N°RCCM : {facturesInfo?.rccm} | N°CC : {facturesInfo?.n_cc} | Site web : {facturesInfo?.siteWeb} | E-mail : {facturesInfo?.email}
          </Text>
        </View>
      </Page>
    </Document>
  );
};


// Composant principal
const Recupdf = ({ data, facturesInfo }) => {
  return (
    <PDFDownloadLink
      document={<DevisPDF data={data} facturesInfo={facturesInfo[0]} />}
      fileName={`devis-${data?.createdAt || ""}.pdf`}
      style={{
        textDecoration: 'none',
        color: '#fff',
        backgroundColor: 'transparent',
        padding: "1px",
        border: 'none'
      }}
    >
      <FaPrint style={{ color: "green", fontSize:"22px" }} />
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
    marginTop: 30,
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
    // marginRight: 50,
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    textAlign: 'center',
    color: '#666',
  },
});

export default Recupdf;
