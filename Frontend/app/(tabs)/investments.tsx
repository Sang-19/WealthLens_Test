import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useResponsive, getResponsiveFontSize, getResponsivePadding } from '@/hooks/useResponsive';
import { Card } from '@/components/Card';
import { Header } from '@/components/Header';
import { mockInvestments } from '@/data/mockData';
import { Search, Filter, TrendingUp, TrendingDown, PieChart, Target, CreditCard } from 'lucide-react-native';

export default function InvestmentsScreen() {
  const { colors } = useTheme();
  const { isSmall, isMedium, isTablet, isDesktop } = useResponsive();
  const [searchQuery, setSearchQuery] = useState('');

  const styles = createStyles(isTablet, isDesktop);
  const [activeTab, setActiveTab] = useState('All');

  // Investment breakdown data
  const investmentBreakdown = [
    {
      title: 'Stocks',
      amount: 850000,
      icon: TrendingUp,
      color: colors.primary,
      percentage: 60,
    },
    {
      title: 'SIP',
      amount: 425000,
      icon: Target,
      color: colors.accent,
      percentage: 30,
    },
    {
      title: 'Daily Use',
      amount: 142500,
      icon: CreditCard,
      color: colors.success,
      percentage: 10,
    },
  ];

  // Investment opportunities data
  const investmentOpportunities = [
    { ticker: 'RELIANCE.NS', name: 'Reliance Industries', price: 2850.55 },
    { ticker: 'TCS.NS', name: 'Tata Consultancy', price: 3855.70 },
    { ticker: 'HDFCBANK.NS', name: 'HDFC Bank Ltd.', price: 1680.25 },
    { ticker: 'INFY.NS', name: 'Infosys Ltd.', price: 1640.80 },
    { ticker: 'ICICIBANK.NS', name: 'ICICI Bank Ltd.', price: 1125.10 },
    { ticker: 'BHARTIARTL.NS', name: 'Bharti Airtel Ltd.', price: 1410.00 },
    { ticker: 'SBIN.NS', name: 'State Bank of India', price: 835.50 },
    { ticker: 'NIFTYBEES.NS', name: 'Nifty 50 ETF', price: 250.30 },
  ];

  const filteredOpportunities = investmentOpportunities.filter(stock =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.ticker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Investment Opportunities" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
        {/* Investment Breakdown */}
        <View style={styles.breakdownSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            My Investments
          </Text>
          <View style={styles.breakdownGrid}>
            {investmentBreakdown.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} style={styles.breakdownCard}>
                  <View style={styles.breakdownHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                      <IconComponent size={24} color={item.color} />
                    </View>
                    <Text style={[styles.breakdownPercentage, { color: colors.textSecondary }]}>
                      {item.percentage}%
                    </Text>
                  </View>
                  <Text style={[styles.breakdownTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.breakdownAmount, { color: colors.text }]}>
                    ₹{item.amount.toLocaleString()}
                  </Text>
                </Card>
              );
            })}
          </View>
        </View>

        {/* Investment Opportunities */}
        <Card style={styles.opportunitiesCard}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Investment Opportunities
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Explore stocks, mutual funds, and other investment opportunities in the Indian market.
          </Text>

          {/* Search Bar */}
          <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Search size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search by name or ticker..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Tab */}
          <TouchableOpacity style={styles.tabButton}>
            <Text style={[styles.tabText, { color: colors.primary }]}>All</Text>
          </TouchableOpacity>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, { color: colors.textSecondary }]}>Ticker</Text>
            <Text style={[styles.headerText, { color: colors.textSecondary }]}>Name</Text>
            <Text style={[styles.headerText, { color: colors.textSecondary }]}>Price</Text>
          </View>

          {/* Table Rows */}
          {filteredOpportunities.map((stock, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tableRow, { borderBottomColor: colors.border }]}
            >
              <Text style={[styles.tickerText, { color: colors.text }]}>
                {stock.ticker}
              </Text>
              <Text style={[styles.nameText, { color: colors.text }]}>
                {stock.name}
              </Text>
              <Text style={[styles.priceText, { color: colors.text }]}>
                ₹{stock.price}
              </Text>
            </TouchableOpacity>
          ))}
        </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (isTablet: boolean, isDesktop: boolean) => StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: isTablet ? 32 : 20,
    maxWidth: isDesktop ? 1200 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  breakdownSection: {
    marginBottom: isTablet ? 32 : 24,
  },
  sectionTitle: {
    fontSize: isTablet ? 32 : 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: isTablet ? 16 : 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  breakdownGrid: {
    flexDirection: isTablet ? 'row' : 'column',
    gap: isTablet ? 16 : 12,
    marginBottom: isTablet ? 32 : 24,
  },
  breakdownCard: {
    flex: isTablet ? 1 : undefined,
    padding: isTablet ? 20 : 16,
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: isTablet ? 48 : 40,
    height: isTablet ? 48 : 40,
    borderRadius: isTablet ? 24 : 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breakdownPercentage: {
    fontSize: 12,
    fontWeight: '500',
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  breakdownAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  opportunitiesCard: {
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  tabButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  tickerText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  nameText: {
    fontSize: 14,
    flex: 1,
    paddingHorizontal: 8,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
});
