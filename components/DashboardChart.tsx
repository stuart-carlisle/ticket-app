"use client"
import React from "react"
//import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
interface dataProps {
  data: dataElements[]
}

interface dataElements {
  name: string
  total: number
}
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  ResponsiveContainer,
} from "recharts"

const DashboardChart = ({ data }: dataProps) => {
  const mockData = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 900, pv: 2400, amt: 2400 },
    { name: "Page D", uv: 1300, pv: 2400, amt: 2400 },
  ]
  // return (
  //   <BarChart
  //     width={600}
  //     height={500}
  //     data={mockData}
  //     margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
  //   >
  //     <Bar type="monotone" dataKey="uv" stroke="#8884d8" />

  //     <XAxis dataKey="name" />
  //     <YAxis />
  //   </BarChart>
  // )
  return (
    <Card className="col-span-4" style={{ background: "#0c0a09" }}>
      <CardHeader>
        <CardTitle>Ticket Counts</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={368}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar dataKey="total" fill="hsl(142.1 76.2% 36.3%)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default DashboardChart
