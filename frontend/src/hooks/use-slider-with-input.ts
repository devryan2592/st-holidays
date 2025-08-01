"use client"

import { useCallback, useState } from "react"

type UseSliderWithInputProps = {
  minValue?: number
  maxValue?: number
  initialValue?: number[]
  defaultValue?: number[]
  disabled?: boolean
}

export function useSliderWithInput({
  minValue = 0,
  maxValue = 100,
  initialValue = [minValue],
  defaultValue = [minValue],
  disabled = false,
}: UseSliderWithInputProps) {
  const [sliderValue, setSliderValue] = useState(initialValue)
  const [inputValues, setInputValues] = useState(
    initialValue.map((v) => v.toString())
  )

  const showReset =
    sliderValue.length === defaultValue.length &&
    !sliderValue.every((value, index) => value === defaultValue[index])

  const validateAndUpdateValue = useCallback(
    (rawValue: string, index: number) => {
      if (rawValue === "" || rawValue === "-") {
        const newInputValues = [...inputValues]
        newInputValues[index] = "0"
        setInputValues(newInputValues)

        const newSliderValues = [...sliderValue]
        newSliderValues[index] = 0
        setSliderValue(newSliderValues)
        return
      }

      const numValue = parseFloat(rawValue)

      if (isNaN(numValue)) {
        const newInputValues = [...inputValues]
        newInputValues[index] = sliderValue[index]!.toString()
        setInputValues(newInputValues)
        return
      }

      let clampedValue = Math.min(maxValue, Math.max(minValue, numValue))

      if (sliderValue.length > 1) {
        if (index === 0) {
          clampedValue = Math.min(clampedValue, sliderValue[1]!)
        } else {
          clampedValue = Math.max(clampedValue, sliderValue[0]!)
        }
      }

      const newSliderValues = [...sliderValue]
      newSliderValues[index] = clampedValue
      setSliderValue(newSliderValues)

      const newInputValues = [...inputValues]
      newInputValues[index] = clampedValue.toString()
      setInputValues(newInputValues)
    },
    [sliderValue, inputValues, minValue, maxValue]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      if (disabled) return;
      const rawValue = e.target.value
      setInputValues((prev) => {
        const newInputValues = [...prev]
        newInputValues[index] = rawValue
        return newInputValues
      })
    },
    [inputValues, disabled]
  )

  const handleSliderChange = useCallback((value: number[]) => {
    if (disabled) return;
    setSliderValue(value)
    setInputValues(value.map((v) => v.toString()))
  }, [disabled])

  const resetToDefault = useCallback(() => {
    setSliderValue(defaultValue)
    setInputValues(defaultValue.map((v) => v.toString()))
  }, [defaultValue])

  return {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
    resetToDefault,
    showReset,
  }
}
