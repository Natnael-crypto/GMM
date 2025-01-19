'use client';

import React from 'react';

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { User } from '@/lib/schemas/user';
import { Subscription, toTierName } from '@/lib/schemas/checkout';

Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf',
      fontWeight: 100,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf',
      fontWeight: 200,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf',
      fontWeight: 300,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf',
      fontWeight: 400,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf',
      fontWeight: 500,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf',
      fontWeight: 600,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf',
      fontWeight: 700,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf',
      fontWeight: 800,
    },
    {
      src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf',
      fontWeight: 900,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    fontFamily: 'Inter',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 30,
    borderRadius: 2,
  },
  image: {
    width: 170,
    height: 38,
    marginTop: 15,
    marginBottom: 20,
  },
  section: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    padding: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },

  table: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
    fontSize: 12,
  },

  tableColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});

export default function ReceiptPdf({
  user,
  payment,
}: {
  user: User;
  payment: Subscription;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image src="/assets/guardian-logo-color.png" style={styles.image} />
          }
        </View>

        <View style={styles.section}>
          <Text>Payment Information</Text>

          <View style={styles.table}>
            <View style={styles.tableColumn}>
              <Text>Full name</Text>
              <Text>Address</Text>
              <Text>Package</Text>
              <Text>Payment ID</Text>
              <Text>Payment Date</Text>
              <Text>Total Amount</Text>
            </View>
            <View style={styles.tableColumn}>
              <Text>
                {user.firstName} {user.lastName}
              </Text>
              <Text>{user.city}</Text>
              <Text>{toTierName(payment.planId)}</Text>
              <Text>{payment.id}</Text>
              <Text>
                {new Date(payment.periodStart).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
              <Text>{(payment.amount / 100).toFixed(2)} USD</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
