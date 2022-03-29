'use strict'
const React = require('react')
const { render, useInput, useApp, Box, Text } = require('ink')
const { useState } = React

const formContent = [
  {
    desc: 'UI Framework',
    values: ['React', 'Vue', 'Preact']
  },
  {
    desc: 'Client Routing',
    values: ['No', 'Yes']
  },
  {
    desc: 'Renderer Ejected',
    values: ['No', 'Yes']
  }
]

const Form = () => {
  const { exit } = useApp()
  const [selectedRow, setSelectedRow] = useState(0)
  const [selectedValues, setSelectedValues] = useState(formContent.map(() => 0))

  useInput((input, key) => {
    if (input === 'q') {
      exit()
    }

    if (key.leftArrow) {
      selectedValues[selectedRow] = Math.max(0, selectedValues[selectedRow] - 1)
      setSelectedValues(selectedValues.slice())
    }

    if (key.rightArrow) {
      selectedValues[selectedRow] = Math.min(
        formContent[selectedRow].values.length - 1,
        selectedValues[selectedRow] + 1
      )
      setSelectedValues(selectedValues.slice())
    }

    if (key.upArrow) {
      setSelectedRow(Math.max(0, selectedRow - 1))
    }

    if (key.downArrow) {
      setSelectedRow(Math.min(formContent.length - 1, selectedRow + 1))
    }
  })

  return (
    <>
      {formContent.map(({ desc, values }, i) => {
        const cursor = <>{i === selectedRow ? '>' : ' '}</>
        return (
          <Text key={i}>
            {cursor} {desc}
            {': '}
            {values.map((val, j) => {
              return (
                <Text key={j} color={j === selectedValues[i] ? 'blue' : ''}>
                  {val}{' '}
                </Text>
              )
            })}
          </Text>
        )
      })}
      <Text>Use arrow keys to select. Press “q” to exit.</Text>
    </>
  )
}

render(<Form />)
