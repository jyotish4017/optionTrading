// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import React from 'react'
import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const hello = [
    {
      "id": "japan",
      "color": "hsl(234, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 102
        },
        {
          "x": "helicopter",
          "y": 260
        },
        {
          "x": "boat",
          "y": 171
        },
        {
          "x": "train",
          "y": 51
        },
        {
          "x": "subway",
          "y": 136
        },
        {
          "x": "bus",
          "y": 277
        },
        {
          "x": "car",
          "y": 91
        },
        {
          "x": "moto",
          "y": 52
        },
        {
          "x": "bicycle",
          "y": 151
        },
        {
          "x": "horse",
          "y": 205
        },
        {
          "x": "skateboard",
          "y": 146
        },
        {
          "x": "others",
          "y": 10
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(230, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 171
        },
        {
          "x": "helicopter",
          "y": 129
        },
        {
          "x": "boat",
          "y": 184
        },
        {
          "x": "train",
          "y": 232
        },
        {
          "x": "subway",
          "y": 56
        },
        {
          "x": "bus",
          "y": 266
        },
        {
          "x": "car",
          "y": 290
        },
        {
          "x": "moto",
          "y": 53
        },
        {
          "x": "bicycle",
          "y": 274
        },
        {
          "x": "horse",
          "y": 266
        },
        {
          "x": "skateboard",
          "y": 213
        },
        {
          "x": "others",
          "y": 214
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(270, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 91
        },
        {
          "x": "helicopter",
          "y": 100
        },
        {
          "x": "boat",
          "y": 204
        },
        {
          "x": "train",
          "y": 64
        },
        {
          "x": "subway",
          "y": 136
        },
        {
          "x": "bus",
          "y": 64
        },
        {
          "x": "car",
          "y": 131
        },
        {
          "x": "moto",
          "y": 60
        },
        {
          "x": "bicycle",
          "y": 146
        },
        {
          "x": "horse",
          "y": 290
        },
        {
          "x": "skateboard",
          "y": 31
        },
        {
          "x": "others",
          "y": 114
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(39, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 58
        },
        {
          "x": "helicopter",
          "y": 183
        },
        {
          "x": "boat",
          "y": 16
        },
        {
          "x": "train",
          "y": 154
        },
        {
          "x": "subway",
          "y": 215
        },
        {
          "x": "bus",
          "y": 146
        },
        {
          "x": "car",
          "y": 80
        },
        {
          "x": "moto",
          "y": 79
        },
        {
          "x": "bicycle",
          "y": 138
        },
        {
          "x": "horse",
          "y": 238
        },
        {
          "x": "skateboard",
          "y": 238
        },
        {
          "x": "others",
          "y": 178
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(6, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 277
        },
        {
          "x": "helicopter",
          "y": 69
        },
        {
          "x": "boat",
          "y": 133
        },
        {
          "x": "train",
          "y": 227
        },
        {
          "x": "subway",
          "y": 227
        },
        {
          "x": "bus",
          "y": 181
        },
        {
          "x": "car",
          "y": 36
        },
        {
          "x": "moto",
          "y": 73
        },
        {
          "x": "bicycle",
          "y": 140
        },
        {
          "x": "horse",
          "y": 138
        },
        {
          "x": "skateboard",
          "y": 46
        },
        {
          "x": "others",
          "y": 50
        }
      ]
    }
  ]

const MyResponsiveLine = ({ data /* see data tab */ }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)


function delete1() {
  return (
    <div>
        <MyResponsiveLine hello={hello} />
    </div>
  )
}

export default delete1