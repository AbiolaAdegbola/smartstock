import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Styles pour le PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    flex: 1,
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
  },
});

// Composant PDF
const Recupdf = ({ data }) => {
  const {
    receiptNumber,
    date,
    clientName,
    clientContact,
    rentals,
    discount,
    total,
    paymentMethod,
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Titre */}
        <Text style={styles.title}>RÉCÉPISSÉ DE PAIEMENT</Text>
        <View style={styles.section}>
          <Text>N° : {receiptNumber}</Text>
          <Text>Date : {date}</Text>
        </View>

        {/* Informations du client */}
        <View style={styles.section}>
          <Text style={styles.title}>1. Informations du client</Text>
          <Text>Nom et Prénoms : {clientName}</Text>
          <Text>Contact : {clientContact}</Text>
        </View>

        {/* Tableau des locations */}
        <View style={styles.section}>
          <Text style={styles.title}>2. Détails de la location</Text>
          <View style={styles.table}>
            {/* Entête du tableau */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCol}>Matériel</Text>
              <Text style={styles.tableCol}>Prix unitaire</Text>
              <Text style={styles.tableCol}>Quantité</Text>
              <Text style={styles.tableCol}>Prix journalier</Text>
              <Text style={styles.tableCol}>Date de sortie</Text>
              <Text style={styles.tableCol}>Date d’entrée</Text>
              <Text style={styles.tableCol}>Nombre de jours</Text>
              <Text style={styles.tableCol}>Prix total</Text>
            </View>
            {/* Données */}
            {rentals.map((rental, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCol}>{rental.material}</Text>
                <Text style={styles.tableCol}>{rental.unitPrice} FCFA</Text>
                <Text style={styles.tableCol}>{rental.quantity}</Text>
                <Text style={styles.tableCol}>{rental.dailyPrice} FCFA</Text>
                <Text style={styles.tableCol}>{rental.startDate}</Text>
                <Text style={styles.tableCol}>{rental.endDate}</Text>
                <Text style={styles.tableCol}>{rental.days}</Text>
                <Text style={styles.tableCol}>{rental.totalPrice} FCFA</Text>
              </View>
            ))}
          </View>
          <Text>Remise : {discount}%</Text>
          <Text>Montant à payer : {total} FCFA</Text>
        </View>

        {/* Moyen de paiement */}
        <View style={styles.section}>
          <Text style={styles.title}>3. Moyen de paiement</Text>
          <Text>{paymentMethod}</Text>
        </View>

        {/* Validation */}
        <View style={styles.section}>
          <Text style={styles.title}>4. Validation</Text>
          <Text>Cachet et signature du gestionnaire</Text>
        </View>

        {/* Pied de page */}
        <View style={styles.footer}>
          <Text>Merci de votre confiance !</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Recupdf;
