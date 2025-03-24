import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import { FaPrint } from 'react-icons/fa';
import logo from '../../assets/logo.png';
// import signature from '../../assets/signature.png';

const DevisPDF = ({ data, facturesInfo }) => {
  console.log(data, facturesInfo);
  return (
    <Document>
      <Page style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          
          <View style={styles.headerText}>
            <Text style={styles.title}>FACTURE</Text>
            <Text>Date: {data.createdAt ? data.createdAt.toLocaleDateString() : "Date inconnue"}</Text>
          </View>
        </View>

        {/* Infos Entreprise */}
        <View style={{marginLeft:30}}>
        <Image src={logo} style={styles.logo} />
          <Text style={{fontWeight: 700, marginTop:5, lineHeight: 1.5, fontSize: 12}}>{facturesInfo?.nomEntreprise || ""}</Text>
          <Text style={styles.texte}>{facturesInfo?.statutJuridique || ""}</Text>
          <Text style={styles.texte}>{facturesInfo?.adresse || ""}</Text>
          <Text style={styles.texte}>{facturesInfo?.phone || ""}</Text>
          <Text style={styles.texte}>{facturesInfo?.email || ""}</Text>
        </View>

        {/* Infos Client */}
        <View style={[{marginTop:-30, marginRight:80}, styles.clientInfo]}>
          {/* <Text style={styles.bold}>Le client</Text> */}
          <Text style={{fontWeight: 700, marginTop:5, lineHeight: 1.5, fontSize: 12}}>{data?.nomClient || ""}</Text>
          <Text style={styles.texte}>{data?.adresseClient || ""}</Text>
          <Text style={styles.texte}>{data?.phone || ""}</Text>
          <Text style={styles.texte}>{data?.destination || ""}</Text>
        </View>

        {/* Tableau des articles */}
        <View style={styles.table}>
          <View style={styles.rowHeader}>
            <Text style={{padding: 8, flex:1, textAlign: "left"}}>Désignation</Text>
            <Text style={{padding: 8, flex:1, textAlign: "left", borderLeftWidth: 0.2, borderRightWidth: 0.2, borderStyle: 'solid',  borderColor: ' rgba(0, 0, 0, 0.1)'}}>Qté</Text>
            <Text style={{padding: 8, flex:1, textAlign: "left"}}>Prix HT (F CFA)</Text>
            <Text style={{padding: 8, flex:1, textAlign: "left", borderLeftWidth: 0.2, borderStyle: 'solid',  borderColor: ' rgba(0, 0, 0, 0.1)'}}>TOTAL HT (F CFA)</Text>
          </View>

          {data?.materiels &&
            JSON.parse(data?.materiels).map((el, k) => (
              <View style={styles.row} key={k}>
                <Text style={styles.cell}>{el.titre}</Text>
                <Text style={styles.cell}>{el.quantite}</Text>
                <Text style={styles.cell}>{el.prixUnitaire}</Text>
                <Text style={styles.cell}>{parseInt(el.quantite) * parseInt(el.prixUnitaire)}</Text>
              </View>
            ))}
        </View>

        {/* Totaux */}
        <View style={{marginTop: 30, flexDirection: 'row', justifyContent: 'flex-start'}}>
        <View style={{fontSize: 12}}>
          <Text style={[styles.cell, {width: 300}]}>Total HT</Text>
          <Text style={[styles.cell, {width: 300}]}>Remise</Text>
          <Text style={[styles.cell, {width: 300}]}>TOTAL HT avec remise</Text>
        </View>
        <View style={{fontSize: 12, marginLeft: 50}}>
          <Text style={{padding: 10}}>{data?.total} F</Text>
          <Text style={{padding: 10}}>{data?.remise} %</Text>
          <Text style={{padding: 10}}>{data?.montant} F CFA</Text>
        </View>
        </View>

        {/* Conditions de paiement */}
        <View style={styles.paymentTerms}>
          <Text>
            {facturesInfo?.description ||
              ""}
          </Text>
        </View>

        {/* Signature */}
        {/* <View style={{marginTop: 30, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View>
          <Text style={{marginLeft:30}}>Signature du Gérant</Text>
          <Image src={signature} style={styles.signatureImage} />
          </View>
        </View> */}

        {/* Pied de page */}
        {/* <View style={{position: 'absolute', bottom: 30, left: 10, right: 10, textAlign: 'center', color: '#666', fontSize:10}}>
          <Text>
            Mode de paiement : {facturesInfo?.bank} | Chèque à l'ordre de {facturesInfo?.nomEntreprise} | Virement (RIB) : {facturesInfo?.iban} | Espèce.
          </Text>
          <Text>
            Capital social : {facturesInfo?.capital} | N°RCCM : {facturesInfo?.rccm} | N°CC : {facturesInfo?.n_cc} | Site web : {facturesInfo?.siteWeb} | E-mail : {facturesInfo?.email}
          </Text>
        </View> */}
      </Page>
    </Document>
  );
};


// Composant principal
const Recupdf = ({ data, facturesInfo }) => {
  return (
    <PDFDownloadLink
      document={<DevisPDF data={data} facturesInfo={facturesInfo[0]} />}
      fileName={`Devis ${data.nomClient} du ${data.createdAt.toLocaleDateString()}.pdf`}
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
    // fontFamily: 'system-ui',
    fontSize: 12,
    padding: 30,
    backgroundColor: '#fff',
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  logo: {
    width: 100,
    height: 80,
  },
  headerText: {
    textAlign: 'right',
  },
  title: {
    fontSize: 35,
    fontWeight: 800,
    color: "rgb(74, 144, 226)",
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
  texte: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  table: {
    marginTop: 30,
    // borderWidth: 1,
    // borderColor: '#ddd',
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgb(74, 144, 226)',
    color: '#fff',
    paddingVertical: 5,
    borderWidth: 0.2,
    borderStyle: 'solid',
    borderColor: ' rgb(74, 144, 226)',
  },
  row: {
    flexDirection: 'row',
    // borderWidth: 0.2,
    // bordertyle: 'solid',
    // borderColor: ' rgba(0, 0, 0, 0.1)',
    // paddingVertical: 4,
  },
  cell: {
    flex: 1,
    textAlign: 'left',
    padding: 10,
    fontSize: 10,
    borderWidth: 0.2,
    borderStyle: 'solid',
    borderColor: ' rgba(0, 0, 0, 0.1)',
  },
  totals: {
    marginTop: 10,
    padding: 10,
    // borderTopWidth: 1,
    // borderTopColor: '#000',
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
