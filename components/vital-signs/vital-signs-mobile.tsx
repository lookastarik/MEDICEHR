"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { VictoryChart, VictoryLine, VictoryTheme, VictoryZoomContainer, VictoryAxis } from "victory-native"
import { Heart, Activity, Thermometer, Droplets } from "lucide-react-native"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"

// Пример интеграции с HealthKit/Google Fit
const useHealthData = () => {
  const [heartRate, setHeartRate] = useState<number | null>(null)
  const [bloodPressure, setBloodPressure] = useState<{ systolic: number; diastolic: number } | null>(null)

  useEffect(() => {
    // В реальном приложении здесь была бы логика получения данных из HealthKit/Google Fit
    const fetchHealthData = async () => {
      try {
        // Имитация получения данных
        setHeartRate(80)
        setBloodPressure({ systolic: 129, diastolic: 84 })
      } catch (error) {
        console.error("Ошибка при получении данных здоровья:", error)
      }
    }

    fetchHealthData()

    // Настройка периодического обновления данных
    const intervalId = setInterval(fetchHealthData, 60000)
    return () => clearInterval(intervalId)
  }, [])

  return { heartRate, bloodPressure }
}

// Данные для графиков (те же, что и в веб-версии)
const heartRateData = [
  { time: "08:00", value: 72 },
  { time: "09:00", value: 74 },
  { time: "10:00", value: 78 },
  { time: "11:00", value: 82 },
  { time: "12:00", value: 79 },
  { time: "13:00", value: 76 },
  { time: "14:00", value: 75 },
  { time: "15:00", value: 77 },
  { time: "16:00", value: 80 },
]

export default function VitalSignsMobile() {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: "heart", title: "Пульс" },
    { key: "bp", title: "Давление" },
    { key: "oxygen", title: "SpO₂" },
    { key: "glucose", title: "Глюкоза" },
  ])

  const { heartRate } = useHealthData()

  // Рендер сцены для пульса
  const HeartRateScene = () => (
    <View style={styles.tabContent}>
      <View style={styles.headerRow}>
        <Text style={styles.tabTitle}>Пульс</Text>
        <Text style={styles.valueText}>
          <Text style={styles.valueHighlight}>{heartRate || 80}</Text>
          <Text style={styles.unitText}> уд/мин</Text>
        </Text>
      </View>

      <View style={styles.chartContainer}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 10 }}
          padding={{ top: 10, bottom: 40, left: 50, right: 20 }}
          height={200}
          containerComponent={<VictoryZoomContainer />}
        >
          <VictoryAxis
            tickFormat={(t) => t}
            style={{
              tickLabels: { fontSize: 10, padding: 5 },
            }}
          />
          <VictoryAxis
            dependentAxis
            domain={[60, 100]}
            style={{
              tickLabels: { fontSize: 10, padding: 5 },
            }}
          />
          <VictoryLine
            data={heartRateData}
            x="time"
            y="value"
            style={{
              data: { stroke: "#ef4444", strokeWidth: 2 },
            }}
          />
        </VictoryChart>
      </View>
    </View>
  )

  // Остальные сцены для других показателей (аналогично)
  const BloodPressureScene = () => (
    <View style={styles.tabContent}>
      <Text>Артериальное давление</Text>
    </View>
  )

  const OxygenScene = () => (
    <View style={styles.tabContent}>
      <Text>Сатурация (SpO₂)</Text>
    </View>
  )

  const GlucoseScene = () => (
    <View style={styles.tabContent}>
      <Text>Глюкоза</Text>
    </View>
  )

  const renderScene = SceneMap({
    heart: HeartRateScene,
    bp: BloodPressureScene,
    oxygen: OxygenScene,
    glucose: GlucoseScene,
  })

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#3b82f6" }}
      style={{ backgroundColor: "white" }}
      labelStyle={{ color: "#1f2937" }}
      renderIcon={({ route, focused }) => {
        let icon
        if (route.key === "heart") icon = <Heart size={20} color={focused ? "#3b82f6" : "#9ca3af"} />
        else if (route.key === "bp") icon = <Activity size={20} color={focused ? "#3b82f6" : "#9ca3af"} />
        else if (route.key === "oxygen") icon = <Droplets size={20} color={focused ? "#3b82f6" : "#9ca3af"} />
        else icon = <Thermometer size={20} color={focused ? "#3b82f6" : "#9ca3af"} />

        return icon
      }}
      renderLabel={() => null}
    />
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Жизненные показатели</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Онлайн</Text>
        </View>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  badge: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: "#10b981",
    fontSize: 12,
    fontWeight: "500",
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1f2937",
  },
  valueText: {
    fontSize: 16,
  },
  valueHighlight: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ef4444",
  },
  unitText: {
    fontSize: 14,
    color: "#6b7280",
  },
  chartContainer: {
    height: 200,
    marginTop: 8,
  },
})

