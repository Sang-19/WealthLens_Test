import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useResponsive, getResponsiveFontSize, getResponsivePadding } from '@/hooks/useResponsive';
import { Card } from '@/components/Card';
import { Header } from '@/components/Header';
import { mockBankAccounts, mockTransactions, mockInvestments } from '@/data/mockData';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Target,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react-native';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { isSmall, isTablet } = useResponsive();

  // Portfolio data
  const portfolioValue = 1425078;
  const totalProfitLoss = 190578;
  const dayChange = 12540;
  const dayChangePercent = 0.88;
  const monthChangePercent = 2.1;

  // Portfolio performance data for chart
  const portfolioData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [800000, 950000, 1100000, 1200000, 1350000, 1425078]
    }]
  };

  // Recent investment transactions
  const recentTransactions = [
    { stock: 'AAPL', type: 'Buy', amount: 150000, color: colors.success },
    { stock: 'MSFT', type: 'Sell', amount: 200000, color: colors.error },
    { stock: 'GOOGL', type: 'Buy', amount: 100000, color: colors.success },
    { stock: 'AMZN', type: 'Buy', amount: 250000, color: colors.success },
    { stock: 'TSLA', type: 'Sell', amount: 80000, color: colors.error },
  ];

  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => colors.primary,
    labelColor: (opacity = 1) => colors.textSecondary,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "0",
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: colors.border,
      strokeWidth: 1,
    },
    formatYLabel: (value) => `₹${(parseInt(value) / 100000).toFixed(0)}L`,
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="My Investments" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
        {/* Portfolio Value Card */}
        <Card style={styles.portfolioCard}>
          <View style={styles.portfolioHeader}>
            <Text style={[styles.portfolioLabel, { color: colors.textSecondary }]}>
              Portfolio Value
            </Text>
            <ArrowUpRight size={20} color={colors.textSecondary} />
          </View>
          <Text style={[styles.portfolioValue, { color: colors.text }]}>
            ₹{portfolioValue.toLocaleString()}
          </Text>
          <Text style={[styles.portfolioChange, { color: colors.success }]}>
            +{monthChangePercent}% from last month
          </Text>
        </Card>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {/* Total Profit/Loss */}
          <Card style={[styles.statCard, { flex: 1, marginRight: 8 }]}>
            <View style={styles.statHeader}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Total Profit/Loss
              </Text>
              <TrendingUp size={16} color={colors.success} />
            </View>
            <Text style={[styles.statValue, { color: colors.success }]}>
              +₹{totalProfitLoss.toLocaleString()}
            </Text>
            <Text style={[styles.statSubtext, { color: colors.textSecondary }]}>
              Overall gains
            </Text>
          </Card>

          {/* Day's Change */}
          <Card style={[styles.statCard, { flex: 1, marginLeft: 8 }]}>
            <View style={styles.statHeader}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Day's Change
              </Text>
              <ArrowUpRight size={16} color={colors.success} />
            </View>
            <Text style={[styles.statValue, { color: colors.success }]}>
              +₹{dayChange.toLocaleString()}
            </Text>
            <Text style={[styles.statSubtext, { color: colors.textSecondary }]}>
              +{dayChangePercent}% today
            </Text>
          </Card>
        </View>

        {/* Portfolio Performance Chart */}
        <Card style={styles.chartCard}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Portfolio Performance
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Your portfolio value over the last 6 months.
          </Text>
          <View style={styles.chartContainer}>
            <BarChart
              data={portfolioData}
              width={screenWidth - 64} // Account for padding
              height={isTablet ? 280 : 220}
              chartConfig={chartConfig}
              style={styles.chart}
              showValuesOnTopOfBars={false}
              fromZero={false}
              withInnerLines={true}
              yAxisSuffix=""
              yAxisInterval={1}
            />
          </View>
        </Card>

        {/* Recent Transactions */}
        <Card style={styles.recentTransactions}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recent Transactions
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            A log of your recent investment activities.
          </Text>

          {/* Transaction Header */}
          <View style={styles.transactionHeader}>
            <Text style={[styles.headerText, { color: colors.textSecondary }]}>Stock</Text>
            <Text style={[styles.headerText, { color: colors.textSecondary }]}>Type</Text>
            <Text style={[styles.headerText, { color: colors.textSecondary }]}>Amount</Text>
          </View>

          {/* Transaction List */}
          {recentTransactions.map((transaction, index) => (
            <View key={index} style={[styles.transactionItem, { borderBottomColor: colors.border }]}>
              <Text style={[styles.stockSymbol, { color: colors.text }]}>
                {transaction.stock}
              </Text>
              <View style={[
                styles.transactionType,
                { backgroundColor: transaction.color + '20' }
              ]}>
                <Text style={[styles.typeText, { color: transaction.color }]}>
                  {transaction.type}
                </Text>
              </View>
              <Text style={[styles.transactionAmount, { color: colors.text }]}>
                ₹{transaction.amount.toLocaleString()}.00
              </Text>
            </View>
          ))}
        </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100, // Extra space for tab bar
  },
  portfolioCard: {
    padding: 20,
    marginBottom: 16,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  portfolioLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  portfolioValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  portfolioChange: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statCard: {
    padding: 16,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statSubtext: {
    fontSize: 12,
  },
  chartCard: {
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  recentTransactions: {
    padding: 20,
    marginBottom: 24,
  },
  transactionHeader: {
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
    textAlign: 'left',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  stockSymbol: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  transactionType: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
});
